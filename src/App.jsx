import React from 'react';
import { CryptoProvider } from './context/CryptoContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <CryptoProvider>
      <Dashboard />
    </CryptoProvider>
  );
}

export default App;
