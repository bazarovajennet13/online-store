import React, { useState, useEffect } from 'react';
import { api } from './api';
import ProductCard from './components/ProductCard/ProductCard';
import ProductModal from './components/ProductModal/ProductModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить товары. Проверьте, запущен ли сервер (http://localhost:3000)');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setModalMode('edit');
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (productData) => {
    try {
      if (modalMode === 'create') {
        const newProduct = await api.createProduct(productData);
        setProducts([...products, newProduct]);
        alert('✅ Товар успешно добавлен!');
      } else {
        const updatedProduct = await api.updateProduct(editingProduct.id, productData);
        setProducts(products.map(p => 
          p.id === editingProduct.id ? updatedProduct : p
        ));
        alert('✅ Товар успешно обновлен!');
      }
      handleCloseModal();
    } catch (err) {
      alert('❌ Ошибка при сохранении товара');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) return;
    
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      alert('✅ Товар успешно удален!');
    } catch (err) {
      alert('❌ Ошибка при удалении товара');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container header-content">
          <h1>🛍️ Интернет-магазин</h1>
          <button className="btn btn--primary btn--large" onClick={handleOpenCreate}>
            + Добавить товар
          </button>
        </div>
      </header>
      
      <main className="container">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Загрузка товаров...</p>
          </div>
        )}
        
        {error && (
          <div className="error">
            <h3>❌ Ошибка</h3>
            <p>{error}</p>
            <button className="btn btn--primary" onClick={loadProducts}>
              Повторить попытку
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <div className="products-header">
              <h2>Все товары <span className="badge">{products.length}</span></h2>
            </div>
            
            {products.length === 0 ? (
              <div className="empty-state">
                <p>😕 Товаров пока нет</p>
                <button className="btn btn--primary" onClick={handleOpenCreate}>
                  Добавить первый товар
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>© 2026 Интернет-магазин. Практические занятия 1-5</p>
          <p className="api-info">
            <a href="http://localhost:3000/api-docs" target="_blank" rel="noopener noreferrer">
              📚 Swagger документация
            </a>
          </p>
        </div>
      </footer>

      <ProductModal
        isOpen={modalOpen}
        mode={modalMode}
        product={editingProduct}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;