import React, { useState, useEffect } from 'react';
import { itemsAPI } from './services/api';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import LoadingSpinner from './components/LoadingSpinner';

// Стили для приложения
const appStyles = {
  app: {
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white'
  },
  main: {
    padding: '20px'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  content: {
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px'
  },
  alert: {
    padding: '12px',
    borderRadius: '4px',
    marginBottom: '20px'
  },
  alertError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
  },
  alertSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
  }
};

// Стили для кнопок
const buttonStyles = {
  base: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s'
  },
  primary: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: 'white'
  },
  edit: {
    backgroundColor: '#28a745',
    color: 'white',
    marginRight: '5px'
  },
  delete: {
    backgroundColor: '#dc3545',
    color: 'white'
  }
};

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Логика остается такой же как в предыдущей версии
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await itemsAPI.getAll();
      if (response.data.success) {
        setItems(response.data.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (itemData) => {
    setFormLoading(true);
    setError('');
    try {
      const response = await itemsAPI.create(itemData);
      if (response.data.success) {
        setItems(prev => [...prev, response.data.data]);
        setSuccess('Item created successfully!');
        setShowForm(false);
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'Failed to create item');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateItem = async (itemData) => {
    setFormLoading(true);
    setError('');
    try {
      const response = await itemsAPI.update(editingItem.id, itemData);
      if (response.data.success) {
        setItems(prev => 
          prev.map(item => 
            item.id === editingItem.id ? response.data.data : item
          )
        );
        setSuccess('Item updated successfully!');
        setShowForm(false);
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'Failed to update item');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    setError('');
    try {
      const itemToDelete = items.find(item => item.id === id);
      setItems(prev => prev.filter(item => item.id !== id));

      const response = await itemsAPI.delete(id);
      if (!response.data.success) {
        setItems(prev => [...prev, itemToDelete]);
        throw new Error('Delete failed');
      }
      
      setSuccess('Item deleted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to delete item');
      loadItems();
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
    setError('');
    setSuccess('');
  };

  const handleSubmit = (itemData) => {
    if (editingItem) {
      handleUpdateItem(itemData);
    } else {
      handleCreateItem(itemData);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const getButtonStyle = (type = 'primary') => ({
    ...buttonStyles.base,
    ...buttonStyles[type]
  });

  return (
    <div style={appStyles.app}>
      <header style={appStyles.header}>
        <h1>Item Manager</h1>
        <p>React + Express Integration</p>
      </header>

      <main style={appStyles.main}>
        {error && (
          <div style={{...appStyles.alert, ...appStyles.alertError}}>
            Error: {error}
          </div>
        )}
        
        {success && (
          <div style={{...appStyles.alert, ...appStyles.alertSuccess}}>
            {success}
          </div>
        )}

        <div style={appStyles.container}>
          <div style={appStyles.content}>
            <div style={appStyles.contentHeader}>
              <h2>Items Management</h2>
              <button 
                onClick={() => setShowForm(true)}
                style={getButtonStyle('primary')}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >
                Add New Item
              </button>
            </div>

            {showForm ? (
              <ItemForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                editingItem={editingItem}
                loading={formLoading}
              />
            ) : (
              <>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <ItemList
                    items={items}
                    onEdit={handleEdit}
                    onDelete={handleDeleteItem}
                    loading={loading}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;