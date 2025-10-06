import { Router } from 'express';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import {
  buildBillingBreakdown,
  collectDashboardPayload,
  connections,
  movements,
  orders,
  products,
  walletRequests
} from './data.js';
import { isWithinRange, normalizeSearch, parseDate } from './utils.js';
import { Order } from './types.js';

const router = Router();

const orderInputSchema = z.object({
  store: z.string().min(1),
  product: z.string().min(1),
  customer: z.string().min(1),
  status: z
    .union([
      z.literal('Pendiente'),
      z.literal('Registrar pago'),
      z.literal('Confirmado'),
      z.literal('Preparado'),
      z.literal('Despachado'),
      z.literal('Entregado'),
      z.literal('En revisión'),
      z.literal('Cancelado')
    ])
    .default('Pendiente'),
  paymentMethod: z.union([z.literal('TC'), z.literal('COD')]),
  cost: z.number().positive(),
  shippingCost: z.number().min(0),
  salePrice: z.number().positive(),
  trackingCode: z.string().optional()
});

const statusUpdateSchema = z.object({
  status: orderInputSchema.shape.status.optional(),
  trackingCode: z.string().optional()
});

const walletStatusUpdateSchema = z.object({
  status: z.union([z.literal('Pendiente'), z.literal('Aprobada'), z.literal('Rechazada')])
});

const connectionUpdateSchema = z.object({
  status: z.union([z.literal('Activa'), z.literal('Sincronizando'), z.literal('Error')]).optional(),
  lastSync: z.string().datetime().optional()
});

const toOrderResponse = (order: Order) => ({ data: order });

router.get('/products', (req, res) => {
  const { category, provider, search } = req.query as Record<string, string | undefined>;
  const searchValue = search ? normalizeSearch(search) : undefined;

  const filtered = products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const matchesProvider = !provider || product.provider === provider;
    const matchesSearch =
      !searchValue ||
      normalizeSearch(product.name).includes(searchValue) ||
      normalizeSearch(product.provider).includes(searchValue);
    return matchesCategory && matchesProvider && matchesSearch;
  });

  res.json({ data: filtered });
});

router.get('/orders', (req, res) => {
  const { status, paymentMethod, search, from, to } = req.query as Record<string, string | undefined>;
  const fromDate = parseDate(from);
  const toDate = parseDate(to);
  const normalizedSearch = search ? normalizeSearch(search) : undefined;

  const filtered = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const matchesStatus = !status || order.status === status;
    const matchesPayment = !paymentMethod || order.paymentMethod === paymentMethod;
    const matchesSearch =
      !normalizedSearch ||
      normalizeSearch(order.customer).includes(normalizedSearch) ||
      normalizeSearch(order.product).includes(normalizedSearch) ||
      normalizeSearch(order.id).includes(normalizedSearch);
    const matchesRange = isWithinRange(orderDate, fromDate, toDate);
    return matchesStatus && matchesPayment && matchesSearch && matchesRange;
  });

  res.json({ data: filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

router.get('/orders/:id', (req, res) => {
  const order = orders.find((item) => item.id === req.params.id);
  if (!order) {
    res.status(404).json({ error: 'Pedido no encontrado' });
    return;
  }

  res.json(toOrderResponse(order));
});

router.post('/orders', (req, res) => {
  const parsed = orderInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const now = new Date();
  const newOrder: Order = {
    id: `ORD-${nanoid(6).toUpperCase()}`,
    ...parsed.data,
    createdAt: now.toISOString()
  };

  orders.unshift(newOrder);
  res.status(201).json(toOrderResponse(newOrder));
});

router.patch('/orders/:id/status', (req, res) => {
  const order = orders.find((item) => item.id === req.params.id);
  if (!order) {
    res.status(404).json({ error: 'Pedido no encontrado' });
    return;
  }

  const parsed = statusUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  if (parsed.data.status) {
    order.status = parsed.data.status;
  }
  if (parsed.data.trackingCode) {
    order.trackingCode = parsed.data.trackingCode;
  }

  res.json(toOrderResponse(order));
});

router.get('/movements', (req, res) => {
  const { type, category, from, to } = req.query as Record<string, string | undefined>;
  const fromDate = parseDate(from);
  const toDate = parseDate(to);

  const filtered = movements.filter((movement) => {
    const movementDate = new Date(movement.date);
    const matchesType = !type || movement.type === type;
    const matchesCategory = !category || movement.category === category;
    const matchesRange = isWithinRange(movementDate, fromDate, toDate);
    return matchesType && matchesCategory && matchesRange;
  });

  res.json({ data: filtered.sort((a, b) => b.date.localeCompare(a.date)) });
});

router.get('/wallet-requests', (req, res) => {
  const { status, type } = req.query as Record<string, string | undefined>;
  const filtered = walletRequests.filter((request) => {
    const matchesStatus = !status || request.status === status;
    const matchesType = !type || request.type === type;
    return matchesStatus && matchesType;
  });

  res.json({ data: filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) });
});

router.patch('/wallet-requests/:id/status', (req, res) => {
  const request = walletRequests.find((item) => item.id === req.params.id);
  if (!request) {
    res.status(404).json({ error: 'Solicitud no encontrada' });
    return;
  }

  const parsed = walletStatusUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  request.status = parsed.data.status;
  if (parsed.data.status !== 'Pendiente') {
    request.processedAt = new Date().toISOString();
  }

  res.json({ data: request });
});

router.get('/connections', (req, res) => {
  const { status } = req.query as Record<string, string | undefined>;
  const filtered = connections.filter((connection) => !status || connection.status === status);
  res.json({ data: filtered });
});

router.patch('/connections/:id', (req, res) => {
  const connection = connections.find((item) => item.id === req.params.id);
  if (!connection) {
    res.status(404).json({ error: 'Conexión no encontrada' });
    return;
  }

  const parsed = connectionUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  if (parsed.data.status) {
    connection.status = parsed.data.status;
  }
  if (parsed.data.lastSync) {
    connection.lastSync = parsed.data.lastSync;
  }

  res.json({ data: connection });
});

router.get('/dashboard', (req, res) => {
  const { from, to } = req.query as Record<string, string | undefined>;
  const fromDate = parseDate(from);
  const toDate = parseDate(to);

  const filteredOrders = orders.filter((order) => isWithinRange(new Date(order.createdAt), fromDate, toDate));
  const filteredMovements = movements.filter((movement) => isWithinRange(new Date(movement.date), fromDate, toDate));
  const sortedProducts = [...products].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  res.json({ data: collectDashboardPayload(filteredOrders, filteredMovements, sortedProducts) });
});

router.get('/billing', (req, res) => {
  const { from, to } = req.query as Record<string, string | undefined>;
  const fromDate = parseDate(from);
  const toDate = parseDate(to);

  const filteredOrders = orders.filter((order) => isWithinRange(new Date(order.createdAt), fromDate, toDate));
  res.json({ data: buildBillingBreakdown(filteredOrders) });
});

export default router;
