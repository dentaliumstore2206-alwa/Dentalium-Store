export default function Logo({ customLogoUrl }) {
  const savedSettings = localStorage.getItem('site_settings')
  const settings = savedSettings ? JSON.parse(savedSettings) : {}
  const logoUrl = customLogoUrl || settings.logoUrl || 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" fill="#ff0000" rx="8"/>
      <text x="20" y="25" text-anchor="middle" fill="#ffffff" font-size="16" font-weight="bold">DS</text>
    </svg>
  `)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={logoUrl} alt="DENTALIUM STORE Logo" style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '4px' }} />
      <div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff0000', lineHeight: '1' }}>DENTALIUM</div>
        <div style={{ fontSize: '10px', color: '#666' }}>STORE</div>
      </div>
    </div>
  )
}
