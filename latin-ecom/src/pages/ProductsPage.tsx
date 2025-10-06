import { useMemo, useState } from 'react';
import SectionCard from '../components/SectionCard';
import { products } from '../data/mockData';
import { Star, Filter, Search } from 'lucide-react';

const uniqueValues = (items: string[]) => Array.from(new Set(items)).sort();

const ProductsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todas');
  const [provider, setProvider] = useState('Todos');
  const categories = useMemo(() => ['Todas', ...uniqueValues(products.map((p) => p.category))], []);
  const providers = useMemo(() => ['Todos', ...uniqueValues(products.map((p) => p.provider))], []);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Todas' || product.category === category;
      const matchesProvider = provider === 'Todos' || product.provider === provider;
      return matchesSearch && matchesCategory && matchesProvider;
    });
  }, [category, provider, search]);

  return (
    <SectionCard
      title="Catálogo de productos"
      subtitle="Explora el inventario disponible para dropshipping"
      action={
        <button className="inline-flex items-center gap-2 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary">
          <Filter size={16} />
          Exportar CSV
        </button>
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
              <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm">
                Agregar a mi tienda
              </button>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
};

export default ProductsPage;
