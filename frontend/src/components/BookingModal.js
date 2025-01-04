import React, { useState, useEffect } from 'react';
import '../styles/BookingModal.css';

const BookingModal = ({ address, bookingDetails, onClose, onSubmit }) => {
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

  const isSubmitDisabled = !formData.termsAgreed || !formData.paymentTermsAgreed;

  return (
    <div className="booking-modal">
      <div className="booking-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Truck Parking Booking Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h3>1. Driver Information</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="licenseNumber"
              placeholder="Driver's License Number (Optional)"
              value={formData.licenseNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <h3>2. Truck/Vehicle Information</h3>
            <input
              type="text"
              name="truckDetails"
              placeholder="Truck Make, Model, and Year"
              value={formData.truckDetails}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="truckLicensePlate"
              placeholder="Truck License Plate Number"
              value={formData.truckLicensePlate}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="trailerLicensePlate"
              placeholder="Trailer License Plate Number"
              value={formData.trailerLicensePlate}
              onChange={handleChange}
              required
            />
            {formData.trailerLicensePlate && (
              <select
                name="trailerType"
                value={formData.trailerType}
                onChange={handleChange}
                required
              >
                <option value="">Trailer Type and Size</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Reefer">Reefer</option>
                <option value="Dry Van">Dry Van</option>
                <option value="Tanker">Tanker</option>
                <option value="Car Transporter">Car Transporter</option>
              </select>
            )}
          </div>
          <div className="form-group">
            <h3>3. Parking Requirements</h3>
            <input
              type="text"
              name="parkingDuration"
              placeholder="Parking Duration"
              value={
                formData.parkingDuration === 'per day'
                  ? 'One day booking'
                  : formData.parkingDuration === 'per week'
                  ? 'One week booking'
                  : formData.parkingDuration === 'per month'
                  ? 'One month booking'
                  : formData.parkingDuration
              }
              readOnly
            />
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            {formData.parkingDuration !== 'per day' && !extendDuration && (
              <input
                type="date"
                name="endDate"
                placeholder="End Date"
                value={formData.endDate}
                onChange={handleChange}
              />
            )}
            {formData.parkingDuration === 'per day' && !extendDuration && (
              <button type="button" onClick={handleExtendDuration}>
                Extend Duration
              </button>
            )}
            {extendDuration && (
              <input
                type="date"
                name="endDate"
                placeholder="End Date"
                value={formData.endDate}
                onChange={handleChange}
              />
            )}
         
          </div>

          <div className="form-group">
            <h3>4. Payment Information</h3>
            <input
              type="text"
              name="billingAddress"
              placeholder="Billing Address"
              value={formData.billingAddress}
              onChange={handleChange}
              required
            />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Payment Method</option>
              <option value="Credit/Debit Card">Credit/Debit Card</option>
              <option value="ACH/Bank Transfer">ACH/Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="invoicePreference"
              value={formData.invoicePreference}
              onChange={handleChange}
              required
            >
              <option value="">Would you like an invoice or receipt?</option>
              <option value="Email">Email</option>
              <option value="Physical Copy">Physical Copy</option>
            </select>
          </div>

          <div className="form-group">
            <h3>5. Optional Information</h3>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name (if applicable)"
              value={formData.companyName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="dotNumber"
              placeholder="DOT Number"
              value={formData.dotNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact Name and Number"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <h3>6. Terms and Agreement</h3>
            <label>
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleChange}
                required
              />
              I have read and agree to the <a href="/terms" target="_blank">Parking Terms and Conditions</a>.
            </label>
            <label>
              <input
                type="checkbox"
                name="paymentTermsAgreed"
                checked={formData.paymentTermsAgreed}
                onChange={handleChange}
                required
              />
              I agree to the Payment Terms.
            </label>
          </div>

          <button type="submit" disabled={isSubmitDisabled}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;