import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import { Activity, Package, TrendingUp, Wallet } from 'lucide-react';
import { useDashboard } from '../api/hooks';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const chartColors = ['#1F7A8C', '#022B3A', '#EE6C4D', '#1EAE98', '#F4D35E', '#A1AEC4', '#9B287B', '#3A506B'];

const HomePage = () => {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return <LoadingState message="Cargando resumen general..." />;
  }

  if (isError || !data) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  const { orders, movements, products, orderStatusSummary, topProducts, billingBreakdown } = data;

  const deliveredOrders = orders.filter((order) => order.status === 'Entregado');
  const deliveredRate = orders.length ? Math.round((deliveredOrders.length / orders.length) * 100) : 0;
  const latestDelivered = deliveredOrders
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

  const incidentOrders = orders.filter((order) => ['En revisión', 'Registrar pago'].includes(order.status));
  const incidents = incidentOrders.length;
  const latestIncident = incidentOrders
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

  const pendingOrders = orders.filter((order) => order.status === 'Pendiente');
  const pendingToConfirm = pendingOrders.length;
  const latestPending = pendingOrders
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

  const sortedMovements = movements.slice().sort((a, b) => b.date.localeCompare(a.date));
  const walletBalance = movements.reduce((acc, mov) => acc + mov.amount, 0);
  const latestMovement = sortedMovements[0];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pedidos entregados"
          value={`${deliveredRate}%`}
          trend={
            latestDelivered
              ? {
                  label: 'Última entrega',
                  value: formatDistanceToNow(new Date(latestDelivered.createdAt), { addSuffix: true, locale: es }),
                  positive: true
                }
              : { label: 'Entregas registradas', value: 'Sin registros', positive: true }
          }
          icon={<Activity />}
        />
        <StatCard
          title="Pedidos con incidencias"
          value={`${incidents}`}
          trend={
            latestIncident
              ? {
                  label: 'Última incidencia',
                  value: formatDistanceToNow(new Date(latestIncident.createdAt), { addSuffix: true, locale: es }),
                  positive: false
                }
              : { label: 'Estado', value: 'Sin incidencias activas', positive: true }
          }
          icon={<TrendingUp />}
        />
        <StatCard
          title="Pendientes por confirmar"
          value={`${pendingToConfirm}`}
          trend={
            latestPending
              ? {
                  label: 'Último ingreso',
                  value: formatDistanceToNow(new Date(latestPending.createdAt), { addSuffix: true, locale: es }),
                  positive: pendingToConfirm === 0
                }
              : { label: 'Estado', value: 'Sin pedidos pendientes', positive: true }
          }
          icon={<Package />}
        />
        <StatCard
          title="Saldo billetera"
          value={`USDT ${walletBalance.toFixed(2)}`}
          trend={
            latestMovement
              ? {
                  label: 'Último movimiento',
                  value: `${latestMovement.amount > 0 ? '+' : '-'}USDT ${Math.abs(latestMovement.amount).toFixed(2)} · ${formatDistanceToNow(
                    new Date(latestMovement.date),
                    { addSuffix: true, locale: es }
                  )}`,
                  positive: latestMovement.amount >= 0
                }
              : { label: 'Último movimiento', value: 'Sin registros', positive: true }
          }
          icon={<Wallet />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard
          title="Estado de pedidos"
          subtitle="Distribución de pedidos por estado en los últimos 30 días"
          className="xl:col-span-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatusSummary}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => [`${value} pedidos`, 'Cantidad']} />
                <Legend />
                <Bar dataKey="value" name="Pedidos">
                  {orderStatusSummary.map((entry, index) => (
                    <Cell key={entry.status} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Top productos" subtitle="Unidades vendidas y facturación">
          <div className="space-y-4">
            {topProducts.map((item) => (
              <div key={item.product} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-secondary">{item.product}</p>
                  <p className="text-sm text-slate-500">{item.units} unidades vendidas</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">USDT {item.revenue.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">Precio promedio USDT {(item.revenue / item.units).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Facturación" subtitle="Resumen financiero del período seleccionado">
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={billingBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={110}>
                  {billingBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`USDT ${value.toLocaleString()}`, 'Monto']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Timeline de actividad" subtitle="Últimas operaciones registradas">
          <div className="space-y-4">
            {movements.slice(0, 4).map((movement) => (
              <div key={movement.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-secondary">{movement.description}</p>
                  <p className="text-xs text-slate-500">
                    {format(new Date(movement.date), "d 'de' MMMM, HH:mm", { locale: es })}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold ${movement.amount > 0 ? 'text-success' : 'text-danger'}`}
                >
                  {movement.amount > 0 ? '+' : ''}USDT {Math.abs(movement.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Resumen catálogo" subtitle="Productos recientemente actualizados" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Producto</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Proveedor</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Stock</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Costo</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Precio sugerido</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Actualizado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-secondary">{product.name}</div>
                    <div className="text-xs text-slate-500">{product.category}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{product.provider}</td>
                  <td className="px-4 py-3 text-slate-600">{product.stock}</td>
                  <td className="px-4 py-3 text-slate-600">USDT {product.cost.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-600">USDT {product.suggestedPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {format(new Date(product.updatedAt), "d 'de' MMMM", { locale: es })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default HomePage;
