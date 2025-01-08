import React, { useEffect, useState, memo, Profiler } from "react";
import { initializeSquarePayments } from "../helpers/squarePaymentsHelper";

const PaymentForm = ({ onPaymentSuccess, onPaymentError }) => {
  const [card, setCard] = useState(null);
  const [status, setStatus] = useState("Initializing...");
  const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log(`Profiler: ${id} rendered in ${actualDuration}ms during ${phase} phase.`);
  };
  useEffect(() => {
 
    const script = document.createElement('script');
    script.src = "https://sandbox.web.squarecdn.com/v1/square.js";
    script.async = true;
    script.onload = () => {
      initializeSquarePayments(setCard, setStatus);
    };
    script.onerror = () => {
      console.error('Failed to load Square.js');
    };
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!card) {
      console.error("Card instance not initialized");
      return;
    }

    const tokenResult = await card.tokenize();
    if (tokenResult.status === 'OK') {
      console.log('Tokenization successful:', tokenResult.token);
      // Send tokenResult.token to your backend
    } else {
      console.error('Tokenization failed:', tokenResult.errors);
    }

    if (tokenResult.status === "OK") {
      try {
        const response = await fetch("/api/payments/process-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceId: tokenResult.token, // Ensure this matches the expected key in your backend
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
        console.error("Payment failed:", error);
        onPaymentError(error.message);
      }
    } else {
      console.error("Tokenization failed:", tokenResult.errors);
      onPaymentError(tokenResult.errors);
    }
  };

  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      <div>
        <h2>Square Payment</h2>
        <p>{status}</p>
        <div id="card-container"></div>
        <button onClick={handlePayment} disabled={!card}>Pay $10.00</button>
      </div>
    </Profiler>
  );
};

export default memo(PaymentForm);
