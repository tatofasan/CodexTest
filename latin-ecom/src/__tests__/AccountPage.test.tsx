import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccountPage from '../pages/AccountPage';
import { vi } from 'vitest';
import { billingBreakdown } from '../test/fixtures';

vi.mock('../api/hooks', () => ({
  useBillingBreakdown: vi.fn()
}));

const { useBillingBreakdown } = await import('../api/hooks');
const useBillingBreakdownMock = vi.mocked(useBillingBreakdown);

describe('AccountPage', () => {
  beforeEach(() => {
    useBillingBreakdownMock.mockReset();
  });

  it('muestra el estado de carga', () => {
    useBillingBreakdownMock.mockReturnValue({ isLoading: true, isError: false, data: undefined, refetch: vi.fn() });
    render(<AccountPage />);

    expect(screen.getByText('Cargando configuración de cuenta...')).toBeInTheDocument();
  });

  it('permite reintentar cuando ocurre un error', () => {
    const refetch = vi.fn();
    useBillingBreakdownMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch });
    render(<AccountPage />);

    screen.getByRole('button', { name: 'Reintentar' }).click();
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('muestra la configuración y permite modificar switches y checkboxes', async () => {
    useBillingBreakdownMock.mockReturnValue({ isLoading: false, isError: false, data: billingBreakdown, refetch: vi.fn() });
    render(<AccountPage />);
    const user = userEvent.setup();

    const checkboxes = screen.getAllByRole('checkbox');
    const [autoRecharge, ...alertCheckboxes] = checkboxes;
    expect(autoRecharge).toBeChecked();
    await user.click(autoRecharge);
    expect(autoRecharge).not.toBeChecked();

    expect(alertCheckboxes).toHaveLength(3);
    for (const checkbox of alertCheckboxes) {
      await user.click(checkbox);
    }

    billingBreakdown.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
