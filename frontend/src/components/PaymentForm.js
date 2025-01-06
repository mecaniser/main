import React, { useEffect, useState, memo, Profiler } from "react";
import "../styles/global.css";

const PaymentForm = ({ onPaymentSuccess, onPaymentError }) => {
  const [card, setCard] = useState(null);
  const [status, setStatus] = useState("Initializing...");
const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
  console.log(`Profiler: ${id} rendered in ${actualDuration}ms during ${phase} phase.`);
};
  useEffect(() => {
    const initializeSquarePayments = async () => {
      try {
        if (!window.Square) {
          console.error("Square.js failed to load properly");
          setStatus("Failed to load Square.js");
          return;
        }
        console.log("SQ_APPLICATION_ID:", process.env.SQ_APPLICATION_ID);
        console.log("SQ_LOCATION_ID:", process.env.SQ_LOCATION_ID);

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

    initializeSquarePayments();
  }, []);

  const handlePayment = async () => {
    if (!card) {
      console.error("Card instance not initialized");
      return;
    }

    const result = await card.tokenize();
    if (result.status === "OK") {
      try {
        const response = await fetch("/api/payments/process-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: result.token,
            amount: 1000, // $10.00 in cents
          }),
        });

        const data = await response.json();
        if (response.ok) {
          onPaymentSuccess(data);
        } else {
          onPaymentError(data.error);
        }
      } catch (error) {
        onPaymentError(error);
      }
    } else {
      onPaymentError(result.errors[0]?.message);
    }
  };

  useEffect(() => {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
      paymentForm.addEventListener('submit', handlePayment);
    }

    return () => {
      if (paymentForm) {
        paymentForm.removeEventListener('submit', handlePayment);
      }
    };
  }, [card]);

  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <div>
        <h2>Square Payment</h2>
        <p>{status}</p>
        <div id="card-container"></div>
      </div>
    </Profiler>
  );
};

export default memo(PaymentForm);
