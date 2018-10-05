const model = require('./model');

this.create = async (user) => {
	try {
		return await model.create(user);
	} catch(error) {
		console.log(error)
		let output;

		output = {
			success: false,
			status: 401,
			message: 'Erro na criação do usuário, verifique os campos e tente novamente.'
		}

		if(error.code === 11000) {
			output.message = 'Já existe uma conta criada com esse e-mail!'
		}

		return output;
	}
}

this.update = async (id, data) => {
	try {
		return await model.update({ "_id": id }, {
			"$set": data
		});
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Erro ao atualizar os dados, verifique os campos e tente novamente.'
		}
	}
}

this.getAll = async () => {
	try {
		return await model.find();
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Erro ao buscar os dados, por favor tente novamente.'
		}
	}
}

this.login = async (user, callback) => {
	try {
		return model.findOne({ email: user.email });
	} catch(err) {
		return {
			success: false,
			status: 401,
			message: 'Erro ao realizar o login, verifique os campos e tente novamente.'
		}
	}
}

module.exports = this;
