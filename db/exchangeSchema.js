const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
    
    currency: {
        type: String,
    },
    rate:{
        type: Number
    }
   
});

module.exports = exchangeSchema;