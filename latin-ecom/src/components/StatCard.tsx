import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  title: string;
  value: string;
  trend?: {
    label: string;
    value: string;
    positive?: boolean;
  };
  icon?: ReactNode;
  className?: string;
}

const StatCard = ({ title, value, trend, icon, className }: Props) => {
  return (
    <div className={clsx('rounded-2xl border border-slate-200 bg-white p-5 shadow-sm', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-secondary">{value}</p>
        </div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      {trend && (
        <p
          className={clsx(
            'mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
            trend.positive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
          )}
        >
          {trend.label}: {trend.value}
        </p>
      )}
    </div>
  );
};

export default StatCard;
