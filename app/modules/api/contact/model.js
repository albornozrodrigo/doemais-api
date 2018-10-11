const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	subject: { type: String, required: true },
	message: { type: String, required: true }
}, { collection: 'Contact' });

Contact.index({ "address.location": "2dsphere" });

module.exports = mongoose.model('Contact', Contact);
