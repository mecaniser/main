import React from 'react';

const LanguageSelector = ({ locale, setLocale }) => {
  const handleLanguageChange = (e) => {
    setLocale(e.target.value);
  };

  return (
    <div className="language-selector-container">
      <select className="language-selector" value={locale} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="ar">العربية</option>
        <option value="es">Español</option> {/* Add Spanish option */}
      </select>
    </div>
  );
};

export default LanguageSelector;