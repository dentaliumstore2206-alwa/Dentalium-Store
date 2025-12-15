export default function LiveChat() {
  const handleChat = () => {
    const whatsappUrl = 'https://wa.me/628116391122?text=Halo, saya butuh bantuan'
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={handleChat}
        style={{
          background: '#25d366',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
        title="Chat via WhatsApp"
      >
        💬
      </button>
    </div>
  )
}