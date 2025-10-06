import { render, screen } from '@testing-library/react';
import DashboardLayout from '../layouts/DashboardLayout';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <DashboardLayout>
        <div>Contenido de prueba</div>
      </DashboardLayout>
    </MemoryRouter>
  );

describe('DashboardLayout', () => {
  it('muestra todos los enlaces de navegación y el contenido hijo', () => {
    renderWithRouter('/productos');

    const links = [
      'Dashboard',
      'Productos',
      'Pedidos',
      'Conexiones',
      'Movimientos',
      'Solicitudes',
      'Mi cuenta',
      'Mi perfil'
    ];

    links.forEach((link) => {
      expect(screen.getByRole('link', { name: link })).toBeVisible();
    });

    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  it('resalta el enlace correspondiente a la ruta activa', () => {
    renderWithRouter('/pedidos');

    const activeLink = screen.getByRole('link', { name: 'Pedidos' });
    expect(activeLink).toHaveAttribute('class', expect.stringContaining('bg-primary/10'));
  });

  it('permite alternar la visibilidad del menú lateral en pantallas pequeñas', async () => {
    renderWithRouter('/');
    const user = userEvent.setup();
    const toggleButton = screen.getByRole('button', { name: 'Cerrar menú de navegación' });

    const sidebar = screen.getByRole('complementary');
    expect(sidebar).toHaveAttribute('class', expect.stringContaining('translate-x-0'));

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-label', 'Abrir menú de navegación');
    expect(sidebar).toHaveAttribute('class', expect.stringContaining('-translate-x-full'));
  });
});
