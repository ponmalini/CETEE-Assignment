const mongoose = require('mongoose');

const DesignationSchema = new mongoose.Schema({
    name: { type: String, required: true,unique: true },
    department: { type: String, required: true},
    description: { type: String, required: true}
});

DesignationSchema.pre('save', async function (next) {
    next();
});

module.exports = mongoose.model('Designation',DesignationSchema);
