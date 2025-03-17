const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true, unique: true }, // Unique index is already set here
    email: { type: String, required: true, unique: true }, // No need for explicit index()
    surah: { type: String, required: false }, // Surah is optional now
    createdAt: { type: Date, default: Date.now },
});

// ❌ REMOVE these lines (they cause duplicate indexes)
// RegistrationSchema.index({ phone: 1 }, { unique: true });
// RegistrationSchema.index({ email: 1 }, { unique: true });

// Prevent Mongoose model re-registration in hot reload environments
const Registration = mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);

module.exports = Registration;
