const express = require('express');
const { Client, Environment } = require('square');

const router = express.Router();

const client = new Client({
  environment: Environment.Sandbox, // Sandbox environment
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

router.post('/process-payment', async (req, res) => {
  const { sourceId, amount } = req.body;
  // Validate the amount
if (typeof amount !== "number") {
  console.error("Amount is not a number:", amount);
  return res.status(400).json({ error: "Amount must be a number" });
}

// Process payment
const numericAmount = Number(amount); // Ensure it's a number

  try {
    const response = await client.paymentsApi.createPayment({
      sourceId, // Token from frontend
      idempotencyKey: `${Date.now()}`, // Ensure uniqueness for payment requests
      amountMoney: {
        amount: numericAmount, // Amount in cents
        currency: 'USD',
      },
    });

    res.status(200).json({ success: true, payment: response.result });
  } catch (error) {
    console.error('Payment failed server side:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
 