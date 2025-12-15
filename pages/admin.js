import { useState, useEffect } from 'react'
import products from '../data/products'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'

export default function Admin() {
  const [adminProducts, setAdminProducts] = useState(products)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Instruments',
    description: '',
    sku: '',
    image: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('admin_products')
    if (saved) {
      setAdminProducts(JSON.parse(saved))
    }
  }, [])

  const saveProducts = (newProducts) => {
    setAdminProducts(newProducts)
    localStorage.setItem('admin_products', JSON.stringify(newProducts))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProduct) {
      const updated = adminProducts.map(p =>
        p.id === editingProduct.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p
      )
      saveProducts(updated)
      setEditingProduct(null)
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price)
      }
      saveProducts([...adminProducts, newProduct])
    }
    setFormData({ name: '', price: '', category: 'Instruments', description: '', sku: '', image: '' })
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      sku: product.sku,
      image: product.image
    })
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      saveProducts(adminProducts.filter(p => p.id !== id))
    }
  }

  const categories = ['Instruments', 'Consumables', 'Diagnostics', 'Protective', 'Medications']

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
      <Header cartCount={0} onCartClick={() => {}} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#ff0000', textAlign: 'center', marginBottom: '30px' }}>Admin Panel - Product Management</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category:</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>SKU:</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image URL:</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <button type="submit" style={{
                width: '100%',
                background: '#ff0000',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>

              {editingProduct && (
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setFormData({ name: '', price: '', category: 'Instruments', description: '', sku: '', image: '' }) }}
                  style={{
                    width: '100%',
                    background: '#666',
                    color: '#fff',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Product List ({adminProducts.length})</h2>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {adminProducts.map(product => (
                <div key={product.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                  marginBottom: '10px'
                }}>
                  <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{product.name}</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>${product.price.toFixed(2)} - {product.category}</p>
                  </div>
                  <div>
                    <button onClick={() => handleEdit(product)} style={{
                      background: '#add8e6',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} style={{
                      background: '#ff0000',
                      color: '#fff',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <LiveChat />
    </div>
  )
}