import React from 'react';
import { X, TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart } from 'lucide-react';

const DetailsModal = ({ coin, onClose }) => {
  if (!coin) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="relative w-full max-w-lg overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-4">
            <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{coin.name}</h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">{coin.symbol}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-800 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              <DollarSign className="w-3 h-3 mr-1" /> Current Price
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{formatPrice(coin.current_price)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              24h Change
            </div>
            <p className={`text-xl font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              <BarChart3 className="w-3 h-3 mr-1" /> 24h High
            </div>
            <p className="text-xl font-bold text-green-500">{formatPrice(coin.high_24h)}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              <BarChart3 className="w-3 h-3 mr-1 rotate-180" /> 24h Low
            </div>
            <p className="text-xl font-bold text-red-500">{formatPrice(coin.low_24h)}</p>
          </div>

          <div className="col-span-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
            <div className="flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              <PieChart className="w-3 h-3 mr-1" /> Market Capitalization
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{formatMarketCap(coin.market_cap)}</p>
          </div>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Market Rank: <span className="text-slate-900 dark:text-white font-bold ml-1">#{coin.market_cap_rank}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
