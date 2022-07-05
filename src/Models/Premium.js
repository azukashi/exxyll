const m = require('mongoose');

module.exports = m.model(
    'premium',
    new m.Schema({
        User: String,
    })
);
