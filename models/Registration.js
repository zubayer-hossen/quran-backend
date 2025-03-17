const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    surah: { type: String, required: false }, // Surah is optional now
    createdAt: { type: Date, default: Date.now },
});

// Create indexes for unique phone and email fields
RegistrationSchema.index({ phone: 1 }, { unique: true });
RegistrationSchema.index({ email: 1 }, { unique: true });

const Registration = mongoose.model("Registration", RegistrationSchema);

module.exports = Registration;
