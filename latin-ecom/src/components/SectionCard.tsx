import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

const SectionCard = ({ title, subtitle, action, children, className }: Props) => {
  return (
    <section className={clsx('rounded-2xl border border-slate-200 bg-white p-6 shadow-sm', className)}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-secondary">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
};

export default SectionCard;
