import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI, ConnectedWallet } from '@tonconnect/ui-react';
import { LanguageContext } from '../LanguageContext';
import './dil.css';

// Define the possible language keys
type LanguageKey = 'en' | 'ru' | 'tr' | 'fr' | 'ar' | 'zh' | 'de' | 'es';

// Define the types for the languages and language prompts objects
const languages: Record<LanguageKey, string> = {
  en: 'English',
  ru: 'русский',
  tr: 'Türkçe',
  fr: 'Français',
  ar: 'اختر لغتك',
  zh: '中文',
  de: 'Deutsch',
  es: 'Español'
};

const languagePrompts: Record<LanguageKey, string> = {
  en: 'Choose your language',
  ru: 'Выберите ваш язык',
  tr: 'Dil Seçiniz',
  fr: 'Choisissez votre langue',
  ar: 'اختر لغتك',
  zh: '选择你的语言',
  de: 'Wähle deine Sprache',
  es: 'Elige tu idioma'
};

const Dil = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(languagePrompts.en);
  const languageKeys: LanguageKey[] = Object.keys(languages) as LanguageKey[];
  const languageIndex = useRef(0);
  const navigate = useNavigate();
  const { setSelectedLanguage } = useContext(LanguageContext);
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage(languagePrompts[languageKeys[languageIndex.current]]);
      languageIndex.current = (languageIndex.current + 1) % languageKeys.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [languageKeys]);

  const handleLanguageSelect = (language: LanguageKey) => {
    localStorage.setItem('selectedLanguage', language);
    setSelectedLanguage(language);

    const currentWallet = tonConnectUI.wallet as ConnectedWallet | null;
    if (currentWallet) {
      navigate('/main'); // If the wallet is connected, navigate to the main page
    } else {
      // Trigger wallet connection if not already connected
      navigate('/txform'); // Navigate to the wallet connection page
    }
  };

  return (
    <div className="container">
      <img src="/kayit/logoo.png" alt="Logo" className="logo" />
      <div className="current-language">{currentLanguage}</div>
      <div className="language-container">
        {languageKeys.map((key) => (
          <button
            key={key}
            className="language-button"
            onClick={() => handleLanguageSelect(key)}
          >
            <span className="language-text">{languages[key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dil;
