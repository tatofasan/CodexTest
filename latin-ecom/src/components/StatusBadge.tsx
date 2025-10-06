import clsx from 'clsx';
import { OrderStatus } from '../utils/types';

const statusStyles: Record<OrderStatus | 'default', string> = {
  Pendiente: 'bg-warning/10 text-warning',
  'Registrar pago': 'bg-danger/10 text-danger',
  Confirmado: 'bg-primary/10 text-primary',
  Preparado: 'bg-secondary/10 text-secondary',
  Despachado: 'bg-accent/20 text-secondary',
  Entregado: 'bg-success/10 text-success',
  'En revisión': 'bg-warning/10 text-warning',
  Cancelado: 'bg-slate-200 text-slate-600',
  default: 'bg-slate-200 text-slate-600'
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  return (
    <span className={clsx('inline-flex rounded-full px-3 py-1 text-xs font-medium', statusStyles[status] ?? statusStyles.default)}>
      {status}
    </span>
  );
};

export default StatusBadge;
