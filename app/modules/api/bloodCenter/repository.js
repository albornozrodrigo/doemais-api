const model = require('./model');

this.getAll = async () => {
	try {
		return await model.find();
	} catch(error) {
		return {
			success: false,
			status: 401,
			message: 'Erro ao buscar os dados, por favor tente novamente.'
		}
	}
}

this.getByGeolocation = async (coordinates, distance) => {
	try {
		return await model.find({
			"address.location": {
				"$near": {
					"$geometry":{
						"type": "Point",
						"coordinates": [ coordinates.lng, coordinates.lat ]
					},
					"$maxDistance": distance * 1000
				}
			}
		});
	} catch(error) {
		return {
			success: false,
			status: 401,
			message: 'Erro ao buscar os dados, por favor tente novamente.'
		}
	}
}

this.create = async (bloodCenter) => {
	try {
		return await model.create(bloodCenter);
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Ocorreu um erro ao inserir os dados, por favor tente novamente.'
		}
	}
}

module.exports = this;
