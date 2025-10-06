import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovementsPage from '../pages/MovementsPage';
import { vi } from 'vitest';
import { movements } from '../test/fixtures';

vi.mock('../api/hooks', () => ({
  useMovements: vi.fn()
}));

const { useMovements } = await import('../api/hooks');
const useMovementsMock = vi.mocked(useMovements);

describe('MovementsPage', () => {
  beforeEach(() => {
    useMovementsMock.mockReset();
  });

  it('muestra el estado de carga', () => {
    useMovementsMock.mockReturnValue({ isLoading: true, isError: false, data: undefined, refetch: vi.fn() });
    render(<MovementsPage />);

    expect(screen.getByText('Cargando movimientos...')).toBeInTheDocument();
  });

  it('permite reintentar cuando ocurre un error', () => {
    const refetch = vi.fn();
    useMovementsMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch });
    render(<MovementsPage />);

    screen.getByRole('button', { name: 'Reintentar' }).click();
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('filtra por tipo y categoría actualizando los totales', async () => {
    useMovementsMock.mockReturnValue({ isLoading: false, isError: false, data: movements, refetch: vi.fn() });
    render(<MovementsPage />);
    const user = userEvent.setup();

    const incomesCard = screen.getByText('Ingresos filtrados').closest('div');
    const expensesCard = screen.getByText('Egresos filtrados').closest('div');
    expect(incomesCard).not.toBeNull();
    expect(expensesCard).not.toBeNull();

    expect(within(incomesCard as HTMLElement).getByText(/1575\.00/)).toBeVisible();
    expect(within(expensesCard as HTMLElement).getByText(/12\.00/)).toBeVisible();

    await user.selectOptions(screen.getByLabelText('Tipo'), 'Ingreso');
    expect(within(incomesCard as HTMLElement).getByText(/1575\.00/)).toBeVisible();
    expect(within(expensesCard as HTMLElement).getByText(/0\.00/)).toBeVisible();

    await user.selectOptions(screen.getByLabelText('Categoría'), 'Confirmación pedido');
    expect(within(incomesCard as HTMLElement).getByText(/75\.00/)).toBeVisible();
    expect(within(expensesCard as HTMLElement).getByText(/0\.00/)).toBeVisible();
  });

  it('mantiene accesibles los botones principales', () => {
    useMovementsMock.mockReturnValue({ isLoading: false, isError: false, data: movements, refetch: vi.fn() });
    render(<MovementsPage />);

    expect(screen.getByRole('button', { name: 'Exportar CSV' })).toBeEnabled();
  });
});
