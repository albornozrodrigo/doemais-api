const model = require('./model');

this.getAll = async () => {
	try {
		return await model.find();
	} catch(error) {
		return {
			success: false,
			status: 400,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

this.getMyCampaigns = async (user) => {
	try {
		return await model.find({ "user": user._id });
	} catch(error) {
		return {
			success: false,
			status: 400,
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
	} catch(error) {
		return {
			success: false,
			status: 400,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

this.create = async (campaign) => {
	try {
		return await model.create(campaign);
	} catch(error) {
		return {
			success: false,
			status: 400,
			message: 'Ocorreu um erro ao inserir os dados, por favor tente novamente.'
		}
	}
}

this.update = async (campaign) => {
	try {
		return await model.update(campaign);
	} catch(error) {
		return {
			success: false,
			status: 400,
			message: 'Ocorreu um erro ao atualizar os dados, por favor tente novamente.'
		}
	}
}

this.enjoy = async (campaignId, userId) => {
	try {
		return await model.update({ "_id": campaignId }, {
			"$addToSet": { donors: userId }
		});
	} catch(error) {
		return {
			success: false,
			status: 400,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

this.delete = async (id) => {
	try {
		return await model.findOne({ "_id": id }).remove().exec();
	} catch(error) {
		return {
			success: false,
			status: 400,
			message: 'Ocorreu um erro, por favor tente novamente.'
		}
	}
}

module.exports = this;
