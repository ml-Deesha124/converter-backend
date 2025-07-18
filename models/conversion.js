const mongoose = require('mongoose');

const conversionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    fromCurrency: { type: String, required: true },
    toCurrency: { type: String, required: true },
    result: { type: Number, required: true },

});

module.exports = mongoose.model('Conversion', conversionSchema);