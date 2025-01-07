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
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    truckDetails: '',
    vehicleType: 'Truck and Trailer', // Default value to 'Truck and Trailer'
    truckUnitNumber: '', // Change truckLicensePlate to truckUnitNumber
    trailerType: '',
    trailerUnitNumber: '', // Change trailerLicensePlate to trailerUnitNumber
    parkingDuration: bookingDetails ? bookingDetails.duration : '',
    startDate: '',
    endDate: '',
    parkingLocation: '',
    billingAddress: '',
    paymentMethod: '',
    invoicePreference: '',
    businessName: '', // Change companyName to businessName
    dotNumber: '',
    emergencyContact: '',
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

  useEffect(() => {
    // Preset data for testing
    setFormData({
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      licenseNumber: 'ABC123456',
      truckDetails: 'Ford F-150, 2020',
      truckUnitNumber: 'XYZ1234',
      trailerType: 'Flatbed',
      trailerUnitNumber: 'TRAIL1234',
      parkingDuration: 'per day',
      startDate: '2023-10-01',
      endDate: '2023-10-02',
      parkingLocation: '123 Main St, Anytown, USA',
      billingAddress: '456 Elm St, Anytown, USA',
      paymentMethod: 'Credit Card',
      invoicePreference: 'Email',
      businessName: 'Doe Trucking Co.',
      dotNumber: 'DOT123456',
      emergencyContact: 'Jane Doe, 987-654-3210',
      termsAgreed: false,
    });
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

  const handleVehicleTypeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      vehicleType: e.target.value,
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
        if (!formData.truckUnitNumber) newErrors.truckUnitNumber = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
        if (!formData.trailerUnitNumber) newErrors.trailerUnitNumber = formatMessage({ id: 'requiredField', defaultMessage: 'This field is required' });
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

  const progressPercentage = (currentStep / 4) * 100;

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
                    placeholder="John Doe" // Add placeholder
                    className={errors.name ? 'error' : ''}
                    required
                  />
                </label>
                <label>
                  <FormattedMessage id="businessName" defaultMessage="Business Name" />
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Doe Trucking Co." // Add placeholder
                    className={errors.businessName ? 'error' : ''}
                  />
                </label>
                <label>
                  <FormattedMessage id="phoneNumber" defaultMessage="Phone Number" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="123-456-7890" // Add placeholder
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
                    placeholder="john.doe@example.com" // Add placeholder
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
                  <FormattedMessage id="vehicleType" defaultMessage="Vehicle Type" />
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleVehicleTypeChange}
                    className={errors.vehicleType ? 'error' : ''}
                    required
                  >
                    <option value="Truck">Truck</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Truck and Trailer">Truck and Trailer</option>
                  </select>
                </label>
                {formData.vehicleType !== 'Trailer' && (
                  <label>
                    <FormattedMessage id="truckUnitNumber" defaultMessage="Truck Unit Number" />
                    <input
                      type="text"
                      name="truckUnitNumber"
                      value={formData.truckUnitNumber}
                      onChange={handleChange}
                      placeholder="XYZ1234" // Add placeholder
                      className={errors.truckUnitNumber ? 'error' : ''}
                      required
                    />
                  </label>
                )}
                {(formData.vehicleType === 'Trailer' || formData.vehicleType === 'Truck and Trailer') && (
                  <>
                    <label>
                      <FormattedMessage id="trailerUnitNumber" defaultMessage="Trailer Unit Number" />
                      <input
                        type="text"
                        name="trailerUnitNumber"
                        value={formData.trailerUnitNumber}
                        onChange={handleChange}
                        placeholder="TRAIL1234" // Add placeholder
                        className={errors.trailerUnitNumber ? 'error' : ''}
                        required
                      />
                    </label>
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
                  </>
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
                    placeholder="2023-10-01" // Add placeholder
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
                      placeholder="2023-10-02" // Add placeholder
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
                      placeholder="2023-10-02" // Add placeholder
                    />
                  </label>
                )}
              </div>
            )}
            {currentStep === 4 && (
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
              {currentStep < 4 && (
                <button type="button" onClick={nextStep}>
                  <FormattedMessage id="next" defaultMessage="Next" />
                </button>
              )}
              {currentStep === 4 && (
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