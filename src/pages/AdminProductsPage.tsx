import { useEffect, useState, type FormEvent } from 'react';
import api from '../api/client';
import type { Product } from '../types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProducts = async () => {
    const response = await api.get<Product[]>('/products');
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts().catch(() => setError('No se pudieron cargar los productos.'));
  }, []);

  const createProduct = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await api.post('/products', { name, price: Number(price) });
      setName('');
      setPrice('');
      setMessage('Producto creado correctamente.');
      await loadProducts();
    } catch {
      setError('No se pudo crear el producto.');
    }
  };

  const updateProduct = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      await api.put(`/products/${editId}`, { name: editName, price: Number(editPrice) });
      setEditId('');
      setEditName('');
      setEditPrice('');
      setMessage('Producto actualizado correctamente.');
      await loadProducts();
    } catch {
      setError('No se pudo modificar el producto.');
    }
  };

  return (
    <section>
      <h1>Administración de productos</h1>
      <p>Estas funciones deben ser autorizadas nuevamente por el backend mediante RBAC.</p>

      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <div className="admin-grid">
        <form className="card" onSubmit={createProduct}>
          <h3>Crear producto</h3>
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Precio</label>
          <input type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <button type="submit">Crear</button>
        </form>

        <form className="card" onSubmit={updateProduct}>
          <h3>Modificar producto</h3>
          <label>ID</label>
          <input type="number" min="1" value={editId} onChange={(e) => setEditId(e.target.value)} required />
          <label>Nombre</label>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} required />
          <label>Precio</label>
          <input type="number" step="0.01" min="0" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} required />
          <button type="submit">Modificar</button>
        </form>
      </div>

      <div className="card table-card">
        <h3>Productos actuales</h3>
        <table>
          <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr></thead>
          <tbody>
            {products.map((p) => <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>Q {Number(p.price).toFixed(2)}</td></tr>)}
          </tbody>
        </table>
      </div>
    </section>
  );
}
