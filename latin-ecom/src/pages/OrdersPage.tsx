import { useMemo, useState } from 'react';
import SectionCard from '../components/SectionCard';
import { orders } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Filter, FileText } from 'lucide-react';
import clsx from 'clsx';

const statusOptions = ['Todos', ...Array.from(new Set(orders.map((order) => order.status)))];
const paymentOptions = ['Todos', 'TC', 'COD'];

const OrdersPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [paymentMethod, setPaymentMethod] = useState('Todos');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(orders[0]?.id ?? null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = selectedStatus === 'Todos' || order.status === selectedStatus;
      const matchesPayment = paymentMethod === 'Todos' || order.paymentMethod === paymentMethod;
      return matchesStatus && matchesPayment;
    });
  }, [paymentMethod, selectedStatus]);

  const currentOrder = filteredOrders.find((order) => order.id === selectedOrder) ?? filteredOrders[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <SectionCard
        title="Gestión de pedidos"
        subtitle="Consulta y actualiza el estado de tus pedidos sincronizados"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary">
            <FileText size={16} /> Exportar reporte
          </button>
        }
      >
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Estado</label>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="mt-1 h-10 rounded-xl border border-slate-200 px-3 text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Método de pago</label>
            <select
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              className="mt-1 h-10 rounded-xl border border-slate-200 px-3 text-sm"
            >
              {paymentOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm text-slate-600">
            <Filter size={16} /> Filtros avanzados
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Pedido</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Cliente</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Estado</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-500">Método</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-500">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order.id)}
                  className={clsx('cursor-pointer transition-colors hover:bg-primary/5', {
                    'bg-primary/10': order.id === currentOrder?.id
                  })}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-secondary">{order.id}</div>
                    <div className="text-xs text-slate-500">{order.product}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{order.customer}</div>
                    <div className="text-xs text-slate-400">{order.store}</div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-4 py-3 text-slate-600">{order.paymentMethod}</td>
                  <td className="px-4 py-3 text-right font-semibold text-secondary">
                    USDT {(order.salePrice + order.shippingCost).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Detalle del pedido" subtitle="Información resumida del pedido seleccionado">
        {currentOrder ? (
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="text-xs text-slate-500">ID</p>
              <p className="text-base font-semibold text-secondary">{currentOrder.id}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-500">Producto</p>
                <p className="font-medium text-secondary">{currentOrder.product}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Cliente</p>
                <p>{currentOrder.customer}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tienda</p>
                <p>{currentOrder.store}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Fecha ingreso</p>
                <p>{format(new Date(currentOrder.createdAt), "d 'de' MMMM, HH:mm", { locale: es })}</p>
              </div>
            </div>
            <div className="grid gap-2 rounded-xl bg-slate-50 p-4">
              <div className="flex justify-between">
                <span>Costo producto</span>
                <span>USDT {currentOrder.cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>USDT {currentOrder.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-secondary">
                <span>Total venta</span>
                <span>USDT {currentOrder.salePrice.toFixed(2)}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500">Tracking</p>
              <p className="font-medium text-secondary">{currentOrder.trackingCode ?? 'Pendiente de generar'}</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-500">Acciones rápidas</p>
              <div className="grid gap-2">
                <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white">Confirmar pedido</button>
                <button className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-secondary">
                  Registrar pago manual
                </button>
                <button className="rounded-xl border border-danger/40 px-4 py-2 text-xs font-semibold text-danger">
                  Reportar incidencia
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Selecciona un pedido para ver los detalles.</p>
        )}
      </SectionCard>
    </div>
  );
};

export default OrdersPage;
