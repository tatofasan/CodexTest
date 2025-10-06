import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ApiError } from '../utils/errors';

const demoAccounts = [
  { role: 'Dropshipper', email: 'sofia@latinecom.com', password: 'dropship123' },
  { role: 'Administrador', email: 'ana@latinecom.com', password: 'admin123' }
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Credenciales inválidas. Verifica tu correo y contraseña.');
      } else {
        setError('No fue posible iniciar sesión. Intenta nuevamente más tarde.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrefill = (accountEmail: string, accountPassword: string) => {
    setEmail(accountEmail);
    setPassword(accountPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="grid w-full max-w-5xl gap-12 rounded-3xl bg-white p-10 shadow-xl md:grid-cols-[1.1fr_0.9fr]">
        <section>
          <span className="text-sm font-semibold uppercase tracking-wide text-primary">LatinEcom</span>
          <h1 className="mt-3 text-3xl font-semibold text-secondary md:text-4xl">Accede a tu panel</h1>
          <p className="mt-2 text-sm text-slate-500">
            Gestiona pedidos, catálogo y finanzas desde un único lugar. Inicia sesión con tu cuenta de dropshipper o
            administrador.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-base font-semibold text-secondary">Cuentas de demostración</h2>
            <p className="mt-1 text-sm text-slate-500">Selecciona una cuenta para autocompletar las credenciales.</p>
            <div className="mt-4 grid gap-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handlePrefill(account.email, account.password)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                  <span>{account.role}</span>
                  <span className="text-xs text-slate-500">{account.email}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="tu@latinecom.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-400">
            ¿Necesitas una cuenta? Contacta al administrador de LatinEcom para habilitar tu acceso.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
