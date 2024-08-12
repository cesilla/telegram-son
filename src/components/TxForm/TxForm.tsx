import React, { useEffect, useState } from 'react';
import './style.scss';
import { useTonConnectUI, ConnectedWallet } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';

const translations = {
  en: {
    connectWallet: "Connect Wallet",
    connected: "Connected",
    disconnect: "Disconnect",
    continueWithWallet: "Continue with this wallet",
  },
  tr: {
    connectWallet: "Cüzdanı Bağla",
    connected: "Bağlı",
    disconnect: "Bağlantıyı Kes",
    continueWithWallet: "Bu cüzdan ile devam et",
  },
  es: {
    connectWallet: "Conectar Cartera",
    connected: "Conectado",
    disconnect: "Desconectar",
    continueWithWallet: "Continuar con esta cartera",
  },
  fr: {
    connectWallet: "Connecter le Portefeuille",
    connected: "Connecté",
    disconnect: "Déconnecter",
    continueWithWallet: "Continuer avec ce portefeuille",
  },
  zh: {
    connectWallet: "连接钱包",
    connected: "已连接",
    disconnect: "断开连接",
    continueWithWallet: "继续使用此钱包",
  },
  ar: {
    connectWallet: "اتصل بالمحفظة",
    connected: "متصل",
    disconnect: "قطع الاتصال",
    continueWithWallet: "تابع باستخدام هذه المحفظة",
  },
  de: {
    connectWallet: "Verbinden Sie die Geldbörse",
    connected: "Verbunden",
    disconnect: "Trennen",
    continueWithWallet: "Mit dieser Brieftasche fortfahren",
  },
  ru: {
    connectWallet: "Подключить кошелек",
    connected: "Подключено",
    disconnect: "Отключить",
    continueWithWallet: "Продолжить с этим кошельком",
  },
};

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
      navigate('/main');  
    }
  }, [tonConnectUI, navigate]);

  const handleConnect = async () => {
    try {
      await tonConnectUI.connectWallet();
      const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;
      if (currentWallet) {
        setWallet(currentWallet);
        navigate('/main');  // Başarılı bağlantıdan sonra mainpage'e yönlendir
      }
    } catch (error: any) {
      console.error('Connection Error:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    // Bağlantıyı kesme mantığı buraya eklenebilir
    setWallet(null);
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="connect-wallet-form">
      <div className="wallet-connector">
        <h3>{t.connectWallet}</h3>
        {wallet ? (
          <div className="wallet-info slide-in">
            <p>{t.connected}: {wallet.account.address}</p>
            <button className="wallet-button" onClick={handleDisconnect}>{t.disconnect}</button>
            <button className="wallet-button" onClick={() => navigate('/main')}>{t.continueWithWallet}</button>
          </div>
        ) : (
          <button className="wallet-button slide-in-bottom" onClick={handleConnect}>{t.connectWallet}</button>
        )}
      </div>
    </div>
  );
}
