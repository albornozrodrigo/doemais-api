const repository = require('./repository');
const bcrypt = require('bcrypt');

this.getAll = async () => {
	return await repository.getAll();
}

this.create = async (user) => {
	user.password = bcrypt.hashSync(user.password, 10);
	return await repository.create(user);
}

module.exports = this;
