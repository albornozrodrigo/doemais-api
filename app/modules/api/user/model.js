const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creationDate: { type: Date, required: true, default: Date.now },
    bloodType: { type: String, required: false },
    points: { type: Number, default: 0, required: false },
    location: {
        type: { type: String, required: false, enum: "Point", default: "Point" },
        coordinates: { type: [Number], default: [0,0], required: false }
    }
}, { collection: 'user' });

User.index({ "location": "2dsphere" });

module.exports = mongoose.model('user', User);
