import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTonConnectUI, ConnectedWallet } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';

type TxFormProps = {
  selectedLanguage: string;
};

export function TxForm({ selectedLanguage }: TxFormProps) {
  const [tonConnectUI] = useTonConnectUI();
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;
    if (currentWallet) {
      setWallet(currentWallet);
    } else {
      setWallet(null);
    }

    // Dil seçilmemişse dil sayfasına yönlendir
    if (!selectedLanguage) {
      navigate('/');
    }
  }, [tonConnectUI, selectedLanguage, navigate]);

  const handleConnect = async () => {
    try {
      await tonConnectUI.connectWallet();
      const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;
      if (currentWallet) {
        setWallet(currentWallet);
        navigate('/main');  // Başarılı bağlantıdan sonra ana sayfaya yönlendir
      }
    } catch (error: any) {
      console.error('Bağlantı Hatası:', error);
      alert('Cüzdana bağlanılamadı. Lütfen tekrar deneyin.');
    }
  };

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      setWallet(null);
      navigate('/'); // Cüzdan bağlantısı kesildiğinde dil seçimi sayfasına yönlendir
    } catch (error: any) {
      console.error('Bağlantı Kesme Hatası:', error);
      alert('Cüzdan bağlantısı kesilemedi. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="connect-wallet-form">
      <div className="wallet-connector">
        {wallet ? (
          <div className="wallet-info slide-in">
            <p>Bağlı: {wallet.account.address}</p>
            <button className="wallet-button" onClick={handleDisconnect}>Bağlantıyı Kes</button>
            <button className="wallet-button" onClick={() => navigate('/main')}>Bu cüzdanla devam et</button>
          </div>
        ) : (
          <button className="wallet-button slide-in-bottom" onClick={handleConnect}>Cüzdanı Bağla</button>
        )}
      </div>
    </div>
  );
}
