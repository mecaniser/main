const RATES = {
  baseRate: 3000, // $30/day
  trailerFees: {
    'Flatbed': 1000,
    'Reefer': 1500,
    'Dry Van': 1000,
    'Tanker': 2000,
    'Car Transporter': 1500
  }
};

export const calculateBookingAmount = (formData) => {
  const { startDate, endDate, trailerType } = formData;
  
  // Calculate number of days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  // Base amount
  let amount = RATES.baseRate * days;
  
  // Add trailer fee if applicable
  if (trailerType && RATES.trailerFees[trailerType]) {
    amount += RATES.trailerFees[trailerType] * days;
  }
  
  return amount; // Returns amount in cents
};