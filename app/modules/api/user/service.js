const userRepository = require('./repository');
const bloodCenterRepository = require('./repository');
const bcrypt = require('bcrypt');
const config = require('../../../config/config');
const jwt = require('jsonwebtoken');

this.getAll = async () => {
	return await userRepository.getAll();
}

this.create = async (user) => {
	user.password = bcrypt.hashSync(user.password, 10);
	return await userRepository.create(user);
}

this.login = async (data) => {
	// find the user
	return await userRepository.login(data).then(user => {
		if(!user) {
			return {
				success: false,
				message: 'Authentication failed. User not found.'
			}
		} else if(user) {
			// check if password matches
			if(bcrypt.hashSync(data.password, 10) === user.password) {
				return {
					success: false,
					message: 'Authentication failed. Wrong password.'
				}
			} else {
				console.log(user)
				// if user is found and password is right
				// create a token with only our given payload
				// we don't want to pass in the entire user since that has the password
				const payload = {
					_id: user._id,
					name: user.name,
					email: user.email,
					location: user.location
				}

				let token = jwt.sign(payload, config.secret, {
					expiresIn: (60 * 60 * 5) // expires in one week
				});

				// return the information including token as JSON
				return {
					success: true,
					token: token,
					user: payload
				}
			}
		}
	});
}

this.calculateDistance = async () => {

}

module.exports = this;
