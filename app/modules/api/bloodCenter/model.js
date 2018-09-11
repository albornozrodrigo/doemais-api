const mongoose = require('mongoose');

const BloodCenter = new mongoose.Schema({
	unity: { type: String, required: true },
	operation: { type: String, required: false },
	telephone: { type: [String], required: false },
	website: { type: String, required: false },
	parking: { type: String, required: false },
	address: {
		street: {
			name: { type: String, required: false },
			number: { type: String, required: false },
			complement: { type: String, required: false },
			neighborhood: { type: String, required: false },
			cep: { type: String, required: false }
		},
		state: {
			name: { type: String, required: false },
			initials: { type: String, required: false },
			city: { type: String, required: false }
		},
		location: {
			type: { type: String, required: false, enum: "Point", default: "Point" },
			coordinates: { type: [Number], default: [0,0], required: false }
		}
	}
}, { collection: 'bloodCenter' });

BloodCenter.index({ "address.location": "2dsphere" });

module.exports = mongoose.model('bloodCenter', BloodCenter);
