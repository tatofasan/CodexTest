import SectionCard from '../components/SectionCard';
import { useState } from 'react';
import { useBillingBreakdown } from '../api/hooks';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const AccountPage = () => {
  const { data, isLoading, isError, refetch } = useBillingBreakdown();
  const billingBreakdown = data ?? [];
  const [autoRecharge, setAutoRecharge] = useState(true);
  const [alerts, setAlerts] = useState({ balance: true, incidents: true, payouts: false });

  if (isLoading) {
    return <LoadingState message="Cargando configuración de cuenta..." />;
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6">
      <SectionCard title="Configuración de facturación" subtitle="Gestiona la forma en que manejamos tus cobros y pagos">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Método principal</p>
            <p className="mt-2 text-xl font-semibold text-secondary">USDT (TRC20)</p>
            <p className="mt-1 text-sm text-slate-500">Tiempo promedio de acreditación: 4 horas</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Cuenta bancaria para retiros</p>
            <p className="mt-2 text-xl font-semibold text-secondary">Banco BCP - 245-5544221</p>
            <p className="mt-1 text-sm text-slate-500">Titular: LatinEcom Dropshipping SAC</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div>
              <p className="text-sm font-semibold text-secondary">Recarga automática</p>
              <p className="text-xs text-slate-500">Confirmamos pedidos hasta saldo de seguridad de USDT 500</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={autoRecharge}
                onChange={(event) => setAutoRecharge(event.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5" />
            </label>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Alertas y notificaciones" subtitle="Mantente al tanto de tus operaciones más críticas">
        <div className="space-y-3 text-sm text-slate-600">
          <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-secondary">Alertas de saldo crítico</p>
              <p className="text-xs text-slate-500">Te notificamos cuando tu saldo sea menor a USDT 300</p>
            </div>
            <input
              type="checkbox"
              checked={alerts.balance}
              onChange={(event) => setAlerts((prev) => ({ ...prev, balance: event.target.checked }))}
              className="h-5 w-5 rounded border-primary text-primary focus:ring-primary"
            />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-secondary">Pedidos con incidencias</p>
              <p className="text-xs text-slate-500">Avisos inmediatos cuando un pedido pasa a revisión</p>
            </div>
            <input
              type="checkbox"
              checked={alerts.incidents}
              onChange={(event) => setAlerts((prev) => ({ ...prev, incidents: event.target.checked }))}
              className="h-5 w-5 rounded border-primary text-primary focus:ring-primary"
            />
          </label>
          <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div>
              <p className="font-semibold text-secondary">Confirmación de retiros</p>
              <p className="text-xs text-slate-500">Resumen diario de retiros acreditados</p>
            </div>
            <input
              type="checkbox"
              checked={alerts.payouts}
              onChange={(event) => setAlerts((prev) => ({ ...prev, payouts: event.target.checked }))}
              className="h-5 w-5 rounded border-primary text-primary focus:ring-primary"
            />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Resumen de costos" subtitle="Detalle de tu estructura de comisiones actual">
        <div className="grid gap-4 md:grid-cols-3">
          {billingBreakdown.map((item) => (
            <div key={item.name} className="rounded-2xl bg-white p-4 text-center shadow-inner">
              <p className="text-sm text-slate-500">{item.name}</p>
              <p className="mt-2 text-2xl font-semibold text-secondary">USDT {item.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default AccountPage;
