export default function ProductCard({ product, onAddToCart }) {
  return (
    <article style={{
      border: '1px solid #e6e6e6',
      borderRadius: '8px',
      overflow: 'hidden',
      background: '#fff',
      transition: 'box-shadow 0.3s',
      cursor: 'pointer'
    }} onMouseOver={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.target.style.boxShadow = 'none'}>
      <div style={{ height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>{product.name}</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff0000' }}>${product.price.toFixed(2)}</span>
          <span style={{ fontSize: '12px', color: '#888' }}>{product.sku}</span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          style={{
            width: '100%',
            background: '#add8e6',
            color: '#000',
            border: 'none',
            padding: '10px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#87ceeb'}
          onMouseOut={(e) => e.target.style.background = '#add8e6'}
        >
          Tambah ke Keranjang
        </button>
      </div>
    </article>
  )
}