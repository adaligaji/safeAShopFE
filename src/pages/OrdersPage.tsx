import { useState, type FormEvent } from 'react';
import api from '../api/client';
import type { Order } from '../types';

export default function OrdersPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  const search = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setOrder(null);

    try {
      const response = await api.get<Order>(`/orders/${orderId}`);
      setOrder(response.data);
    } catch {
      setError('No se pudo consultar el pedido o no tiene autorización para verlo.');
    }
  };

  return (
    <section>
      <h1>Consultar pedido</h1>
      <p>Ingrese el identificador del pedido que desea consultar.</p>

      <form className="inline-form" onSubmit={search}>
        <input type="number" min="1" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
        <button type="submit">Consultar</button>
      </form>

      {error && <div className="error">{error}</div>}
      {order && (
        <div className="card order-result">
          <h3>Pedido #{order.id}</h3>
          <p><strong>Usuario:</strong> {order.userId}</p>
          <p><strong>Producto:</strong> {order.product?.name || order.productId}</p>
          <p><strong>Cantidad:</strong> {order.quantity}</p>
        </div>
      )}
    </section>
  );
}
