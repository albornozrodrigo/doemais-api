const userRepository = require('./repository');
const bloodCenterRepository = require('./repository');
const bcrypt = require('bcrypt');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');

this.getAll = async () => {
	return await userRepository.getAll();
}

this.create = async (user) => {
	let unhashedPassword = user.password;
	user.password = bcrypt.hashSync(user.password, 10);
	await userRepository.create(user);
	return await this.login({
		email: user.email,
		password: unhashedPassword
	});
}

this.update = async (id, user) => {
	return await userRepository.update(id, {
		name: user.name,
		email: user.email,
		bloodType: user.bloodType
	});
}

this.login = async (data) => {
	// find the user
	return await userRepository.login(data).then(user => {
		if(!user) {
			return {
				success: false,
				status: 401,
				message: 'Authentication failed. User not found.'
			}
		} else if(user) {
			// check if password matches
			if(!bcrypt.compareSync(data.password, user.password)) {
				return {
					success: false,
					status: 401,
					message: 'Authentication failed. Wrong password.'
				}
			} else {
				// if user is found and password is right
				// create a token with only our given payload
				// we don't want to pass in the entire user since that has the password
				const payload = {
					_id: user._id,
					name: user.name,
					email: user.email,
					bloodType: user.bloodType || null,
					location: user.location
				}

				let token = jwt.sign(payload, config.secret, {
					expiresIn: '365d'
				});

				// return the information including token as JSON
				return {
					success: true,
					status: 200,
					token: token,
					user: payload
				}
			}
		}
	});
}

module.exports = this;
