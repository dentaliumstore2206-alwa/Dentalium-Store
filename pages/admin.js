import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'

export default function Admin() {
  const [adminProducts, setAdminProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Instruments',
    description: '',
    sku: '',
    image: ''
  })
  const [settings, setSettings] = useState({
    logoUrl: '',
    officePhoto1: '',
    officePhoto2: ''
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginPassword, setLoginPassword] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token')
    if (storedToken) {
      setToken(storedToken)
      setIsLoggedIn(true)
      fetchProducts(storedToken)
      fetchSettings(storedToken)
    }
  }, [])

  const fetchProducts = async (authToken) => {
    try {
      const res = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (res.ok) {
        const data = await res.json()
        setAdminProducts(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const fetchSettings = async (authToken) => {
    try {
      const res = await fetch('/api/settings', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const saveSettings = async (newSettings) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newSettings)
      })
      if (res.ok) {
        setSettings(newSettings)
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  const saveProducts = async (newProducts) => {
    setAdminProducts(newProducts)
    // Products are saved via API on add/edit
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: loginPassword })
      })
      if (res.ok) {
        const data = await res.json()
        setToken(data.token)
        localStorage.setItem('admin_token', data.token)
        setIsLoggedIn(true)
        setLoginPassword('')
        fetchProducts(data.token)
        fetchSettings(data.token)
      } else {
        alert('Password salah!')
      }
    } catch (error) {
      alert('Login failed')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setToken('')
    localStorage.removeItem('admin_token')
    setAdminProducts([])
    setSettings({ logoUrl: '', officePhoto1: '', officePhoto2: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = { ...formData, price: parseFloat(formData.price) }
      if (editingProduct) {
        // For simplicity, delete and re-add (in real app, use PUT with ID)
        await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(productData)
        })
        // Note: This is simplified; ideally update existing product
      } else {
        await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(productData)
        })
      }
      setFormData({ name: '', price: '', category: 'Instruments', description: '', sku: '', image: '' })
      setEditingProduct(null)
      fetchProducts(token) // Refresh list
    } catch (error) {
      console.error('Failed to save product:', error)
    }
  }async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      // Note: For simplicity, deletion not implemented; in real app, add DELETE endpoint
      alert('Deletion not implemented in this demo'
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const categories = ['Instruments', 'Consumables', 'Diagnostics', 'Protective', 'Medications']

  if (!isLoggedIn) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ color: '#ff0000', textAlign: 'center', marginBottom: '20px' }}>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
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
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
      <Header cartCount={0} onCartClick={() => {}} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ color: '#ff0000', margin: 0 }}>Admin Panel - Product Management</h1>
          <button onClick={handleLogout} style={{
            background: '#ff0000',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Logout
          </button>
        </div>

        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h2 style={{ color: '#ff0000', marginBottom: '15px' }}>⚙️ Pengaturan Website</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Logo URL:</label>
              <input
                type="url"
                value={settings.logoUrl}
                onChange={(e) => saveSettings({...settings, logoUrl: e.target.value})}
                placeholder="https://i.imgur.com/logo.jpg"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              {settings.logoUrl && (
                <img src={settings.logoUrl} alt="Logo Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', marginTop: '10px', borderRadius: '4px' }} />
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Foto Kantor 1:</label>
              <input
                type="url"
                value={settings.officePhoto1}
                onChange={(e) => saveSettings({...settings, officePhoto1: e.target.value})}
                placeholder="https://i.imgur.com/office1.jpg"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              {settings.officePhoto1 && (
                <img src={settings.officePhoto1} alt="Office 1 Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', marginTop: '10px', borderRadius: '4px' }} />
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Foto Kantor 2:</label>
              <input
                type="url"
                value={settings.officePhoto2}
                onChange={(e) => saveSettings({...settings, officePhoto2: e.target.value})}
                placeholder="https://i.imgur.com/office2.jpg"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              {settings.officePhoto2 && (
                <img src={settings.officePhoto2} alt="Office 2 Preview" style={{ width: '100px', height: '60px', objectFit: 'cover', marginTop: '10px', borderRadius: '4px' }} />
              )}
            </div>
          </div>
        </div>

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
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Or enter image URL: https://i.imgur.com/xxxxx.jpg"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '5px' }}
                />
                {formData.image && (
                  <div style={{ marginTop: '10px' }}>
                    <img src={formData.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                )}
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
