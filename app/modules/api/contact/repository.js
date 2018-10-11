const model = require('./model');

this.create = async (data) => {
	try {
		return await model.create(data);
	} catch(error) {
		return {
			success: false,
			status: 400,
			message: 'Ocorreu um erro ao inserir os dados, por favor tente novamente.'
		}
	}
}

module.exports = this;
