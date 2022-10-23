const mongoose = require('mongoose');

module.exports = mongoose.model(
    'premium',
    new mongoose.Schema({
        User: String,
    })
);
