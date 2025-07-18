const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Conversion = require('../models/conversion');
const API_KEY = process.env.API_KEY;

// POST: Convert and save to DB
router.post('/convert', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;

  try {
    const url =  `https://api.exchangerate.host/convert?from=USD&to=INR&amount=1`
    const data = await response.json();

    if (data.conversion_result) {
      const newConversion = new Conversion({
        amount,
        fromCurrency,
        toCurrency,
        result: data.conversion_result,
      });

      await newConversion.save();

      res.json({ success: true, result: data.conversion_result });
    } else {
      res.status(400).json({ success: false, message: "Conversion failed" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET: Conversion History
router.get('/history', async (req, res) => {
  try {
    const history = await Conversion.find().sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Could not retrieve history" });
  }
});

module.exports = router;