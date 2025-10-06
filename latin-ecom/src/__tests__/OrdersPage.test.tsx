import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrdersPage from '../pages/OrdersPage';
import { vi } from 'vitest';
import { orders } from '../test/fixtures';

vi.mock('../api/hooks', () => ({
  useOrders: vi.fn()
}));

const { useOrders } = await import('../api/hooks');
const useOrdersMock = vi.mocked(useOrders);

describe('OrdersPage', () => {
  beforeEach(() => {
    useOrdersMock.mockReset();
  });

  it('muestra el estado de carga', () => {
    useOrdersMock.mockReturnValue({ isLoading: true, isError: false, data: undefined, refetch: vi.fn() });
    render(<OrdersPage />);

    expect(screen.getByText('Cargando pedidos...')).toBeInTheDocument();
  });

  it('permite reintentar al fallar la consulta', () => {
    const refetch = vi.fn();
    useOrdersMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch });
    render(<OrdersPage />);

    screen.getByRole('button', { name: 'Reintentar' }).click();
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('filtra por estado y método de pago y actualiza el detalle seleccionado', async () => {
    useOrdersMock.mockReturnValue({ isLoading: false, isError: false, data: orders, refetch: vi.fn() });
    render(<OrdersPage />);
    const user = userEvent.setup();

    const ordersTable = screen.getAllByRole('table')[0];
    expect(within(ordersTable).getAllByRole('row').length).toBeGreaterThan(1);

    const detailSection = screen.getByRole('heading', { name: 'Detalle del pedido' }).closest('section');
    expect(detailSection).not.toBeNull();
    expect(within(detailSection as HTMLElement).getByText('ORD-1001')).toBeInTheDocument();

    await user.click(screen.getByText('ORD-1003'));
    expect(within(detailSection as HTMLElement).getByText('ORD-1003')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Estado'), 'Pendiente');
    expect(within(ordersTable).getAllByRole('row')).toHaveLength(2);

    await user.selectOptions(screen.getByLabelText('Método de pago'), 'COD');
    expect(within(ordersTable).getAllByRole('row')).toHaveLength(2);
    expect(within(detailSection as HTMLElement).getByText('ORD-1002')).toBeInTheDocument();
  });

  it('mantiene activos los botones de acciones rápidas', () => {
    useOrdersMock.mockReturnValue({ isLoading: false, isError: false, data: orders, refetch: vi.fn() });
    render(<OrdersPage />);

    ['Confirmar pedido', 'Registrar pago manual', 'Reportar incidencia', 'Exportar reporte', 'Filtros avanzados'].forEach(
      (label) => {
        expect(screen.getByRole('button', { name: label })).toBeEnabled();
      }
    );
  });
});
