import React, { useContext, useEffect, useState } from 'react';
import { useTonConnectUI, ConnectedWallet } from "@tonconnect/ui-react";
import { useNavigate } from 'react-router-dom';
import { LanguageSelector } from '../LanguageSelector';
import { LanguageContext } from '../LanguageContext';

function Dil() {
  const [tonConnectUI] = useTonConnectUI();
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;

    if (currentWallet && selectedLanguage) {
      setWallet(currentWallet);
      navigate('/');
    } else if (selectedLanguage) {
      navigate('/txform');
    }
  }, [tonConnectUI, navigate, selectedLanguage]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;
    if (currentWallet) {
      navigate('/');
    } else {
      navigate('/txform');
    }
  };

  return (
    <div>
      <h2>Language Selection</h2>
      <LanguageSelector onLanguageChange={handleLanguageChange} />
    </div>
  );
}

export default Dil;
