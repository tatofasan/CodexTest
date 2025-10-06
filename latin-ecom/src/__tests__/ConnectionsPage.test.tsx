import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConnectionsPage from '../pages/ConnectionsPage';
import { vi } from 'vitest';
import { connections, orders } from '../test/fixtures';

vi.mock('../api/hooks', () => ({
  useConnections: vi.fn(),
  useOrders: vi.fn()
}));

const { useConnections, useOrders } = await import('../api/hooks');
const useConnectionsMock = vi.mocked(useConnections);
const useOrdersMock = vi.mocked(useOrders);

describe('ConnectionsPage', () => {
  beforeEach(() => {
    useConnectionsMock.mockReset();
    useOrdersMock.mockReset();
  });

  it('muestra el estado de carga cuando las consultas siguen en progreso', () => {
    useConnectionsMock.mockReturnValue({ isLoading: true, isError: false, data: undefined, refetch: vi.fn() });
    useOrdersMock.mockReturnValue({ isLoading: false, isError: false, data: orders, refetch: vi.fn() });

    render(<ConnectionsPage />);
    expect(screen.getByText('Cargando integraciones...')).toBeInTheDocument();
  });

  it('permite reintentar cuando alguna consulta falla', () => {
    const refetchConnections = vi.fn();
    const refetchOrders = vi.fn();
    useConnectionsMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch: refetchConnections });
    useOrdersMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch: refetchOrders });

    render(<ConnectionsPage />);
    const retry = screen.getByRole('button', { name: 'Reintentar' });
    retry.click();

    expect(refetchConnections).toHaveBeenCalledTimes(1);
    expect(refetchOrders).toHaveBeenCalledTimes(1);
  });

  it('renderiza las conexiones y mantiene habilitados los botones clave', async () => {
    useConnectionsMock.mockReturnValue({ isLoading: false, isError: false, data: connections, refetch: vi.fn() });
    useOrdersMock.mockReturnValue({ isLoading: false, isError: false, data: orders, refetch: vi.fn() });

    render(<ConnectionsPage />);

    expect(screen.getByRole('button', { name: 'Conectar nueva tienda' })).toBeEnabled();
    expect(screen.getAllByRole('button', { name: 'Sincronizar ahora' })).toHaveLength(connections.length);
    expect(screen.getAllByRole('button', { name: 'Ver pedidos sincronizados' })).toHaveLength(connections.length);

    const user = userEvent.setup();
    await user.click(screen.getAllByRole('button', { name: 'Sincronizar ahora' })[0]);
    await user.click(screen.getAllByRole('button', { name: 'Ver pedidos sincronizados' })[0]);

    expect(screen.getByText('Estado de integraciones')).toBeInTheDocument();
    expect(screen.getByText('Integraciones activas')).toBeInTheDocument();
  });
});
