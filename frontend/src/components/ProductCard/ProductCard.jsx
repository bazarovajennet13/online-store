import React from 'react';
import './ProductCard.scss';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="product-card__header">
        <h3 className="product-card__title">{product.name}</h3>
        <span className="product-card__category">{product.category}</span>
      </div>
      
      <div className="product-card__body">
        <p className="product-card__description">{product.description}</p>
        
        <div className="product-card__details">
          <span className="product-card__price">
            {product.price.toLocaleString()} ₽
          </span>
          <span className={`product-card__stock ${product.stock < 5 ? 'product-card__stock--low' : ''}`}>
            {product.stock} шт.
          </span>
        </div>
        
        {product.rating > 0 && (
          <div className="product-card__rating">
            Рейтинг: {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
            <span> ({product.rating})</span>
          </div>
        )}
      </div>
      
      <div className="product-card__footer">
        <button 
          className="btn btn--edit"
          onClick={() => onEdit(product)}
        >
          ✏️ Редактировать
        </button>
        <button 
          className="btn btn--delete"
          onClick={() => onDelete(product.id)}
        >
          🗑️ Удалить
        </button>
      </div>
    </div>
  );
};

export default ProductCard;