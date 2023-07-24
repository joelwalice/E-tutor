const mongoose = require('mongoose');
const stuSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    password: String,
});

const Student = mongoose.model('Student-Data', stuSchema);
module.exports = Student;
