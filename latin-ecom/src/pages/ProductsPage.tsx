import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SectionCard from '../components/SectionCard';
import { Star, Filter, Search, Plus, Pencil } from 'lucide-react';
import { useProducts } from '../api/hooks';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { ApiItemResponse, Product } from '../utils/types';
import { useAuth } from '../contexts/AuthContext';
import ProductFormModal, { ProductFormValues } from '../components/ProductFormModal';
import { apiClient } from '../api/client';
import { ApiError } from '../utils/errors';

const uniqueValues = (items: string[]) => Array.from(new Set(items)).sort();

const ProductsPage = () => {
  const { data, isLoading, isError, refetch } = useProducts();
  const products = useMemo(() => data ?? [], [data]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [provider, setProvider] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const createProductMutation = useMutation({
    mutationFn: (payload: ProductFormValues) =>
      apiClient.post<ApiItemResponse<Product>>('/api/products', payload)
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormValues }) =>
      apiClient.patch<ApiItemResponse<Product>>(`/api/products/${id}`, data)
  });

  const isSaving = createProductMutation.isPending || updateProductMutation.isPending;

  const categories = useMemo(
    () => ['Todas', ...uniqueValues(products.map((product: Product) => product.category))],
    [products]
  );
  const providers = useMemo(
    () => ['Todos', ...uniqueValues(products.map((product: Product) => product.provider))],
    [products]
  );

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Todas' || product.category === category;
      const matchesProvider = provider === 'Todos' || product.provider === provider;
      return matchesSearch && matchesCategory && matchesProvider;
    });
  }, [category, products, provider, search]);

  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormError(null);
    createProductMutation.reset();
    updateProductMutation.reset();
  };

  const handleSubmitProduct = async (values: ProductFormValues) => {
    setFormError(null);
    try {
      if (selectedProduct) {
        await updateProductMutation.mutateAsync({ id: selectedProduct.id, data: values });
      } else {
        await createProductMutation.mutateAsync(values);
      }
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      handleCloseModal();
    } catch (error) {
      if (error instanceof ApiError) {
        if (typeof (error.details as { error?: string })?.error === 'string') {
          setFormError((error.details as { error?: string }).error ?? error.message);
        } else {
          setFormError(error.message);
        }
      } else {
        setFormError('No fue posible guardar el producto. Intenta nuevamente.');
      }
    }
  };

  if (isLoading) {
    return <LoadingState message="Cargando catálogo de productos..." />;
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <SectionCard
      title="Catálogo de productos"
      subtitle="Explora el inventario disponible para dropshipping"
      action={
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary">
            <Filter size={16} />
            Exportar CSV
          </button>
          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
            >
              <Plus size={16} />
              Cargar producto
            </button>
          )}
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-slate-500">Buscar producto</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 flex-1 border-0 bg-transparent text-sm text-secondary focus:outline-none"
              placeholder="Nombre, categoría o proveedor"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Categoría</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
          >
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Proveedor</label>
          <select
            value={provider}
            onChange={(event) => setProvider(event.target.value)}
            className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
          >
            {providers.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <article key={product.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-secondary">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.provider}</p>
              </div>
              <span className="text-xs font-medium text-primary">ID: {product.id}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-white px-3 py-1">{product.category}</span>
              <span className="rounded-full bg-white px-3 py-1">Stock: {product.stock}</span>
              <span className="rounded-full bg-white px-3 py-1">Lead time: {product.shippingTime}</span>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Costo dropshipper</span>
                <span className="font-semibold text-secondary">USDT {product.cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Precio sugerido</span>
                <span className="font-semibold text-secondary">USDT {product.suggestedPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Actualizado</span>
                <span>{new Date(product.updatedAt).toLocaleDateString('es-ES')}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-amber-500">
                <Star size={16} fill="currentColor" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              {isAdmin ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(product)}
                    className="inline-flex items-center gap-2 rounded-xl border border-primary px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    <Pencil size={14} />
                    Editar ficha
                  </button>
                  <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm">
                    Agregar a mi tienda
                  </button>
                </div>
              ) : (
                <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm">
                  Agregar a mi tienda
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        initialValues={selectedProduct}
        isSubmitting={isSaving}
        error={formError}
      />
    </SectionCard>
  );
};

export default ProductsPage;
