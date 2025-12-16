import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'

export default function Info() {
  const [officePhotos, setOfficePhotos] = useState({ photo1: '', photo2: '' })

  useEffect(() => {
    const settings = localStorage.getItem('site_settings')
    if (settings) {
      const parsed = JSON.parse(settings)
      setOfficePhotos({
        photo1: parsed.officePhoto1,
        photo2: parsed.officePhoto2
      })
    }
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, Roboto, sans-serif', minHeight: '100vh', background: '#f9f9f9' }}>
      <Header cartCount={0} onCartClick={() => {}} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#ff0000', textAlign: 'center', marginBottom: '30px' }}>Informasi Perusahaan</h1>

        <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h2>Profil Perusahaan</h2>
          <p>PT DENTALIUM STORE INDONESIA, yang lebih dikenal dengan merek DENTALIUM STORE, adalah web e-commerce yang bergerak di bidang kesehatan di Indonesia. Mereka menyediakan sistem informasi manajemen rumah sakit (SIMRS) dan berbagai layanan teknologi lainnya untuk mendukung operasional fasilitas kesehatan agar lebih efisien dan terintegrasi, dan menyediakan fasilitas kesehatan seperti rumah sakit, klinik, apotek, dan laboratorium.</p>
        </section>

        {(officePhotos.photo1 || officePhotos.photo2) && (
          <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
            <h2>Foto Kantor & Fasilitas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {officePhotos.photo1 && (
                <div>
                  <img src={officePhotos.photo1} alt="Kantor DENTALIUM STORE" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              )}
              {officePhotos.photo2 && (
                <div>
                  <img src={officePhotos.photo2} alt="Fasilitas DENTALIUM STORE" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              )}
            </div>
          </section>
        )}

        <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h2>Informasi Legal & Registrasi</h2>
          <p><strong>Nama Resmi:</strong> PT. DENTALIUM STORE INDONESIA</p>
          <p><strong>Status:</strong> Aktif</p>
          <p><strong>Nomor Izin PAK:</strong> FK.01.01/VI/163/2017</p>
          <p><strong>Tanggal Terbit NIB:</strong> 14 Oktober 2021</p>
          <p><strong>NIB (Nomor Induk Berusaha):</strong> 9120005450912</p>

          <h3>Akta Pendirian</h3>
          <p><strong>Nomor Akta:</strong> 05</p>
          <p><strong>Tanggal:</strong> 22 Februari 2021</p>
          <p><strong>Nama Notaris:</strong> FATHURRAHMAN, SH, M.Kn.</p>
          <p><strong>Pengesahan Kemenkumham (AHU):</strong> AHU-0027254.AH.01.01.Tahun 2021</p>
          <p><strong>Tanggal:</strong> 11 November 2021</p>

          <h3>KBLI (Klasifikasi Baku Lapangan Usaha) Utama</h3>
          <ul>
            <li>62011: Aktivitas pemrograman komputer (Pengembangan Perangkat Lunak)</li>
            <li>63122: Aktivitas portal web dan/atau platform digital dengan tujuan komersial</li>
            <li>63991: Aktivitas jasa teknologi informasi dan komputer lainnya</li>
          </ul>
        </section>

        <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h2>Struktur Organisasi</h2>
          <p><strong>Direktur Utama:</strong> Rolly Anwar</p>
          <p><strong>Direktur:</strong> Wibowo Ardi Prasetiyo</p>
          <p><strong>Komisaris:</strong> Ariyanto Minarto</p>
          <p><strong>Tercatat Jumlah Karyawan:</strong> -/+ 200 org</p>
        </section>

        <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
          <h2>Visi</h2>
          <p>Menjadi penyedia solusi teknologi kesehatan terdepan di Indonesia yang fokus pada peningkatan kualitas layanan kesehatan dan efisiensi operasional.</p>

          <h2>Produk & Layanan Utama</h2>
          <ul>
            <li><strong>SIMRS MEDIKALOGI:</strong> Sistem Informasi Manajemen Rumah Sakit yang terintegrasi, mencakup modul pendaftaran, farmasi, pemeriksaan medis (laboratorium, radiologi), keuangan, dan akuntansi.</li>
            <li><strong>Aplikasi Mobile:</strong> Aplikasi untuk pasien (buat janji dokter, lihat hasil lab) dan tenaga medis.</li>
            <li><strong>Sistem Antrian:</strong> Sistem Antrian.</li>
            <li><strong>Layanan Konsultasi & Implementasi IT.</strong></li>
          </ul>
        </section>

        <section style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2>Tentang DENTALIUM STORE INDONESIA</h2>
          <p>Menjual Alat Medis/Kesehatan Standart Rumah Sakit dan Berbagai macam obat2an, ber Partnert dengan Perusahaan Medicalogy untuk bisa memperluas jaringan dengan tujuan agar bisa mempermudah seluruh masyarakat Indonesia menemukan kebutuhan di bidang Medis/Kesehatan.</p>
        </section>
      </main>

      <Footer />
      <LiveChat />
    </div>
  )
}
