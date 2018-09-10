import User from './user.model';

export async function createUser(user) {
	try {
		user = new User(user);
		return await user.save();
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

export async function getUsers() {
	try {
		return await User.find();
	} catch(err) {
		err.error = true;
		return err;
	}
}
