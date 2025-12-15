import Header from '../components/Header'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'

export default function Contact() {
  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
      <Header cartCount={0} onCartClick={() => {}} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#ff0000', textAlign: 'center', marginBottom: '30px' }}>Kontak Kami</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Alamat & Kontak</h2>
            <h3>Alamat Kantor Pusat (Operasional):</h3>
            <p>Jl. Jl. M.P.R Raya No.23B, RT.5/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430</p>

            <h3>Alamat Domisili Hukum:</h3>
            <p>Gedung Graha Kencana Lt. 8 Unit B, Jl. Raya Perjuangan No.88, Kebon Jeruk, Jakarta Barat 11530.</p>

            <h3>E-mail:</h3>
            <p>contact.dentalium@gmail.com</p>
            <p>info.medicalogy@gmail.com</p>
          </section>

          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Customer Service</h2>
            <div style={{ display: 'grid', gap: '10px' }}>
              <p>📞 <strong>ADMIN 1:</strong> (62) 811-6391-122 (Konsultasi dengan dokter salwa)</p>
              <p>📞 <strong>ADMIN 2:</strong> (62) 852-5151-6770</p>
              <p>📞 <strong>ADMIN 3:</strong> (62) 853-8136-5717</p>
              <p>📞 <strong>ADMIN 4:</strong> (62) 831-5357-1561</p>
            </div>
            <p style={{ marginTop: '20px', fontStyle: 'italic' }}>Silahkan Hubungi no tersebut untuk Informasi Tambahan Lainnya</p>
          </section>

          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Media Sosial</h2>
            <p><strong>Instagram:</strong> @dentaliumstore</p>
            <p><strong>Instagram:</strong> @dentaliumstoreindonesia</p>
            <p><strong>Facebook Halaman:</strong> DENTALIUM STORE</p>
          </section>

          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>Working Hours</h2>
            <p><strong>Working Days:</strong> Monday - Sunday</p>
            <p><strong>Working Hours E-commerce:</strong> 08.00 - 21.00 WIB</p>
            <p><strong>Working Hours:</strong> 08.00 AM - 08.00 PM</p>
          </section>
        </div>
      </main>

      <Footer />
      <LiveChat />
    </div>
  )
}