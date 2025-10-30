import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, onCancel, editingItem, loading }) => {
  const styles = {
    form: {
      textAlign: 'left',
      maxWidth: '500px',
      margin: '0 auto'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      boxSizing: 'border-box',
      resize: 'vertical',
      minHeight: '60px'
    },
    errorInput: {
      borderColor: '#dc3545'
    },
    errorMessage: {
      color: '#dc3545',
      fontSize: '12px',
      marginTop: '5px',
      display: 'block'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontWeight: 'normal',
      cursor: 'pointer'
    },
    formActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.2s'
    },
    primaryButton: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white'
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        description: editingItem.description,
        completed: editingItem.completed
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const getInputStyle = (hasError) => ({
    ...styles.input,
    ...(hasError ? styles.errorInput : {})
  });

  const getButtonStyle = (type = 'primary') => ({
    ...styles.button,
    ...(type === 'primary' ? styles.primaryButton : styles.secondaryButton)
  });

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{editingItem ? 'Edit Item' : 'Create New Item'}</h3>
      
      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={getInputStyle(!!errors.title)}
        />
        {errors.title && <span style={styles.errorMessage}>{errors.title}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="description" style={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          rows="3"
        />
      </div>

      <div style={styles.formGroup}>
        <div style={styles.checkboxGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            Completed
          </label>
        </div>
      </div>

      <div style={styles.formActions}>
        <button 
          type="submit" 
          disabled={loading}
          style={getButtonStyle('primary')}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#007bff')}
        >
          {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            style={getButtonStyle('secondary')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#545b62'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;