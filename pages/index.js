import { useState, useEffect } from 'react'
import products from '../data/products'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Cart from '../components/Cart'
import LiveChat from '../components/LiveChat'

export default function Home() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const savedCart = localStorage.getItem('dentalium_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('dentalium_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const updateCart = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id))
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setCartOpen(true)} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <section style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ color: '#ff0000', marginBottom: '10px' }}>Selamat Datang di DENTALIUM STORE</h1>
          <p style={{ color: '#666' }}>Distributor alat kesehatan terpercaya Indonesia</p>
        </section>

        <section id="filter" style={{ marginBottom: '30px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
            <div>
              <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Kategori:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>
        </section>

        <section id="categories" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </section>
      </main>

      <Footer />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cart} updateCart={updateCart} />
      <LiveChat />
    </div>
  )
}
