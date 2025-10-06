import { addDays, subDays } from 'date-fns';
import { Connection, Movement, Order, Product, WalletRequest } from '../utils/types';

const today = new Date();

export const products: Product[] = [
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

export const orders: Order[] = [
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

export const movements: Movement[] = [
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

export const walletRequests: WalletRequest[] = [
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

export const connections: Connection[] = [
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

export const orderStatusSummary = [
  { status: 'Pendiente', value: 6 },
  { status: 'Registrar pago', value: 2 },
  { status: 'Confirmado', value: 12 },
  { status: 'Preparado', value: 5 },
  { status: 'Despachado', value: 9 },
  { status: 'Entregado', value: 42 },
  { status: 'En revisión', value: 3 },
  { status: 'Cancelado', value: 4 }
];

export const topProducts = [
  { product: 'Faja Reductora Post Parto', units: 145, revenue: 5800 },
  { product: 'Set de brochas profesionales 12p', units: 98, revenue: 2450 },
  { product: 'Zapatillas Urbanas StreetFlow', units: 76, revenue: 3790 }
];

export const billingBreakdown = [
  { name: 'Facturación total', value: 9250 },
  { name: 'Costos de producto', value: 3450 },
  { name: 'Comisiones plataforma', value: 450 },
  { name: 'Comisión COD', value: 280 },
  { name: 'Envíos', value: 720 },
  { name: 'Ganancia neta', value: 4350 }
];
