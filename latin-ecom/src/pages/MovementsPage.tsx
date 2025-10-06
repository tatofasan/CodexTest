import { useMemo, useState } from 'react';
import SectionCard from '../components/SectionCard';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowDownCircle, ArrowUpCircle, Download } from 'lucide-react';
import { useMovements } from '../api/hooks';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

const typeOptions = ['Todos', 'Ingreso', 'Egreso'] as const;

const MovementsPage = () => {
  const { data, isLoading, isError, refetch } = useMovements();
  const movements = useMemo(() => data ?? [], [data]);
  const [typeFilter, setTypeFilter] = useState<(typeof typeOptions)[number]>('Todos');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const categoryOptions = useMemo(
    () => ['Todas', ...Array.from(new Set(movements.map((movement) => movement.category)))] as const,
    [movements]
  );

  const filtered = useMemo(() => {
    return movements.filter((movement) => {
      const typeOk = typeFilter === 'Todos' || movement.type === typeFilter;
      const categoryOk = categoryFilter === 'Todas' || movement.category === categoryFilter;
      return typeOk && categoryOk;
    });
  }, [categoryFilter, movements, typeFilter]);

  const totals = filtered.reduce(
    (acc, movement) => {
      if (movement.amount > 0) {
        acc.incomes += movement.amount;
      } else {
        acc.expenses += movement.amount;
      }
      return acc;
    },
    { incomes: 0, expenses: 0 }
  );

  if (isLoading) {
    return <LoadingState message="Cargando movimientos..." />;
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <SectionCard
      title="Movimientos de billetera"
      subtitle="Consulta el histórico de ingresos y egresos"
      action={
        <button className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary">
          <Download size={16} /> Exportar CSV
        </button>
      }
    >
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-500" htmlFor="movement-type-filter">
            Tipo
          </label>
          <select
            id="movement-type-filter"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as (typeof typeOptions)[number])}
            className="mt-1 h-10 rounded-xl border border-slate-200 px-3 text-sm"
          >
            {typeOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500" htmlFor="movement-category-filter">
            Categoría
          </label>
          <select
            id="movement-category-filter"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="mt-1 h-10 rounded-xl border border-slate-200 px-3 text-sm"
          >
            {categoryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-success/10 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-success">
            <ArrowUpCircle size={18} /> Ingresos filtrados
          </p>
          <p className="mt-1 text-2xl font-semibold text-success">USDT {totals.incomes.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl bg-danger/10 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-danger">
            <ArrowDownCircle size={18} /> Egresos filtrados
          </p>
          <p className="mt-1 text-2xl font-semibold text-danger">USDT {Math.abs(totals.expenses).toFixed(2)}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-slate-500">Fecha</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-500">Descripción</th>
              <th className="px-4 py-2 text-left font-semibold text-slate-500">Categoría</th>
              <th className="px-4 py-2 text-right font-semibold text-slate-500">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filtered.map((movement) => (
              <tr key={movement.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-500">
                  {format(new Date(movement.date), "d 'de' MMMM yyyy, HH:mm", { locale: es })}
                </td>
                <td className="px-4 py-3 text-secondary">
                  <p className="font-medium">{movement.description}</p>
                  <p className="text-xs text-slate-500">{movement.id}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{movement.category}</td>
                <td className={`px-4 py-3 text-right font-semibold ${movement.amount > 0 ? 'text-success' : 'text-danger'}`}>
                  {movement.amount > 0 ? '+' : ''}USDT {Math.abs(movement.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

export default MovementsPage;
