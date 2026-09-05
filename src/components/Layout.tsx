import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="topbar">
        <div>
          <strong>SafeAShop</strong>
          <span className="subtitle">Final Software Seguro - Adalí Garrán</span>
        </div>
        {user && (
          <div className="userbox">
            <span>{user.username} · {user.role}</span>
            <button className="secondary" onClick={logout}>Salir</button>
          </div>
        )}
      </header>

      {user && (
        <nav className="nav">
          <Link to="/">Productos</Link>
          {user.role === 'CUSTOMER' && <Link to="/orders">Pedidos</Link>}
          {user.role === 'ADMIN' && <Link to="/admin/products">Administración</Link>}
        </nav>
      )}

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
