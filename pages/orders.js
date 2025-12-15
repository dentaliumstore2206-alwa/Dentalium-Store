import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'

export default function OrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('order_history')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear order history?')) {
      localStorage.removeItem('order_history')
      setOrders([])
    }
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
      <Header cartCount={0} onCartClick={() => {}} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#ff0000' }}>Riwayat Pesanan</h1>
          {orders.length > 0 && (
            <button onClick={clearHistory} style={{
              background: '#ff0000',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Clear History
            </button>
          )}
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Belum ada pesanan</h2>
            <p>Anda belum melakukan pemesanan apapun.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {orders.map((order, index) => (
              <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ margin: 0, color: '#ff0000' }}>Order #{order.id}</h3>
                  <span style={{ color: '#666', fontSize: '14px' }}>{new Date(order.date).toLocaleString()}</span>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>Customer Information:</h4>
                  <p style={{ margin: '5px 0' }}><strong>Name:</strong> {order.customer.name}</p>
                  <p style={{ margin: '5px 0' }}><strong>Email:</strong> {order.customer.email}</p>
                  <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {order.customer.phone}</p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>Items:</h4>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                      <span>{item.name} (x{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: 'right', fontSize: '18px', fontWeight: 'bold', color: '#ff0000' }}>
                  Total: ${order.total.toFixed(2)}
                </div>

                <div style={{ marginTop: '15px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
                  <strong>Status:</strong> {order.status}
                  <br />
                  <strong>WhatsApp Message:</strong> {order.whatsappMessage ? 'Sent' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <LiveChat />
    </div>
  )
}