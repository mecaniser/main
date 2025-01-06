import React, { useState, useEffect } from 'react';
import { FormattedMessage, useIntl, IntlProvider } from 'react-intl';
import axios from 'axios';
import PaymentForm from './PaymentForm';
import messages_en from '../locales/en.json';
import messages_ru from '../locales/ru.json';
import messages_ar from '../locales/ar.json';
import messages_es from '../locales/es.json';
import '../styles/BookingModal.css';

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
  const [locations, setLocations] = useState([]); // State to store available locations
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  const handleLanguageChange = (e) => {
    setLocale(e.target.value);
  };

  const [formData, setFormData] = useState({
    name: 'John Doe',
    phone: '123-456-7890',
    email: 'john.doe@example.com',
    licenseNumber: 'ABC123456',
    truckDetails: 'Ford F-150, 2020',
    truckLicensePlate: 'XYZ1234',
    trailerType: 'Flatbed',
    trailerLicensePlate: 'TRAIL1234',
    parkingDuration: bookingDetails ? bookingDetails.duration : 'per day',
    startDate: '2023-10-01',
    endDate: '2023-10-02',
    parkingLocation: '4613 Statesville Rd, Charlotte, NC 28269',
    billingAddress: '123 Main St, Anytown, CA 12345',
    paymentMethod: 'Square',
    invoicePreference: 'Email',
    companyName: 'Doe Trucking Co.',
    dotNumber: 'DOT123456',
    emergencyContact: 'Jane Doe, 987-654-3210',
    termsAgreed: false,
  });

  const [extendDuration, setExtendDuration] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookingDetails) {
      setFormData((prevData) => ({
        ...prevData,
        parkingDuration: bookingDetails.duration,
      }));
    }
  }, [bookingDetails]);

  useEffect(() => {
    // Fetch available locations when the component mounts
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/api/parking-spaces');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit({ address, ...formData });
    }
  };

  const handleExtendDuration = () => {
    setExtendDuration(true);
  };

  const isSubmitDisabled = !formData.termsAgreed;

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const validateStep = (step) => {
    let newErrors = {};
    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        if (!formData.phone) newErrors.phone = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        if (!formData.email) newErrors.email = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        break;
      case 2:
        if (!formData.truckDetails) newErrors.truckDetails = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        if (!formData.truckLicensePlate) newErrors.truckLicensePlate = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        if (!formData.trailerLicensePlate) newErrors.trailerLicensePlate = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        break;
      case 3:
        if (!formData.parkingDuration) newErrors.parkingDuration = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        if (!formData.startDate) newErrors.startDate = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        break;
      case 4:
        break; // Optional information, no validation needed
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const progressPercentage = (currentStep / 5) * 100;

  const handlePaymentSuccess = (data) => {
    console.log('Payment successful:', data);
    onSubmit({ address, ...formData });
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  const handlePaymentValidation = (isValid) => {
    setIsPaymentValid(isValid);
  };

  const handlePayNow = async () => {
    if (validateStep(currentStep) && isPaymentValid) {
      const paymentForm = document.getElementById('payment-form');
      if (paymentForm) {
        paymentForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

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
          <form id="payment-form" onSubmit={handleSubmit}>
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
                    placeholder={errors.name || ''}
                    className={errors.name ? 'error' : ''}
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
                    placeholder={errors.phone || ''}
                    className={errors.phone ? 'error' : ''}
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
                    placeholder={errors.email || ''}
                    className={errors.email ? 'error' : ''}
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
                    placeholder={errors.truckDetails || ''}
                    className={errors.truckDetails ? 'error' : ''}
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
                    placeholder={errors.truckLicensePlate || ''}
                    className={errors.truckLicensePlate ? 'error' : ''}
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
                    placeholder={errors.trailerLicensePlate || ''}
                    className={errors.trailerLicensePlate ? 'error' : ''}
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
                      className={errors.trailerType ? 'error' : ''}
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
                  <FormattedMessage id="parkingLocation" defaultMessage="Parking Location" />
                  <select
                    name="parkingLocation"
                    value={formData.parkingLocation}
                    onChange={handleChange}
                    className={errors.parkingLocation ? 'error' : ''}
                    required
                  >
                    <option value="">{formatMessage({ id: 'selectLocation', defaultMessage: 'Select Location' })}</option>
                    {locations.map((location) => (
                      <option key={location._id} value={location.address}>
                        {location.address}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <FormattedMessage id="startDate" defaultMessage="Start Date" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder={errors.startDate || ''}
                    className={errors.startDate ? 'error' : ''}
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
                <p>
                  <FormattedMessage id="paymentMethod" defaultMessage="Payment Method" />
                </p>
                <PaymentForm
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  // onPaymentValidation={handlePaymentValidation}
                />
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
                <button id='submit-button' type="button" disabled={isSubmitDisabled} onClick={handlePayNow}>
                  <FormattedMessage id="submit" defaultMessage="Submit and Pay" />
                </button>
              )}
            </div>
          </form>
          <p>Elis Group</p>
        </div>
      </div>
    </IntlProvider>
  );
};

export default BookingModal;