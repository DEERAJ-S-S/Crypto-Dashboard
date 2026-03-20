import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchTopCryptos } from '../services/cryptoApi';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const getCryptos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTopCryptos(50); // Fetch 50 to allow better search results
      setCryptos(data);
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCryptos();
  }, [getCryptos]);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      console.log('Dark mode added to html');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Dark mode removed from html');
    }
  }, [darkMode]);

  const toggleWatchlist = (id) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const value = {
    cryptos,
    loading,
    error,
    watchlist,
    darkMode,
    toggleWatchlist,
    toggleDarkMode,
    refreshData: getCryptos,
  };

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
};
