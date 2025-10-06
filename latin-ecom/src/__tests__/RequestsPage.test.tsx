import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestsPage from '../pages/RequestsPage';
import { vi } from 'vitest';
import { walletRequests } from '../test/fixtures';

vi.mock('../api/hooks', () => ({
  useWalletRequests: vi.fn()
}));

const { useWalletRequests } = await import('../api/hooks');
const useWalletRequestsMock = vi.mocked(useWalletRequests);

describe('RequestsPage', () => {
  beforeEach(() => {
    useWalletRequestsMock.mockReset();
  });

  it('muestra el estado de carga', () => {
    useWalletRequestsMock.mockReturnValue({ isLoading: true, isError: false, data: undefined, refetch: vi.fn() });
    render(<RequestsPage />);

    expect(screen.getByText('Cargando solicitudes financieras...')).toBeInTheDocument();
  });

  it('permite reintentar cuando ocurre un error', () => {
    const refetch = vi.fn();
    useWalletRequestsMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch });
    render(<RequestsPage />);

    screen.getByRole('button', { name: 'Reintentar' }).click();
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('filtra las solicitudes por estado', async () => {
    useWalletRequestsMock.mockReturnValue({ isLoading: false, isError: false, data: walletRequests, refetch: vi.fn() });
    render(<RequestsPage />);
    const user = userEvent.setup();

    expect(screen.getAllByRole('row')).toHaveLength(walletRequests.length + 1);

    await user.click(screen.getByRole('button', { name: 'Pendientes' }));
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByText('Recarga USDT Julio')).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Aprobadas' }));
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByText('Pago proveedor semana 29')).toBeVisible();
  });

  it('mantiene habilitados los botones de acciones principales', () => {
    useWalletRequestsMock.mockReturnValue({ isLoading: false, isError: false, data: walletRequests, refetch: vi.fn() });
    render(<RequestsPage />);

    ['Ingresar dinero', 'Retirar dinero'].forEach((label) => {
      expect(screen.getByRole('button', { name: label })).toBeEnabled();
    });
  });
});
