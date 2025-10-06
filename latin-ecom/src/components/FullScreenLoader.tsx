const FullScreenLoader = ({ message = 'Cargando...' }: { message?: string }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-lg">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
