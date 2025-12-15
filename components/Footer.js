export default function Footer() {
  return (
    <footer style={{
      background: '#333',
      color: '#fff',
      padding: '40px 20px',
      marginTop: '40px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h3 style={{ color: '#add8e6' }}>DENTALIUM STORE INDONESIA</h3>
            <p>PT DENTALIUM STORE INDONESIA, yang lebih dikenal dengan merek DENTALIUM STORE, adalah web e-commerce yang bergerak di bidang kesehatan di Indonesia.</p>
            <p>Menyediakan sistem informasi manajemen rumah sakit (SIMRS) dan berbagai layanan teknologi lainnya untuk mendukung operasional fasilitas kesehatan.</p>
          </div>

          <div>
            <h4>Informasi Legal</h4>
            <p>Nama Resmi: PT. DENTALIUM STORE INDONESIA</p>
            <p>Status: Aktif</p>
            <p>Nomor Izin PAK: FK.01.01/VI/163/2017</p>
            <p>NIB: 9120005450912</p>
          </div>

          <div>
            <h4>Kontak Kami</h4>
            <p>Alamat: Jl. M.P.R Raya No.23B, RT.5/RW.11, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430</p>
            <p>Email: contact.dentalium@gmail.com</p>
            <p>Customer Service:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>📞 ADMIN 1: (62) 811-6391-122</li>
              <li>📞 ADMIN 2: (62) 852-5151-6770</li>
              <li>📞 ADMIN 3: (62) 853-8136-5717</li>
              <li>📞 ADMIN 4: (62) 831-5357-1561</li>
            </ul>
          </div>

          <div>
            <h4>Media Sosial</h4>
            <p>Instagram: @dentaliumstore</p>
            <p>Instagram: @dentaliumstoreindonesia</p>
            <p>Facebook: DENTALIUM STORE</p>
            <p>Working Hours: Monday - Sunday, 08.00 - 21.00 WIB</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid #555', paddingTop: '20px' }}>
          <p>&copy; 2025 DENTALIUM STORE INDONESIA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}