import { useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import Logo from './Logo'

export default function Header({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Kategori Produk', href: '#categories' },
    { name: 'Filter Produk', href: '#filter' },
    { name: 'Informasi Perusahaan', href: '/info' },
    { name: 'Kontak Kami', href: '/contact' },
    { name: 'Riwayat Pesanan', href: '/orders' },
    { name: 'Admin Panel', href: '/admin' },
  ]

  return (
    <header style={{
      background: 'linear-gradient(to right, #ff0000, #ffffff, #add8e6)',
      color: '#000',
      padding: '10px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
          <div style={{ fontSize: '14px', color: '#333', marginLeft: '20px' }}>
            Distributor alat kesehatan terpercaya Indonesia
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex' }}>
            {navItems.map(item => (
              <a key={item.name} href={item.href} style={{ color: '#000', textDecoration: 'none', padding: '5px 10px', borderRadius: '4px', transition: 'background 0.3s' }} onMouseOver={(e) => e.target.style.background = '#add8e6'} onMouseOut={(e) => e.target.style.background = 'transparent'}>
                {item.name}
              </a>
            ))}
          </div>

          <button style={{ background: '#ff0000', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
            Daftar/Login
          </button>

          <div style={{ position: 'relative' }}>
            <button onClick={onCartClick} style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative' }}>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#ff0000',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'block', '@media (min-width: 768px)': { display: 'none' }, background: 'transparent', border: 'none', cursor: 'pointer' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', borderTop: '1px solid #ddd', padding: '10px' }}>
          {navItems.map(item => (
            <a key={item.name} href={item.href} style={{ display: 'block', padding: '10px', color: '#000', textDecoration: 'none' }}>
              {item.name}
            </a>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '5px' }}>
        No izin PAK FK.01.01/VI/163/2017
      </div>
    </header>
  )
}