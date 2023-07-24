const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    password: String,
});

const admin = mongoose.model('Admin-Data', adminSchema);
module.exports = admin;
