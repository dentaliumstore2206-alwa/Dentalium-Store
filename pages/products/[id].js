import { useRouter } from 'next/router'
import products from '../../data/products'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import LiveChat from '../../components/LiveChat'

export default function ProductDetail({ product }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
      <Header cartCount={0} onCartClick={() => {}} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <button onClick={() => router.back()} style={{ marginBottom: '20px', padding: '10px 20px', background: '#add8e6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ← Back to Products
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>

          <div>
            <h1 style={{ color: '#ff0000', marginBottom: '10px' }}>{product.name}</h1>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#000', marginBottom: '20px' }}>${product.price.toFixed(2)}</p>
            <p style={{ color: '#666', marginBottom: '20px' }}>{product.description}</p>

            <div style={{ marginBottom: '20px' }}>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>SKU:</strong> {product.sku}</p>
            </div>

            <button style={{
              width: '100%',
              background: '#ff0000',
              color: '#fff',
              border: 'none',
              padding: '15px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <LiveChat />
    </div>
  )
}

export async function getStaticPaths() {
  const paths = products.map(product => ({
    params: { id: product.id.toString() }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const product = products.find(p => p.id.toString() === params.id)

  return {
    props: {
      product: product || null
    }
  }
}