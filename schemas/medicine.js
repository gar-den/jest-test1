const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model("Medicine", MedicineSchema);