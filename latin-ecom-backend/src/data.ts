import { addDays, subDays } from 'date-fns';
import {
  BillingBreakdownItem,
  Connection,
  DashboardPayload,
  Movement,
  Order,
  OrderStatus,
  OrderStatusSummaryItem,
  Product,
  TopProductSummary,
  User,
  WalletRequest
} from './types.js';

const today = new Date();

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const initialProducts: Product[] = [
  {
    id: 'PRD-101',
    name: 'Faja Reductora Post Parto',
    category: 'Salud y Belleza',
    provider: 'FitLine Bogotá',
    cost: 18,
    suggestedPrice: 39.99,
    stock: 230,
    shippingTime: '24h',
    updatedAt: subDays(today, 1).toISOString(),
    rating: 4.7
  },
  {
    id: 'PRD-205',
    name: 'Set de brochas profesionales 12p',
    category: 'Belleza',
    provider: 'GlamSupply Lima',
    cost: 9.5,
    suggestedPrice: 24.99,
    stock: 560,
    shippingTime: '48h',
    updatedAt: subDays(today, 2).toISOString(),
    rating: 4.8
  },
  {
    id: 'PRD-314',
    name: 'Zapatillas Urbanas StreetFlow',
    category: 'Calzado',
    provider: 'StreetKicks Santiago',
    cost: 22,
    suggestedPrice: 49.99,
    stock: 140,
    shippingTime: '72h',
    updatedAt: subDays(today, 4).toISOString(),
    rating: 4.5
  },
  {
    id: 'PRD-407',
    name: 'Licuadora Portátil SmoothGo',
    category: 'Electrodomésticos',
    provider: 'HomeTech Medellín',
    cost: 16,
    suggestedPrice: 34.99,
    stock: 320,
    shippingTime: '48h',
    updatedAt: subDays(today, 1).toISOString(),
    rating: 4.6
  }
];

const initialOrders: Order[] = [
  {
    id: 'ORD-9001',
    store: 'SofiFit Store',
    product: 'Faja Reductora Post Parto',
    customer: 'Laura Reyes',
    createdAt: subDays(today, 1).toISOString(),
    status: 'Pendiente',
    paymentMethod: 'TC',
    cost: 18,
    shippingCost: 5.5,
    salePrice: 39.99
  },
  {
    id: 'ORD-9002',
    store: 'GlowUp Boutique',
    product: 'Set de brochas profesionales 12p',
    customer: 'Camila Vargas',
    createdAt: subDays(today, 3).toISOString(),
    status: 'Confirmado',
    paymentMethod: 'TC',
    cost: 9.5,
    shippingCost: 4,
    salePrice: 24.99,
    trackingCode: 'CHL123456789'
  },
  {
    id: 'ORD-9003',
    store: 'UrbanStep',
    product: 'Zapatillas Urbanas StreetFlow',
    customer: 'Jorge Pérez',
    createdAt: subDays(today, 5).toISOString(),
    status: 'Despachado',
    paymentMethod: 'COD',
    cost: 22,
    shippingCost: 6.5,
    salePrice: 49.99,
    trackingCode: 'PER987654321'
  },
  {
    id: 'ORD-9004',
    store: 'DetoxLife',
    product: 'Licuadora Portátil SmoothGo',
    customer: 'Mariana Torres',
    createdAt: subDays(today, 6).toISOString(),
    status: 'Entregado',
    paymentMethod: 'COD',
    cost: 16,
    shippingCost: 5,
    salePrice: 34.99,
    trackingCode: 'COL456123789'
  },
  {
    id: 'ORD-9005',
    store: 'SofiFit Store',
    product: 'Faja Reductora Post Parto',
    customer: 'Dayana Castro',
    createdAt: subDays(today, 2).toISOString(),
    status: 'Registrar pago',
    paymentMethod: 'TC',
    cost: 18,
    shippingCost: 5.5,
    salePrice: 39.99
  }
];

const initialMovements: Movement[] = [
  {
    id: 'MOV-1001',
    type: 'Ingreso',
    category: 'Recarga',
    description: 'Recarga USDT - Binance',
    amount: 1500,
    date: subDays(today, 2).toISOString()
  },
  {
    id: 'MOV-1002',
    type: 'Egreso',
    category: 'Confirmación pedido',
    description: 'ORD-9002 - Confirmación costo + envío',
    amount: -13.5,
    date: subDays(today, 2).toISOString()
  },
  {
    id: 'MOV-1003',
    type: 'Ingreso',
    category: 'Acreditación',
    description: 'ORD-9004 - Pedido COD entregado',
    amount: 27.49,
    date: subDays(today, 1).toISOString()
  },
  {
    id: 'MOV-1004',
    type: 'Egreso',
    category: 'Envío',
    description: 'Pago courier semana 32',
    amount: -78.9,
    date: subDays(today, 4).toISOString()
  },
  {
    id: 'MOV-1005',
    type: 'Egreso',
    category: 'Comisión',
    description: 'Comisión plataforma - Agosto',
    amount: -125.35,
    date: subDays(today, 7).toISOString()
  }
];

const initialWalletRequests: WalletRequest[] = [
  {
    id: 'REQ-501',
    type: 'Ingreso',
    status: 'Pendiente',
    amount: 1200,
    createdAt: subDays(today, 1).toISOString(),
    reference: 'TRX-9932ABCD'
  },
  {
    id: 'REQ-502',
    type: 'Retiro',
    status: 'Aprobada',
    amount: 650,
    createdAt: subDays(today, 4).toISOString(),
    processedAt: subDays(today, 3).toISOString(),
    reference: 'RET-5567XYZ'
  },
  {
    id: 'REQ-503',
    type: 'Ingreso',
    status: 'Rechazada',
    amount: 300,
    createdAt: subDays(today, 6).toISOString(),
    processedAt: subDays(today, 5).toISOString(),
    reference: 'TRX-1099LMN'
  }
];

const initialConnections: Connection[] = [
  {
    id: 'CON-101',
    storeName: 'SofiFit Store',
    platform: 'Shopify',
    status: 'Activa',
    connectedAt: subDays(today, 90).toISOString(),
    lastSync: addDays(subDays(today, 0), -0.2).toISOString()
  },
  {
    id: 'CON-102',
    storeName: 'GlowUp Boutique',
    platform: 'Shopify',
    status: 'Sincronizando',
    connectedAt: subDays(today, 45).toISOString(),
    lastSync: subDays(today, 1).toISOString()
  },
  {
    id: 'CON-103',
    storeName: 'UrbanStep',
    platform: 'Shopify',
    status: 'Error',
    connectedAt: subDays(today, 30).toISOString(),
    lastSync: subDays(today, 3).toISOString()
  }
];

export const users: User[] = [
  {
    id: 'USR-100',
    name: 'Sofía Martínez',
    email: 'sofia@latinecom.com',
    password: 'dropship123',
    role: 'dropshipper'
  },
  {
    id: 'USR-101',
    name: 'Ana González',
    email: 'ana@latinecom.com',
    password: 'admin123',
    role: 'admin'
  }
];

export let products: Product[] = clone(initialProducts);
export let orders: Order[] = clone(initialOrders);
export let movements: Movement[] = clone(initialMovements);
export let walletRequests: WalletRequest[] = clone(initialWalletRequests);
export let connections: Connection[] = clone(initialConnections);

export const resetDataStores = () => {
  products = clone(initialProducts);
  orders = clone(initialOrders);
  movements = clone(initialMovements);
  walletRequests = clone(initialWalletRequests);
  connections = clone(initialConnections);
};

export const collectDashboardPayload = (
  filteredOrders: Order[],
  filteredMovements: Movement[],
  currentProducts: Product[]
): DashboardPayload => ({
  orders: filteredOrders,
  movements: filteredMovements,
  products: currentProducts,
  orderStatusSummary: buildOrderStatusSummary(filteredOrders),
  topProducts: buildTopProducts(filteredOrders),
  billingBreakdown: buildBillingBreakdown(filteredOrders)
});

export const buildOrderStatusSummary = (items: Order[]): OrderStatusSummaryItem[] => {
  const summary = new Map<OrderStatus, number>();

  items.forEach((order) => {
    summary.set(order.status, (summary.get(order.status) ?? 0) + 1);
  });

  return Array.from(summary.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([status, value]) => ({ status, value }));
};

export const buildTopProducts = (items: Order[]): TopProductSummary[] => {
  const stats = new Map<string, TopProductSummary>();

  items.forEach((order) => {
    const entry = stats.get(order.product);
    if (entry) {
      entry.units += 1;
      entry.revenue += order.salePrice;
    } else {
      stats.set(order.product, { product: order.product, units: 1, revenue: order.salePrice });
    }
  });

  return Array.from(stats.values()).sort((a, b) => b.units - a.units);
};

export const buildBillingBreakdown = (items: Order[]): BillingBreakdownItem[] => {
  if (!items.length) {
    return [
      { name: 'Facturación total', value: 0 },
      { name: 'Costos de producto', value: 0 },
      { name: 'Comisiones plataforma', value: 0 },
      { name: 'Comisión COD', value: 0 },
      { name: 'Envíos', value: 0 },
      { name: 'Ganancia neta', value: 0 }
    ];
  }

  const totalRevenue = items.reduce((acc, order) => acc + order.salePrice, 0);
  const productCosts = items.reduce((acc, order) => acc + order.cost, 0);
  const shippingCosts = items.reduce((acc, order) => acc + order.shippingCost, 0);
  const platformFees = totalRevenue * 0.05;
  const codCommission = items
    .filter((order) => order.paymentMethod === 'COD')
    .reduce((acc, order) => acc + order.salePrice * 0.03, 0);
  const netProfit = totalRevenue - productCosts - shippingCosts - platformFees - codCommission;

  return [
    { name: 'Facturación total', value: Number(totalRevenue.toFixed(2)) },
    { name: 'Costos de producto', value: Number(productCosts.toFixed(2)) },
    { name: 'Comisiones plataforma', value: Number(platformFees.toFixed(2)) },
    { name: 'Comisión COD', value: Number(codCommission.toFixed(2)) },
    { name: 'Envíos', value: Number(shippingCosts.toFixed(2)) },
    { name: 'Ganancia neta', value: Number(netProfit.toFixed(2)) }
  ];
};
