const model = require('./model');

this.create = async (user) => {
	try {
		return await model.create(user);
	} catch(err) {
		err.error = true;
		err.errorMessage = 'Erro na criação do usuário, verifique os campos e tente novamente.'

		if(err.code === 11000) {
			err = {};
			err.error = true;
			err.errorMessage = 'Já existe uma conta criada com esse e-mail!'
		}

		return err;
	}
}

this.update = async (id, user) => {
	try {
		return await model.update({ "_id": id }, {
			"$set": {
				name: user.name,
				email: user.email,
				password: user.password,
				bloodType: user.bloodType
			}
		});
	} catch(err) {
		err.error = true;
		err.errorMessage = 'Erro na criação do usuário, verifique os campos e tente novamente.'

		if(err.code === 11000) {
			err = {};
			err.error = true;
			err.errorMessage = 'Já existe uma conta criada com esse e-mail!'
		}

		return err;
	}
}

this.getAll = async () => {
	try {
		return await model.find();
	} catch(err) {
		err.error = true;
		return err;
	}
}

this.login = async (user, callback) => {
	try {
		return model.findOne({ email: user.email });
	} catch(err) {
		err.error = true;
		return err;
	}
}

module.exports = this;
