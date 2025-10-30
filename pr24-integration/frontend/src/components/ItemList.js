import React from 'react';

const ItemList = ({ items, onEdit, onDelete, loading }) => {
  const styles = {
    itemList: {
      textAlign: 'left'
    },
    itemCard: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#f9f9f9'
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    status: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    statusCompleted: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    statusPending: {
      backgroundColor: '#fff3cd',
      color: '#856404'
    },
    itemDescription: {
      color: '#666',
      marginBottom: '10px'
    },
    itemFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
      color: '#888'
    },
    itemActions: {
      display: 'flex',
      gap: '5px'
    },
    button: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'background-color 0.2s'
    },
    editButton: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white'
    }
  };

  if (loading) {
    return <div>Loading items...</div>;
  }

  if (!items || items.length === 0) {
    return <div>No items found. Create your first item!</div>;
  }

  return (
    <div style={styles.itemList}>
      <h3>Items ({items.length})</h3>
      {items.map(item => (
        <div key={item.id} style={styles.itemCard}>
          <div style={styles.itemHeader}>
            <h4 style={{ margin: 0, color: '#333' }}>{item.title}</h4>
            <span style={{
              ...styles.status,
              ...(item.completed ? styles.statusCompleted : styles.statusPending)
            }}>
              {item.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          {item.description && (
            <p style={styles.itemDescription}>{item.description}</p>
          )}
          <div style={styles.itemFooter}>
            <small>Created: {new Date(item.createdAt).toLocaleDateString()}</small>
            <div style={styles.itemActions}>
              <button 
                onClick={() => onEdit(item)}
                style={{...styles.button, ...styles.editButton}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#1e7e34'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(item.id)}
                style={{...styles.button, ...styles.deleteButton}}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;