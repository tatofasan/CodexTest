import clsx from 'clsx';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState = ({ message = 'Cargando datos...', className }: LoadingStateProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm',
        className
      )}
    >
      <span className="inline-flex h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-primary" />
      <p className="text-sm font-medium text-secondary">{message}</p>
    </div>
  );
};

export default LoadingState;
