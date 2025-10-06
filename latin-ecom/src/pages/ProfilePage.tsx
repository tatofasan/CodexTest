import SectionCard from '../components/SectionCard';
import { useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'Sofía Martínez',
    role: 'Founder - SofiFit Store',
    email: 'sofia@sofifit.co',
    phone: '+51 989 222 110',
    country: 'Perú'
  });

  return (
    <div className="space-y-6">
      <SectionCard title="Información personal" subtitle="Actualiza los datos visibles para soporte y facturación">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(profile).map(([key, value]) => (
            <label key={key} className="text-sm font-medium text-slate-600">
              <span className="text-xs text-slate-500">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <input
                value={value}
                onChange={(event) => setProfile((prev) => ({ ...prev, [key]: event.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-secondary"
              />
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Guardar cambios</button>
        </div>
      </SectionCard>

      <SectionCard title="Preferencias de seguridad" subtitle="Gestiona el acceso a tu cuenta">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-secondary">Autenticación de dos factores</p>
            <p className="mt-1 text-xs text-slate-500">Recomendado para proteger tus datos</p>
            <button className="mt-3 rounded-xl border border-primary px-3 py-2 text-xs font-semibold text-primary">
              Activar por SMS
            </button>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-secondary">Sesiones activas</p>
            <p className="mt-1 text-xs text-slate-500">2 dispositivos conectados (MacOS, iOS)</p>
            <button className="mt-3 rounded-xl border border-danger/40 px-3 py-2 text-xs font-semibold text-danger">
              Cerrar todas las sesiones
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Equipo y roles" subtitle="Gestiona el acceso de tu equipo a LatinEcom">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Colaborador</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Rol</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Estado</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-500">Último acceso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-4 py-3">
                  <p className="font-semibold text-secondary">Carlos Díaz</p>
                  <p className="text-xs text-slate-500">Operaciones</p>
                </td>
                <td className="px-4 py-3 text-slate-600">Gestor de pedidos</td>
                <td className="px-4 py-3 text-success">Activo</td>
                <td className="px-4 py-3 text-slate-500">08 ago, 09:45</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <p className="font-semibold text-secondary">Andrea López</p>
                  <p className="text-xs text-slate-500">Finanzas</p>
                </td>
                <td className="px-4 py-3 text-slate-600">Administradora financiera</td>
                <td className="px-4 py-3 text-success">Activo</td>
                <td className="px-4 py-3 text-slate-500">07 ago, 15:21</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <p className="font-semibold text-secondary">Leonardo Pérez</p>
                  <p className="text-xs text-slate-500">Atención al cliente</p>
                </td>
                <td className="px-4 py-3 text-slate-600">Soporte</td>
                <td className="px-4 py-3 text-warning">Invitación pendiente</td>
                <td className="px-4 py-3 text-slate-500">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default ProfilePage;
