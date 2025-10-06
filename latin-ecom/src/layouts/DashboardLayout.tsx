import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Wallet, Home, PackageSearch, ShoppingCart, Link2, User, Settings } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/productos', label: 'Productos', icon: PackageSearch },
  { to: '/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { to: '/conexiones', label: 'Conexiones', icon: Link2 },
  { to: '/wallet/movimientos', label: 'Movimientos', icon: Wallet },
  { to: '/wallet/solicitudes', label: 'Solicitudes', icon: Menu },
  { to: '/mi-cuenta', label: 'Mi cuenta', icon: Settings },
  { to: '/mi-perfil', label: 'Mi perfil', icon: User }
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside
        className={clsx(
          'hidden lg:flex flex-col w-72 shrink-0 border-r border-slate-200 bg-white transition-all',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-200">
          <span className="text-2xl font-semibold text-primary">LatinEcom</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-primary'
                )
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 text-xs text-slate-400 border-t border-slate-200">
          © {new Date().getFullYear()} LatinEcom.
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="lg:hidden rounded-lg border border-slate-200 p-2 text-slate-600"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-sm text-slate-500">Bienvenido de nuevo</p>
                <h1 className="text-xl font-semibold text-secondary">Sofía Martínez</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Saldo disponible</p>
                <p className="text-lg font-semibold text-primary">USDT 3,450.00</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                SM
              </div>
            </div>
          </div>
          <div className="px-6 pb-4 text-sm text-slate-400">
            {navItems.find((item) => item.to === location.pathname)?.label ?? 'Dashboard general'}
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
