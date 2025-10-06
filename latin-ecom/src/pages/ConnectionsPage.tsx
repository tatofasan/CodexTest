import SectionCard from '../components/SectionCard';
import { connections } from '../data/mockData';
import { Link2, RefreshCw, PlugZap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const statusClass = {
  Activa: 'text-success bg-success/10',
  Sincronizando: 'text-warning bg-warning/10',
  Error: 'text-danger bg-danger/10'
} as const;

const ConnectionsPage = () => {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Tiendas conectadas"
        subtitle="Gestiona tus integraciones con Shopify y sincroniza tus pedidos"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
            <PlugZap size={16} /> Conectar nueva tienda
          </button>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          {connections.map((connection) => (
            <article key={connection.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-secondary">{connection.storeName}</h3>
                  <p className="text-sm text-slate-500">{connection.platform}</p>
                </div>
                <span className="text-xs font-semibold text-primary">{connection.id}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className={`rounded-full px-3 py-1 ${statusClass[connection.status]}`}>{connection.status}</span>
                <span className="text-slate-500">
                  Última sincronización {formatDistanceToNow(new Date(connection.lastSync), { addSuffix: true, locale: es })}
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Conectada</span>
                  <span>{new Date(connection.connectedAt).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Última sincronización</span>
                  <span>{new Date(connection.lastSync).toLocaleString('es-ES')}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-secondary px-4 py-2 text-xs font-semibold text-white">
                  Ver pedidos sincronizados
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-xs font-semibold text-primary">
                  <RefreshCw size={14} /> Sincronizar ahora
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Estado de integraciones" subtitle="Resumen de la salud de tus conexiones">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-inner">
            <p className="text-sm text-slate-500">Integraciones activas</p>
            <p className="mt-2 text-3xl font-semibold text-secondary">
              {connections.filter((item) => item.status === 'Activa').length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-inner">
            <p className="text-sm text-slate-500">Requieren atención</p>
            <p className="mt-2 text-3xl font-semibold text-warning">
              {connections.filter((item) => item.status !== 'Activa').length}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-inner">
            <p className="text-sm text-slate-500">Pedidos sincronizados 30d</p>
            <p className="mt-2 text-3xl font-semibold text-primary">186</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <Link2 className="mt-1 text-primary" />
            <div>
              <p className="font-semibold text-secondary">¿Cómo funciona la sincronización?</p>
              <p>
                LatinEcom escucha los webhooks de Shopify para ingresar automáticamente cada pedido que recibe tu tienda. Cuando un
                pedido se confirma, descontamos el saldo correspondiente y actualizamos el tracking en Shopify sin intervención
                manual.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default ConnectionsPage;
