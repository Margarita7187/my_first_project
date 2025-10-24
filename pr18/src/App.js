import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Contact from './components/Contact';
import ContactSuccess from './components/ContactSuccess';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <nav>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            display: 'flex', 
            gap: '20px', 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '5px',
            margin: '0 0 20px 0'
          }}>
            <li><Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Главная</Link></li>
            <li><Link to="/about" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>О нас</Link></li>
            <li><Link to="/products" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Товары</Link></li>
            <li><Link to="/contact" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Контакты</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/success" element={<ContactSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;