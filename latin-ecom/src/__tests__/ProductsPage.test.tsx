import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsPage from '../pages/ProductsPage';
import { vi } from 'vitest';
import { products } from '../test/fixtures';

vi.mock('../api/hooks', () => ({
  useProducts: vi.fn()
}));

const { useProducts } = await import('../api/hooks');
const useProductsMock = vi.mocked(useProducts);

describe('ProductsPage', () => {
  beforeEach(() => {
    useProductsMock.mockReset();
  });

  it('muestra el estado de carga', () => {
    useProductsMock.mockReturnValue({ isLoading: true, isError: false, data: undefined, refetch: vi.fn() });
    render(<ProductsPage />);

    expect(screen.getByText('Cargando catálogo de productos...')).toBeInTheDocument();
  });

  it('permite reintentar cuando ocurre un error', () => {
    const refetch = vi.fn();
    useProductsMock.mockReturnValue({ isLoading: false, isError: true, data: undefined, refetch });
    render(<ProductsPage />);

    screen.getByRole('button', { name: 'Reintentar' }).click();
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('filtra la lista de productos por búsqueda, categoría y proveedor', async () => {
    useProductsMock.mockReturnValue({ isLoading: false, isError: false, data: products, refetch: vi.fn() });
    render(<ProductsPage />);
    const user = userEvent.setup();

    expect(screen.getAllByRole('article')).toHaveLength(products.length);

    await user.type(screen.getByPlaceholderText('Nombre, categoría o proveedor'), 'vegana');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Proteína vegana cacao')).toBeVisible();

    await user.clear(screen.getByPlaceholderText('Nombre, categoría o proveedor'));
    await user.selectOptions(screen.getByLabelText('Categoría'), 'Fitness');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Kit de bandas elásticas')).toBeVisible();

    await user.selectOptions(screen.getByLabelText('Proveedor'), 'HydrateX');
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });

  it('mantiene accesibles los botones principales', () => {
    useProductsMock.mockReturnValue({ isLoading: false, isError: false, data: products, refetch: vi.fn() });
    render(<ProductsPage />);

    expect(screen.getByRole('button', { name: 'Exportar CSV' })).toBeEnabled();
    const addButtons = screen.getAllByRole('button', { name: 'Agregar a mi tienda' });
    expect(addButtons).toHaveLength(products.length);
    addButtons.forEach((button) => expect(button).toBeEnabled());
  });
});
