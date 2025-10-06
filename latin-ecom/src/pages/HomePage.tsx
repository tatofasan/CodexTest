import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import { Activity, Package, TrendingUp, Wallet } from 'lucide-react';
import { useDashboard } from '../api/hooks';
import { format } from 'date-fns';
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

  const deliveredRate = orders.length
    ? Math.round((orders.filter((order) => order.status === 'Entregado').length / orders.length) * 100)
    : 0;
  const incidents = orders.filter((order) => ['En revisión', 'Registrar pago'].includes(order.status)).length;
  const pendingToConfirm = orders.filter((order) => order.status === 'Pendiente').length;
  const walletBalance = movements.reduce((acc, mov) => acc + mov.amount, 3450);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pedidos entregados"
          value={`${deliveredRate}%`}
          trend={{ label: 'vs. mes anterior', value: '+8%', positive: true }}
          icon={<Activity />}
        />
        <StatCard
          title="Pedidos con incidencias"
          value={`${incidents}`}
          trend={{ label: 'A revisión', value: '+2 casos', positive: false }}
          icon={<TrendingUp />}
        />
        <StatCard
          title="Pendientes por confirmar"
          value={`${pendingToConfirm}`}
          trend={{ label: 'Últimas 24h', value: '3 nuevos', positive: false }}
          icon={<Package />}
        />
        <StatCard
          title="Saldo billetera"
          value={`USDT ${walletBalance.toFixed(2)}`}
          trend={{ label: 'Última recarga', value: 'USDT 1,500', positive: true }}
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
