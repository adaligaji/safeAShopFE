import { useEffect, useState } from 'react';
import api from '../api/client';
import { useAuth } from '../auth/AuthContext';
import type { Product } from '../types';

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [message, setMessage] = useState('');

  const loadProducts = async () => {
    try {
      const response = await api.get<Product[]>('/products');
      setProducts(response.data);
    } catch {
      setError('No se pudieron cargar los productos.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createOrder = async (productId: number) => {
    setMessage('');
    setError('');
    const quantity = quantities[productId] || 1;

    try {
      await api.post('/orders', { productId, quantity });
      setMessage('Pedido creado correctamente.');
    } catch {
      setError('No se pudo crear el pedido.');
    }
  };

  return (
    <section>
      <div className="page-title">
        <div>
          <h1>Productos</h1>
          <p>Catálogo disponible en SafeAShop.</p>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      <div className="grid">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <h3>{product.name}</h3>
            <div className="price">Q {Number(product.price).toFixed(2)}</div>

            {user?.role === 'CUSTOMER' && (
              <div className="order-controls">
                <input
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) => setQuantities({ ...quantities, [product.id]: Number(e.target.value) })}
                />
                <button onClick={() => createOrder(product.id)}>Crear pedido</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
