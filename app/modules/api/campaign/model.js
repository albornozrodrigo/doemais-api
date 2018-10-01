const mongoose = require('mongoose');

const Campaign = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
    donors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false }],
    description: { type: String, required: true },
    bloodType: { type: String, required: true },
	creationDate: { type: Date, required: true, default: Date.now },
	bloodCenterName: { type: String, required: true },
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
}, { collection: 'campaign' });

Campaign.index({ "address.location": "2dsphere" });

module.exports = mongoose.model('campaign', Campaign);
