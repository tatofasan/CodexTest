import type {
  BillingBreakdownItem,
  Connection,
  DashboardResponse,
  Movement,
  Order,
  Product,
  WalletRequest
} from '../../utils/types';

export const dashboardResponse: DashboardResponse = {
  orders: [
    {
      id: 'ORD-1001',
      store: 'SofiFit Store',
      product: 'Kit de bandas elásticas',
      customer: 'María Paredes',
      createdAt: '2024-07-28T15:00:00.000Z',
      status: 'Entregado',
      paymentMethod: 'TC',
      cost: 34,
      shippingCost: 6,
      salePrice: 55,
      trackingCode: 'TRK-5551'
    },
    {
      id: 'ORD-1002',
      store: 'SofiFit Store',
      product: 'Botella inteligente 1L',
      customer: 'Andrea Díaz',
      createdAt: '2024-07-27T13:30:00.000Z',
      status: 'Pendiente',
      paymentMethod: 'COD',
      cost: 21,
      shippingCost: 5,
      salePrice: 39,
      trackingCode: undefined
    },
    {
      id: 'ORD-1003',
      store: 'SofiFit Store',
      product: 'Proteína vegana cacao',
      customer: 'Lucía Chávez',
      createdAt: '2024-07-20T09:45:00.000Z',
      status: 'En revisión',
      paymentMethod: 'TC',
      cost: 42,
      shippingCost: 8,
      salePrice: 72,
      trackingCode: 'TRK-5582'
    }
  ],
  movements: [
    {
      id: 'MOV-2001',
      type: 'Ingreso',
      category: 'Confirmación pedido',
      description: 'Venta Kit de bandas elásticas',
      amount: 75,
      date: '2024-07-28T18:30:00.000Z'
    },
    {
      id: 'MOV-2002',
      type: 'Egreso',
      category: 'Envío',
      description: 'Logística pedido ORD-1001',
      amount: -12,
      date: '2024-07-28T19:00:00.000Z'
    },
    {
      id: 'MOV-2003',
      type: 'Ingreso',
      category: 'Acreditación',
      description: 'Recarga manual',
      amount: 1500,
      date: '2024-07-18T11:15:00.000Z'
    }
  ],
  products: [
    {
      id: 'PROD-10',
      name: 'Kit de bandas elásticas',
      category: 'Fitness',
      provider: 'MovePro',
      cost: 34,
      suggestedPrice: 59,
      stock: 120,
      shippingTime: '48 horas',
      updatedAt: '2024-07-26T10:00:00.000Z',
      rating: 4.8
    },
    {
      id: 'PROD-11',
      name: 'Botella inteligente 1L',
      category: 'Accesorios',
      provider: 'HydrateX',
      cost: 21,
      suggestedPrice: 39,
      stock: 85,
      shippingTime: '72 horas',
      updatedAt: '2024-07-24T10:00:00.000Z',
      rating: 4.6
    },
    {
      id: 'PROD-12',
      name: 'Proteína vegana cacao',
      category: 'Nutrición',
      provider: 'GreenFuel',
      cost: 42,
      suggestedPrice: 75,
      stock: 40,
      shippingTime: '5 días',
      updatedAt: '2024-07-22T10:00:00.000Z',
      rating: 4.9
    }
  ],
  orderStatusSummary: [
    { status: 'Pendiente', value: 4 },
    { status: 'En revisión', value: 2 },
    { status: 'Entregado', value: 12 },
    { status: 'Cancelado', value: 1 }
  ],
  topProducts: [
    { product: 'Kit de bandas elásticas', units: 38, revenue: 2210 },
    { product: 'Proteína vegana cacao', units: 25, revenue: 1875 },
    { product: 'Botella inteligente 1L', units: 49, revenue: 1911 }
  ],
  billingBreakdown: [
    { name: 'Costos de producto', value: 3250 },
    { name: 'Comisiones', value: 950 },
    { name: 'Logística', value: 780 }
  ]
};

export const products: Product[] = dashboardResponse.products;

export const orders: Order[] = dashboardResponse.orders;

export const movements: Movement[] = dashboardResponse.movements;

export const walletRequests: WalletRequest[] = [
  {
    id: 'REQ-3001',
    type: 'Ingreso',
    status: 'Pendiente',
    amount: 450,
    createdAt: '2024-07-25T12:00:00.000Z',
    reference: 'Recarga USDT Julio'
  },
  {
    id: 'REQ-3002',
    type: 'Retiro',
    status: 'Aprobada',
    amount: 320,
    createdAt: '2024-07-20T09:30:00.000Z',
    processedAt: '2024-07-20T14:45:00.000Z',
    reference: 'Pago proveedor semana 29'
  },
  {
    id: 'REQ-3003',
    type: 'Retiro',
    status: 'Rechazada',
    amount: 210,
    createdAt: '2024-07-18T16:15:00.000Z',
    processedAt: '2024-07-18T18:30:00.000Z',
    reference: 'Reintegro tarjetas COD'
  }
];

export const connections: Connection[] = [
  {
    id: 'CON-5001',
    storeName: 'SofiFit Shopify',
    platform: 'Shopify',
    status: 'Activa',
    connectedAt: '2024-05-10T10:00:00.000Z',
    lastSync: '2024-07-30T22:10:00.000Z'
  },
  {
    id: 'CON-5002',
    storeName: 'Wellness Peru',
    platform: 'Shopify',
    status: 'Sincronizando',
    connectedAt: '2024-06-01T11:30:00.000Z',
    lastSync: '2024-07-30T21:50:00.000Z'
  },
  {
    id: 'CON-5003',
    storeName: 'Healthy Life Co',
    platform: 'Shopify',
    status: 'Error',
    connectedAt: '2024-04-22T09:00:00.000Z',
    lastSync: '2024-07-29T18:40:00.000Z'
  }
];

export const billingBreakdown: BillingBreakdownItem[] = dashboardResponse.billingBreakdown;
