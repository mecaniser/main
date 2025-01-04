import React from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import './index.css';
import App from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import messages_en from './locales/en.json';
import messages_ru from './locales/ru.json';
import messages_ar from './locales/ar.json';

const messages = {
  en: messages_en,
  ru: messages_ru,
  ar: messages_ar,
};

const language = navigator.language.split(/[-_]/)[0]; // Get the language code

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messages[language]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
