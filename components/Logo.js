export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ marginRight: '10px' }}>
        <rect width="40" height="40" fill="#ff0000" rx="8"/>
        <text x="20" y="25" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">DS</text>
      </svg>
      <div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff0000', lineHeight: '1' }}>DENTALIUM</div>
        <div style={{ fontSize: '10px', color: '#666' }}>STORE</div>
      </div>
    </div>
  )
}