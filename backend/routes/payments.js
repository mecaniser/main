// const express = require('express');
// const { Client, Environment } = require('square');
// const crypto = require('crypto');

// const router = express.Router();
// const client = new Client({
//   environment: Environment.Sandbox, // Switch to Environment.Production for production
//   accessToken: process.env.SQUARE_ACCESS_TOKEN, // Use environment variable for access token
// });

// const paymentsApi = client.paymentsApi;

// router.post('/api/create-payment', async (req, res) => {
//   const { sourceId, amount } = req.body;

//   try {
//     const idempotencyKey = crypto.randomUUID();

//     const paymentResponse = await paymentsApi.createPayment({
//       sourceId,
//       idempotencyKey,
//       amountMoney: {
//         amount, // Amount in cents
//         currency: 'USD',
//       },
//     });

//     res.status(200).json(paymentResponse.result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;