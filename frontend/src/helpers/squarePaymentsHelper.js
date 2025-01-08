export const initializeSquarePayments = async (setCard, setStatus) => {
  try {
    if (!window.Square) {
      console.error("Square.js failed to load properly");
      setStatus("Failed to load Square.js");
      return;
    }
    // Initialize Square Payments
    const paymentsInstance = window.Square.payments(
      process.env.REACT_APP_SQ_APPLICATION_ID,
      process.env.REACT_APP_SQ_LOCATION_ID
    );
    if (!paymentsInstance) {
      setStatus("Failed to initialize Square Payments");
      return;
    }

    // Create a Card instance
    const cardInstance = await paymentsInstance.card();
    await cardInstance.attach("#card-container");

    setCard(cardInstance);
    setStatus("Ready to process your payment");
  } catch (error) {
    console.error("Error initializing Square Payments:", error);
    setStatus("Failed to initialize Square Payments");
  }
};