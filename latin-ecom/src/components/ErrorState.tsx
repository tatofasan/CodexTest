import clsx from 'clsx';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState = ({
  title = 'No pudimos cargar la información',
  description = 'Revisa tu conexión o intenta nuevamente en unos segundos.',
  onRetry,
  className
}: ErrorStateProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-danger/40 bg-white p-10 text-center text-danger shadow-sm',
        className
      )}
    >
      <p className="text-base font-semibold">{title}</p>
      <p className="text-sm text-danger/80">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl border border-danger px-4 py-2 text-xs font-semibold text-danger transition hover:bg-danger/10"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorState;
