import SectionCard from '../components/SectionCard';
import { walletRequests } from '../data/mockData';
import { useMemo, useState } from 'react';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { CircleCheck, CircleDashed, CircleX, PlusCircle } from 'lucide-react';

const statusStyles = {
  Pendiente: 'bg-warning/10 text-warning',
  Aprobada: 'bg-success/10 text-success',
  Rechazada: 'bg-danger/10 text-danger'
} as const;

const RequestsPage = () => {
  const [statusFilter, setStatusFilter] = useState<'Todas' | keyof typeof statusStyles>('Todas');

  const filtered = useMemo(() => {
    return walletRequests.filter((request) => statusFilter === 'Todas' || request.status === statusFilter);
  }, [statusFilter]);

  return (
    <SectionCard
      title="Solicitudes financieras"
      subtitle="Revisa el estado de tus ingresos y retiros"
      action={
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
            <PlusCircle size={16} /> Ingresar dinero
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary">
            Retirar dinero
          </button>
        </div>
      }
    >
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setStatusFilter('Todas')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
            statusFilter === 'Todas' ? 'bg-secondary text-white' : 'bg-slate-100 text-secondary'
          }`}
        >
          <CircleDashed size={16} /> Todas
        </button>
        <button
          onClick={() => setStatusFilter('Pendiente')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
            statusFilter === 'Pendiente' ? 'bg-warning text-white' : 'bg-warning/10 text-warning'
          }`}
        >
          <CircleDashed size={16} /> Pendientes
        </button>
        <button
          onClick={() => setStatusFilter('Aprobada')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
            statusFilter === 'Aprobada' ? 'bg-success text-white' : 'bg-success/10 text-success'
          }`}
        >
          <CircleCheck size={16} /> Aprobadas
        </button>
        <button
          onClick={() => setStatusFilter('Rechazada')}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${
            statusFilter === 'Rechazada' ? 'bg-danger text-white' : 'bg-danger/10 text-danger'
          }`}
        >
          <CircleX size={16} /> Rechazadas
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-slate-500">Solicitud</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-500">Tipo</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-500">Estado</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-500">Fecha</th>
              <th className="px-4 py-2 text-right font-semibold text-slate-500">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filtered.map((request) => (
              <tr key={request.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-secondary">
                  <p className="font-semibold">{request.reference}</p>
                  <p className="text-xs text-slate-500">{request.id}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{request.type}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[request.status]}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {format(new Date(request.createdAt), "d 'de' MMMM yyyy, HH:mm", { locale: es })}
                  {request.processedAt && (
                    <p className="text-xs text-slate-400">
                      Procesado {format(new Date(request.processedAt), "d MMM HH:mm", { locale: es })}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-secondary">
                  USDT {request.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

export default RequestsPage;
