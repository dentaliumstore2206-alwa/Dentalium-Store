import { useState, useEffect } from 'react'
import { X, Plus, Minus } from 'lucide-react'

export default function Cart({ isOpen, onClose, cart, updateCart }) {
  const [isRegistered, setIsRegistered] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    const registered = localStorage.getItem('dentalium_registered')
    if (registered) {
      setIsRegistered(true)
    }
  }, [])

  const handleCheckout = () => {
    if (!isRegistered) {
      setShowRegister(true)
      return
    }

    const message = `Halo, saya ingin memesan:\n${cart.map(item => `${item.name} - ${item.quantity} pcs - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}\nTotal: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`
    const whatsappUrl = `https://wa.me/628116391122?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleRegister = (e) => {
    e.preventDefault()
    localStorage.setItem('dentalium_registered', JSON.stringify(formData))
    setIsRegistered(true)
    setShowRegister(false)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflow: 'auto',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Keranjang Belanja</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {showRegister ? (
          <form onSubmit={handleRegister}>
            <h3>Daftar untuk Checkout</h3>
            <input
              type="text"
              placeholder="Nama"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="tel"
              placeholder="No. Telepon"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <button type="submit" style={{ width: '100%', background: '#ff0000', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
              Daftar
            </button>
          </form>
        ) : (
          <>
            {cart.length === 0 ? (
              <p>Keranjang kosong</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{item.name}</h4>
                      <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={() => updateCart(item.id, item.quantity - 1)} style={{ background: '#ddd', border: 'none', padding: '5px', cursor: 'pointer' }}>
                        <Minus size={16} />
                      </button>
                      <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <button onClick={() => updateCart(item.id, item.quantity + 1)} style={{ background: '#ddd', border: 'none', padding: '5px', cursor: 'pointer' }}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '20px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</p>
                  <button
                    onClick={handleCheckout}
                    style={{
                      width: '100%',
                      background: isRegistered ? '#ff0000' : '#add8e6',
                      color: '#fff',
                      border: 'none',
                      padding: '15px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    {isRegistered ? 'Checkout via WhatsApp' : 'Daftar untuk Checkout'}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}