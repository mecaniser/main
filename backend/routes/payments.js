const express = require('express');
const router = express.Router();
const { Client, Environment } = require('square');

// Initialize Square client
const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

// Custom replacer function to handle BigInt values
function bigintReplacer(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

router.post('/process-payment', async (req, res) => {
  const { sourceId, amount } = req.body;

  // Convert amount to BigInt if necessary
  const numericAmount = BigInt(amount);

  try {
    const paymentsApi = client.paymentsApi;
    const response = await paymentsApi.createPayment({
      sourceId: sourceId,
      idempotencyKey: new Date().getTime().toString(),
      amountMoney: {
        amount: numericAmount,
        currency: 'USD',
      },
    });

    // Use the custom replacer function when serializing the response
    res.status(200).json(JSON.stringify(response.result, bigintReplacer));
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;