import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style.css';
import App from './App';
import AuthProvider from './components/AuthContext'; // ✅ Correct import
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Correct usage */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
