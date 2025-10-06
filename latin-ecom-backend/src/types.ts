export type OrderStatus =
  | 'Pendiente'
  | 'Registrar pago'
  | 'Confirmado'
  | 'Preparado'
  | 'Despachado'
  | 'Entregado'
  | 'En revisión'
  | 'Cancelado';

export type PaymentMethod = 'TC' | 'COD';

export interface Product {
  id: string;
  name: string;
  category: string;
  provider: string;
  cost: number;
  suggestedPrice: number;
  stock: number;
  shippingTime: string;
  updatedAt: string;
  rating: number;
}

export interface Order {
  id: string;
  store: string;
  product: string;
  customer: string;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  cost: number;
  shippingCost: number;
  salePrice: number;
  trackingCode?: string;
}

export interface Movement {
  id: string;
  type: 'Ingreso' | 'Egreso';
  category: 'Recarga' | 'Confirmación pedido' | 'Acreditación' | 'Comisión' | 'Envío';
  description: string;
  amount: number;
  date: string;
}

export interface WalletRequest {
  id: string;
  type: 'Ingreso' | 'Retiro';
  status: 'Pendiente' | 'Aprobada' | 'Rechazada';
  amount: number;
  createdAt: string;
  processedAt?: string;
  reference: string;
}

export interface Connection {
  id: string;
  storeName: string;
  platform: 'Shopify';
  status: 'Activa' | 'Sincronizando' | 'Error';
  connectedAt: string;
  lastSync: string;
}

export type UserRole = 'admin' | 'dropshipper';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface OrderStatusSummaryItem {
  status: OrderStatus;
  value: number;
}

export interface TopProductSummary {
  product: string;
  units: number;
  revenue: number;
}

export interface BillingBreakdownItem {
  name: string;
  value: number;
}

export interface DashboardPayload {
  orders: Order[];
  movements: Movement[];
  products: Product[];
  orderStatusSummary: OrderStatusSummaryItem[];
  topProducts: TopProductSummary[];
  billingBreakdown: BillingBreakdownItem[];
}
