const Loader = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '16rem',
    padding: '2rem'
  };

  const spinnerStyle = {
    width: '4rem',
    height: '4rem',
    border: '4px solid rgba(37, 99, 235, 0.1)',
    borderTopColor: '#2563eb',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  };

  const spinnerInnerStyle = {
    width: '3rem',
    height: '3rem',
    border: '3px solid rgba(220, 38, 38, 0.1)',
    borderTopColor: '#dc2626',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite reverse',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const wrapperStyle = {
    position: 'relative',
    width: '4rem',
    height: '4rem'
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
      
      <div style={containerStyle}>
        <div style={wrapperStyle}>
          <div style={spinnerStyle}></div>
          <div style={spinnerInnerStyle}></div>
        </div>
      </div>
    </>
  );
};

export default Loader;