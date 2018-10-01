const model = require('./model');

this.getAll = async () => {
	try {
		return await model.find();
	} catch(err) {
		console.log(err);
		err.error = true;
		return err;
	}
}

this.getMyCampaigns = async (user) => {
	try {
		return await model.find({ "user": user._id });
	} catch(err) {
		console.log(err);
		err.error = true;
		return err;
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
		err.error = true;
		return err;
	}
}

this.create = async (campaign) => {
	try {
		return await model.create(campaign);
	} catch(err) {
		console.log(err);
		err.error = true;
        err.errorMessage = 'Erro ao inserir os dados, verifique os campos e tente novamente.';
        return err;
	}
}

this.update = async (campaign) => {
	try {
		return await model.update(campaign);
	} catch(err) {
		console.log(err);
		err.error = true;
        err.errorMessage = 'Erro ao atualizar os dados, verifique os campos e tente novamente.';
        return err;
	}
}

this.delete = async (id) => {
	try {
		return await model.findOne({ "_id": id }).remove().exec();
	} catch(err) {
		console.log(err);
		err.error = true;
        err.errorMessage = 'Erro ao deletar os dados, verifique os campos e tente novamente.';
        return err;
	}
}

module.exports = this;
