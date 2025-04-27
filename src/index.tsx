import React from 'react';
import ReactDOM from 'react-dom/client';
import ASCIIArtConverter from './ASCIIArtConverter';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ASCIIArtConverter />
      </div>
    </div>
  </React.StrictMode>
);
