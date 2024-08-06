import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Modal from '../Modal/Modal';
import ToDoList from '../todo/ToDoList';
import './main.css';

type LanguageCode = 'en' | 'tr' | 'ar' | 'fr' | 'es' | 'de' | 'ru' | 'zh';

interface Translation {
  greeting: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  dailyVerse: string;
  prayerTimes: string;
  randomDua: string;
  randomHadith: string;
  openToDoList: string;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  en: {
    greeting: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
    },
    dailyVerse: 'Daily Verse',
    prayerTimes: 'Prayer Times',
    randomDua: 'Random Dua',
    randomHadith: 'Random Hadith',
    openToDoList: 'Open To-Do List',
  },
  tr: {
    greeting: {
      morning: 'Hayırlı Sabahlar',
      afternoon: 'Hayırlı Öğlenler',
      evening: 'Hayırlı Akşamlar',
    },
    dailyVerse: 'Günlük Ayet',
    prayerTimes: 'Namaz Vakitleri',
    randomDua: 'Rastgele Dua',
    randomHadith: 'Rastgele Hadis',
    openToDoList: 'Yapılacaklar Listesini Aç',
  },
  // Add other languages...
};

const getTimeBasedGreeting = (hour: number, t: Translation) => {
  if (hour < 12) {
    return t.greeting.morning;
  } else if (hour < 18) {
    return t.greeting.afternoon;
  } else {
    return t.greeting.evening;
  }
};

const MainPage: React.FC = () => {
  const location = useLocation();
  const { language } = location.state || { language: 'en' };
  const [originalVerse, setOriginalVerse] = useState<string | null>(null);
  const [translatedVerse, setTranslatedVerse] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);
  const [hadith, setHadith] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const walletAddress = '0x1234...abcd'; // Simulated wallet address

  const lang: LanguageCode = language as LanguageCode;
  const t: Translation = translations[lang] || translations.en;

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        const response = await axios.get('https://api.alquran.cloud/v1/ayah/random/ar');
        const verseText = response.data.data.text;
        setOriginalVerse(verseText);

        const translatedResponse = await axios.post('http://localhost:5000/translate', {
          text: verseText,
          target_lang: lang,
        });
        setTranslatedVerse(translatedResponse.data.text);
      } catch (error) {
        setError('Error fetching verse or translation');
        console.error('Verse/Translation Error:', error);
      }
    };

    const fetchLocation = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setUserLocation(response.data);
      } catch (error) {
        setError('Error fetching location');
        console.error('Location Error:', error);
      }
    };

    const fetchHadith = async () => {
      const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud/1035.json`;

      try {
        const response = await axios.get(url);
        let hadithText = '';
        if (response.data.hadiths && response.data.hadiths.length > 0) {
          hadithText = response.data.hadiths[0].text;
        } else if (response.data.hadith) {
          hadithText = response.data.hadith;
        } else {
          hadithText = 'No hadith found';
        }

        const translatedResponse = await axios.post('http://localhost:5000/translate', {
          text: hadithText,
          target_lang: lang,
        });
        setHadith(translatedResponse.data.text);
      } catch (error) {
        setError('Error fetching hadith');
        console.error('Error fetching hadith:', error);
      }
    };

    fetchDailyVerse();
    fetchLocation();
    fetchHadith();
  }, [lang]);

  useEffect(() => {
    const fetchPrayerTimes = async (city: string, country: string) => {
      try {
        const response = await axios.get(
          `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
        );
        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        setError('Error fetching prayer times');
        console.error('Prayer Times Error:', error);
      }
    };

    if (userLocation) {
      fetchPrayerTimes(userLocation.city, userLocation.country_name);
    }
  }, [userLocation]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const now = new Date();
  const currentHour = now.getHours();
  const greeting = getTimeBasedGreeting(currentHour, t);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="main-page">
      {error && <p>{error}</p>}
      <img src="/kayit/MainPage2.png" alt="Main Page 2" className="main-page2" />
      <div className="header">
        <div className="greeting">
          <h1>{greeting}</h1>
        </div>
        <div className="profile-menu">
          <Link to="/profile">
            <img src="/icons/profile.png" alt="Profile" />
          </Link>
          <p className="wallet-address">{walletAddress}</p>
        </div>
      </div>
      <div className="location-time">
        {userLocation && (
          <p>
            {userLocation.city}, {userLocation.country_name} - {now.toLocaleTimeString()}
          </p>
        )}
      </div>
      <div className="prayer-times">
        <h2>{t.prayerTimes}</h2>
        {prayerTimes && (
          <div className="scrollable-prayer-times">
            {Object.entries(prayerTimes).map(([name, time]) => (
              <button key={name} className={`prayer-time-button`}>
                {name}: {time}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="daily-verse fade-in">
        <h2>{t.dailyVerse}</h2>
        {originalVerse && <p className="verse-text">{originalVerse}</p>}
        {translatedVerse && <p className="verse-text">{translatedVerse}</p>}
      </div>
      <div className="hadith fade-in">
        <h2>{t.randomHadith}</h2>
        {hadith && <p className="hadith-text">{hadith}</p>}
      </div>
      <button className="open-modal-button" onClick={handleOpenModal}>
        {t.openToDoList}
      </button>
      <Navbar />
      {showModal && (
        <Modal show={showModal} onClose={handleCloseModal}>
          <ToDoList />
        </Modal>
      )}
    </div>
  );
};

export default MainPage;
