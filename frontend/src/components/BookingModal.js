import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl, IntlProvider } from 'react-intl';
import '../styles/BookingModal.css';
import messages_en from '../locales/en.json';
import messages_ru from '../locales/ru.json';
import messages_ar from '../locales/ar.json';
import messages_es from '../locales/es.json';

const messages = {
  en: messages_en,
  ru: messages_ru,
  ar: messages_ar,
  es: messages_es,
};

const BookingModal = ({ address, bookingDetails, onClose, onSubmit }) => {
  const { formatMessage } = useIntl();
  const language = navigator.language.split(/[-_]/)[0] || 'en'; // Get the language code or default to 'en'
  const [locale, setLocale] = useState(language);

  const handleLanguageChange = (e) => {
    setLocale(e.target.value);
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    truckDetails: '',
    truckLicensePlate: '',
    trailerType: '',
    trailerLicensePlate: '',
    parkingDuration: bookingDetails ? bookingDetails.duration : '',
    startDate: '',
    endDate: '',
    specificNeeds: [],
    parkingLocation: '',
    billingAddress: '',
    paymentMethod: '',
    invoicePreference: '',
    companyName: '',
    dotNumber: '',
    emergencyContact: '',
    termsAgreed: false,
    paymentTermsAgreed: false,
  });

  const [extendDuration, setExtendDuration] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (bookingDetails) {
      setFormData((prevData) => ({
        ...prevData,
        parkingDuration: bookingDetails.duration,
      }));
    }
  }, [bookingDetails]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'specificNeeds') {
        setFormData((prevData) => ({
          ...prevData,
          specificNeeds: checked
            ? [...prevData.specificNeeds, value]
            : prevData.specificNeeds.filter((need) => need !== value),
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ address, ...formData });
  };

  const handleExtendDuration = () => {
    setExtendDuration(true);
  };

  const isSubmitDisabled = !formData.termsAgreed;

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const progressPercentage = (currentStep / 5) * 100;

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <div className="booking-modal">
        <div className="booking-modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <div className="language-selector-container">
            <select className="language-selector" value={locale} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="ar">العربية</option>
              <option value="es">Español</option>
            </select>
          </div>
          <h2><FormattedMessage id="title" defaultMessage="Truck Parking Booking Form" /></h2>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="form-group">
                <h3><FormattedMessage id="driverInformation" defaultMessage="1. Driver Information" /></h3>
                <label>
                  <FormattedMessage id="fullName" defaultMessage="Full Name" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <FormattedMessage id="phoneNumber" defaultMessage="Phone Number" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <FormattedMessage id="emailAddress" defaultMessage="Email Address" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            )}
            {currentStep === 2 && (
              <div className="form-group">
                <h3><FormattedMessage id="truckVehicleInformation" defaultMessage="2. Truck/Vehicle Information" /></h3>
                <label>
                  <FormattedMessage id="truckDetails" defaultMessage="Truck Make, Model, and Year" />
                  <input
                    type="text"
                    name="truckDetails"
                    value={formData.truckDetails}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <FormattedMessage id="truckLicensePlate" defaultMessage="Truck License Plate Number" />
                  <input
                    type="text"
                    name="truckLicensePlate"
                    value={formData.truckLicensePlate}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <FormattedMessage id="trailerLicensePlate" defaultMessage="Trailer License Plate Number" />
                  <input
                    type="text"
                    name="trailerLicensePlate"
                    value={formData.trailerLicensePlate}
                    onChange={handleChange}
                    required
                  />
                </label>
                {formData.trailerLicensePlate && (
                  <label>
                    <FormattedMessage id="trailerType" defaultMessage="Trailer Type and Size" />
                    <select
                      name="trailerType"
                      value={formData.trailerType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{formatMessage({ id: 'trailerType', defaultMessage: 'Trailer Type and Size' })}</option>
                      <option value="Flatbed">Flatbed</option>
                      <option value="Reefer">Reefer</option>
                      <option value="Dry Van">Dry Van</option>
                      <option value="Tanker">Tanker</option>
                      <option value="Car Transporter">Car Transporter</option>
                    </select>
                  </label>
                )}
              </div>
            )}
            {currentStep === 3 && (
              <div className="form-group">
                <h3><FormattedMessage id="parkingRequirements" defaultMessage="3. Parking Requirements" /></h3>
                <label>
                  <FormattedMessage id="parkingDuration" defaultMessage="Parking Duration" />
                  <input
                    type="text"
                    name="parkingDuration"
                    value={
                      formData.parkingDuration === 'per day'
                        ? formatMessage({ id: 'oneDayBooking', defaultMessage: 'One day booking' })
                        : formData.parkingDuration === 'per week'
                        ? formatMessage({ id: 'oneWeekBooking', defaultMessage: 'One week booking' })
                        : formData.parkingDuration === 'per month'
                        ? formatMessage({ id: 'oneMonthBooking', defaultMessage: 'One month booking' })
                        : formData.parkingDuration
                    }
                    readOnly
                  />
                </label>
                <label>
                  <FormattedMessage id="startDate" defaultMessage="Start Date" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </label>
                {formData.parkingDuration !== 'per day' && !extendDuration && (
                  <label>
                    <FormattedMessage id="endDate" defaultMessage="End Date" />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {formData.parkingDuration === 'per day' && !extendDuration && (
                  <button type="button" onClick={handleExtendDuration}>
                    <FormattedMessage id="extendDuration" defaultMessage="Extend Duration" />
                  </button>
                )}
                {extendDuration && (
                  <label>
                    <FormattedMessage id="endDate" defaultMessage="End Date" />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </label>
                )}
              </div>
            )}
            {currentStep === 4 && (
              <div className="form-group">
                <h3><FormattedMessage id="optionalInformation" defaultMessage="4. Optional Information" /></h3>
                <label>
                  <FormattedMessage id="companyName" defaultMessage="Company Name (if applicable)" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <FormattedMessage id="dotNumber" defaultMessage="DOT Number" />
                  <input
                    type="text"
                    name="dotNumber"
                    value={formData.dotNumber}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <FormattedMessage id="emergencyContact" defaultMessage="Emergency Contact Name and Number" />
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                  />
                </label>
              </div>
            )}
            {currentStep === 5 && (
              <div className="form-group">
                <h3><FormattedMessage id="paymentInformation" defaultMessage="5. Payment Information" /></h3>
                <label>
                  <FormattedMessage id="billingAddress" defaultMessage="Billing Address" />
                  <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <FormattedMessage id="paymentMethod" defaultMessage="Payment Method" />
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{formatMessage({ id: 'paymentMethod', defaultMessage: 'Payment Method' })}</option>
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="ACH/Bank Transfer">ACH/Bank Transfer</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                {/* <label>
                  <FormattedMessage id="invoicePreference" defaultMessage="Would you like an invoice or receipt?" />
                  <select
                    name="invoicePreference"
                    value={formData.invoicePreference}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{formatMessage({ id: 'invoicePreference', defaultMessage: 'Would you like an invoice or receipt?' })}</option>
                    <option value="Email">Email</option>
                    <option value="Physical Copy">Physical Copy</option>
                  </select>
                </label> */}
                <label id="termsAgreedLabel" className="checkbox-label">
                  <div className="terms-container"></div>
                  <input
                    type="checkbox"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    required
                  />
                  <FormattedMessage
                    id="termsAgreed"
                    defaultMessage="I have read and agree to the {termsLink}."
                    values={{
                      termsLink: (
                        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                          <FormattedMessage id="termsAndConditions" defaultMessage="Parking Terms and Conditions" />
                        </a>
                      ),
                    }}
                  />
                </label>
                {/* <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="paymentTermsAgreed"
                    checked={formData.paymentTermsAgreed}
                    onChange={handleChange}
                    required
                  />
                  <FormattedMessage id="paymentTermsAgreed" defaultMessage="I agree to the Payment Terms." />
                </label> */}
              </div>
            )}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep}>
                  <FormattedMessage id="previous" defaultMessage="Previous" />
                </button>
              )}
              {currentStep < 5 && (
                <button type="button" onClick={nextStep}>
                  <FormattedMessage id="next" defaultMessage="Next" />
                </button>
              )}
              {currentStep === 5 && (
                <button id='submit-button' type="submit" disabled={isSubmitDisabled}>
                  <FormattedMessage id="submit" defaultMessage="Submit" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </IntlProvider>
  );
};

export default BookingModal;