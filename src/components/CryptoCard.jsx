import React from 'react';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useCrypto } from '../context/CryptoContext';

const CryptoCard = ({ coin, onClick }) => {
  const { watchlist, toggleWatchlist } = useCrypto();
  const isWatched = watchlist.includes(coin.id);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    toggleWatchlist(coin.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(marketCap);
  };

  return (
    <div
      onClick={() => onClick(coin)}
      className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-transparent hover:border-blue-500 dark:hover:border-blue-400 group"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{coin.name}</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">{coin.symbol}</span>
          </div>
        </div>
        <button
          onClick={handleWatchlistToggle}
          className={`p-1.5 rounded-full transition-colors ${
            isWatched 
              ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-500' 
              : 'bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
          }`}
        >
          <Star className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{formatPrice(coin.current_price)}</span>
          <div className={`flex items-center text-xs font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Market Cap</span>
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{formatMarketCap(coin.market_cap)}</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
