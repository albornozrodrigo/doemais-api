const repository = require('./repository');

this.create = async (data) => {
	return await repository.create(data);
}

module.exports = this;
