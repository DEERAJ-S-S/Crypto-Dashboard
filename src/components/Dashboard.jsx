import React, { useState, useMemo } from 'react';
import { useCrypto } from '../context/CryptoContext';
import CryptoCard from './CryptoCard';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import DetailsModal from './DetailsModal';
import { RefreshCw, LayoutDashboard, Star, AlertTriangle, Loader2, Sparkles, Search } from 'lucide-react';

const Dashboard = () => {
  const { cryptos, loading, error, refreshData, watchlist } = useCrypto();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'watchlist'

  const filteredCryptos = useMemo(() => {
    let result = cryptos;

    if (activeTab === 'watchlist') {
      result = result.filter(coin => watchlist.includes(coin.id));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        coin => coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query)
      );
    }

    return result;
  }, [cryptos, searchQuery, activeTab, watchlist]);

  const top10Cryptos = useMemo(() => {
    if (searchQuery || activeTab === 'watchlist') return filteredCryptos;
    return filteredCryptos.slice(0, 10);
  }, [filteredCryptos, searchQuery, activeTab]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 dark:bg-slate-900 text-center space-y-4">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full text-red-500 dark:text-red-400">
          <AlertTriangle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Oops! Something went wrong</h2>
        <p className="max-w-md text-slate-600 dark:text-slate-400">{error}</p>
        <button
          onClick={refreshData}
          className="flex items-center px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/30"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/40">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Crypto Finance</h1>
              <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1">Real-Time Market Data</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl mx-auto w-full">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={refreshData}
              disabled={loading}
              className={`p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 transition-all ${loading ? 'animate-spin' : ''}`}
              title="Refresh Data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex items-center p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-fit shadow-sm">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" /> Market Overview
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`flex items-center px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'watchlist' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Star className={`w-4 h-4 mr-2 ${activeTab === 'watchlist' ? 'fill-current' : ''}`} /> My Watchlist
            {watchlist.length > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === 'watchlist' ? 'bg-white text-blue-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {watchlist.length}
              </span>
            )}
          </button>
        </div>

        {loading && cryptos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Fetching latest market data...</p>
          </div>
        ) : top10Cryptos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {top10Cryptos.map((coin) => (
              <CryptoCard key={coin.id} coin={coin} onClick={setSelectedCoin} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
            <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No assets found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try searching for a different cryptocurrency or adjust your filters.</p>
          </div>
        )}
      </main>

      <DetailsModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />

      <footer className="max-w-7xl mx-auto p-6 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Powered by <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CoinGecko API</a>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
