const repository = require('./repository');

this.getAll = async () => {
	return await repository.getAll();
}

this.create = async (bloodCenter) => {
	return await repository.create(bloodCenter);
}

module.exports = this;
