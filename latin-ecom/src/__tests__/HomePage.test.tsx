import { render, screen, within } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { vi } from 'vitest';
import { dashboardResponse } from '../test/fixtures';

vi.mock('../api/hooks', () => ({
  useDashboard: vi.fn()
}));

const { useDashboard } = await import('../api/hooks');
const useDashboardMock = vi.mocked(useDashboard);

describe('HomePage', () => {
  beforeEach(() => {
    useDashboardMock.mockReset();
  });

  it('muestra el estado de carga', () => {
    useDashboardMock.mockReturnValue({ isLoading: true, isError: false, data: undefined, refetch: vi.fn() });
    render(<HomePage />);

    expect(screen.getByText('Cargando resumen general...')).toBeInTheDocument();
  });

  it('muestra el estado de error con botón de reintento', async () => {
    const refetch = vi.fn();
    useDashboardMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch });
    render(<HomePage />);

    const retryButton = screen.getByRole('button', { name: 'Reintentar' });
    expect(retryButton).toBeInTheDocument();
    retryButton.click();
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renderiza los resúmenes del dashboard con los datos correctos', () => {
    useDashboardMock.mockReturnValue({ isLoading: false, isError: false, data: dashboardResponse, refetch: vi.fn() });
    render(<HomePage />);

    expect(screen.getByText('Pedidos entregados')).toBeVisible();
    expect(screen.getByText('Pedidos con incidencias')).toBeVisible();
    expect(screen.getByText('Pendientes por confirmar')).toBeVisible();
    expect(screen.getByText('Saldo billetera')).toBeVisible();
    expect(screen.getByText('Top productos')).toBeVisible();
    expect(screen.getByText('Facturación')).toBeVisible();
    expect(screen.getByText('Timeline de actividad')).toBeVisible();

    const topProductsSection = screen.getByRole('heading', { name: 'Top productos' }).closest('section');
    expect(topProductsSection).not.toBeNull();
    dashboardResponse.topProducts.forEach((item) => {
      expect(within(topProductsSection as HTMLElement).getByText(item.product)).toBeInTheDocument();
    });
  });
});
