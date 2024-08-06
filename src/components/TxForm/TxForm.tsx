import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTonConnectUI, ConnectedWallet } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';

export function TxForm() {
  const [tonConnectUI] = useTonConnectUI();
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleConnect = async () => {
      const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;
      if (currentWallet) {
        setWallet(currentWallet);
        navigate('/');
      }
    };
    handleConnect();
  }, [tonConnectUI, navigate]);

  const handleConnect = async () => {
    await tonConnectUI.connectWallet();
    const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;
    if (currentWallet) {
      setWallet(currentWallet);
      navigate('/');
    }
  };

  const handleDisconnect = async () => {
    // Your disconnect logic here, if available
    setWallet(null);
  };

  return (
    <div className="connect-wallet-form">
      <h3>Connect your wallet</h3>
      {wallet ? (
        <div>
          <p>Connected: {wallet.account.address}</p>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}
