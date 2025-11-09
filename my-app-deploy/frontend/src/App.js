import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://myapp-backend-production-d618.up.railway.app/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Загружаем все данные параллельно
        const [healthRes, usersRes, productsRes] = await Promise.all([
          fetch(`${API_BASE}/health`),
          fetch(`${API_BASE}/users`),
          fetch(`${API_BASE}/products`)
        ]);

        const healthData = await healthRes.json();
        const usersData = await usersRes.json();
        const productsData = await productsRes.json();

        setHealth(healthData);
        setUsers(usersData);
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <nav style={{ padding: '20px', background: '#f5f5f5' }}>
        <h1>My App - Deployed Successfully! 🚀</h1>
      </nav>

      <main style={{ padding: '20px' }}>
        {error ? (
          <div style={{ color: 'red' }}>
            <h2>Error :(</h2>
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* Health Status */}
            <section>
              <h2>Backend Health Status</h2>
              <pre>{JSON.stringify(health, null, 2)}</pre>
            </section>

            {/* Users */}
            <section>
              <h2>Users ({users.length})</h2>
              <ul>
                {users.map(user => (
                  <li key={user.id}>
                    {user.name} - {user.email}
                  </li>
                ))}
              </ul>
            </section>

            {/* Products */}
            <section>
              <h2>Products ({products.length})</h2>
              <ul>
                {products.map(product => (
                  <li key={product.id}>
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>

      <footer style={{ padding: '20px', background: '#f5f5f5', marginTop: '40px' }}>
        <p>My Footer - Deployment Test</p>
        <p>Frontend: Vercel | Backend: Railway</p>
      </footer>
    </div>
  );
}

export default App;