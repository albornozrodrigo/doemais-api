const model = require('./model');

this.getAll = async () => {
	try {
		return await model.find();
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

this.getMyCampaigns = async (user) => {
	try {
		return await model.find({ "user": user._id });
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

this.getByGeolocation = async (coordinates, distance, userId, canDonateTo) => {
	try {
		return await model.find({
			"user": { "$ne": userId },
			"bloodType": { "$in": canDonateTo },
			"address.location": {
				"$near": {
					"$geometry":{
						"type": "Point",
						"coordinates": [coordinates.lng, coordinates.lat]
					},
					"$maxDistance": distance * 1000
				}
			}
		});
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

this.create = async (campaign) => {
	try {
		return await model.create(campaign);
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro ao inserir os dados, por favor tente novamente.'
		}
	}
}

this.update = async (campaign) => {
	try {
		return await model.update(campaign);
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro ao atualizar os dados, por favor tente novamente.'
		}
	}
}

this.enjoy = async (campaignId, userId) => {
	try {
		console.log(campaignId, userId)
		return await model.update({ "_id": campaignId }, {
			"$push": { donors: userId }
		}, done);
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

this.delete = async (id) => {
	try {
		return await model.findOne({ "_id": id }).remove().exec();
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

module.exports = this;
