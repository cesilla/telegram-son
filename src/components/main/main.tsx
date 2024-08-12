import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleTonConnectEvents = (event: any) => {
      if (event.type === 'connection-completed' && event.is_success) {
        console.log('Connection completed successfully');
        navigate('/');  // Cüzdan bağlıysa ana sayfaya yönlendir
      } else if (event.type === 'connection-restoring-completed' && event.is_success) {
        console.log('Connection restored successfully');
        navigate('/');  // Bağlantı geri yüklendiğinde ana sayfaya yönlendir
      }
    };

    window.addEventListener('TonConnectEvent', handleTonConnectEvents);

    return () => {
      window.removeEventListener('TonConnectEvent', handleTonConnectEvents);
    };
  }, [navigate]);

  const handleDisconnect = () => {
    console.log('Disconnecting wallet');
    navigate('/txform');
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
};

export default MainPage;
