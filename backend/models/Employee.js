const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true},
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    doj: { type: String, required: true },
    address: { type: String },
    email: { type: String, required: true, unique: true  },
    mobile: { type: String, required: true, unique: true  },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    image: { type: String },

});

EmployeeSchema.pre('save', async function (next) {
    next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);
