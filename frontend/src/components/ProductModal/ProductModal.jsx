import React, { useState, useEffect } from 'react';
import './ProductModal.scss';

const ProductModal = ({ isOpen, mode, product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
    rating: ''
  });

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        rating: product.rating || ''
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        rating: ''
      });
    }
  }, [product, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.name.trim()) {
      alert('Введите название товара');
      return;
    }
    if (!formData.category.trim()) {
      alert('Введите категорию товара');
      return;
    }
    if (!formData.description.trim()) {
      alert('Введите описание товара');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      alert('Введите корректную цену');
      return;
    }
    if (formData.stock === '' || formData.stock < 0) {
      alert('Введите корректное количество');
      return;
    }
    
    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: formData.rating ? Number(formData.rating) : 0
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{mode === 'edit' ? 'Редактировать товар' : 'Добавить товар'}</h2>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            <div className="form-group">
              <label>Название товара *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Например: Ноутбук ASUS ROG"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Категория *</label>
              <input
                type="text"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                placeholder="Например: Ноутбуки"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Описание *</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Подробное описание товара"
                rows="3"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Цена (₽) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="89990"
                  min="0"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Количество *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                  placeholder="10"
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Рейтинг (0-5)</label>
              <input
                type="number"
                value={formData.rating}
                onChange={e => setFormData({...formData, rating: e.target.value})}
                placeholder="4.8"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === 'edit' ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;