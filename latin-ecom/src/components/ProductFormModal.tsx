import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Product } from '../utils/types';

export type ProductFormValues = {
  name: string;
  category: string;
  provider: string;
  cost: number;
  suggestedPrice: number;
  stock: number;
  shippingTime: string;
  rating: number;
};

type ProductFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void> | void;
  initialValues?: Product | null;
  isSubmitting: boolean;
  error?: string | null;
};

const emptyFormState = {
  name: '',
  category: '',
  provider: '',
  cost: '0',
  suggestedPrice: '0',
  stock: '0',
  shippingTime: '',
  rating: '4.5'
};

type FormState = typeof emptyFormState;

const ProductFormModal = ({ isOpen, onClose, onSubmit, initialValues, isSubmitting, error }: ProductFormModalProps) => {
  const [formState, setFormState] = useState<FormState>(emptyFormState);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (initialValues) {
      setFormState({
        name: initialValues.name,
        category: initialValues.category,
        provider: initialValues.provider,
        cost: initialValues.cost.toString(),
        suggestedPrice: initialValues.suggestedPrice.toString(),
        stock: initialValues.stock.toString(),
        shippingTime: initialValues.shippingTime,
        rating: initialValues.rating.toString()
      });
    } else {
      setFormState(emptyFormState);
    }
  }, [initialValues, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const values: ProductFormValues = {
      name: formState.name.trim(),
      category: formState.category.trim(),
      provider: formState.provider.trim(),
      cost: Number(formState.cost),
      suggestedPrice: Number(formState.suggestedPrice),
      stock: Number(formState.stock),
      shippingTime: formState.shippingTime.trim(),
      rating: Number(formState.rating)
    };
    await onSubmit(values);
  };

  const title = initialValues ? 'Actualizar ficha de producto' : 'Cargar nuevo producto';
  const subtitle = initialValues
    ? 'Actualiza los datos comerciales y logísticos del producto seleccionado.'
    : 'Completa la información clave para disponibilizar un nuevo producto en el catálogo.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-secondary">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 hover:border-primary hover:text-primary"
          >
            Cerrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nombre</label>
            <input
              required
              value={formState.name}
              onChange={handleChange('name')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Nombre comercial"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Categoría</label>
            <input
              required
              value={formState.category}
              onChange={handleChange('category')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Ej. Belleza"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Proveedor</label>
            <input
              required
              value={formState.provider}
              onChange={handleChange('provider')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Nombre proveedor"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Costo dropshipper</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={formState.cost}
              onChange={handleChange('cost')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Precio sugerido</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={formState.suggestedPrice}
              onChange={handleChange('suggestedPrice')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stock</label>
            <input
              required
              type="number"
              min="0"
              step="1"
              value={formState.stock}
              onChange={handleChange('stock')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tiempo de envío</label>
            <input
              required
              value={formState.shippingTime}
              onChange={handleChange('shippingTime')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Ej. 48h"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rating</label>
            <input
              required
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formState.rating}
              onChange={handleChange('rating')}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {error ? (
            <p className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
          ) : null}

          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? 'Guardando...' : initialValues ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
