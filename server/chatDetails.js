const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: String,
    message: String,
});

const chatModel = mongoose.model('chat', Schema);

module.exports = chatModel;