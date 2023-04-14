const mongoose = require('mongoose');

const realisation = mongoose.Schema({
    id: { type: String },
    image : { type: String },
    title : { type: String },
    description : { type: String },
    date : { type: Date, default: Date.now },
});

module.exports = mongoose.model('Réalisation', realisation);