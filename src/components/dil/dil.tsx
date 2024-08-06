import React, { useEffect, useState } from 'react';
import './LanguageSelector.scss';

const translations = {
  en: { selectLanguage: "Select Language" },
  tr: { selectLanguage: "Dil Seç" },
  es: { selectLanguage: "Seleccionar Idioma" },
  fr: { selectLanguage: "Choisir la langue" },
  zh: { selectLanguage: "选择语言" },
  ar: { selectLanguage: "اختر اللغة" },
  de: { selectLanguage: "Sprache auswählen" },
  ru: { selectLanguage: "Выбрать язык" },
};

type LanguageSelectorProps = {
  onLanguageChange: (language: string) => void;
};

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Default language is English

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
    onLanguageChange(newLanguage);
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="language-selection">
      <label>{t.selectLanguage}</label>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="zh">中文</option>
        <option value="ar">العربية</option>
        <option value="de">Deutsch</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
}
