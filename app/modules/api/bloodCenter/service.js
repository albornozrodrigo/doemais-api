const repository = require('./repository');

this.getAll = async () => {
	return await repository.getAll();
}

this.getByGeolocation = async (body) => {
	const coordinates = body.coordinates;
	const distance = body.distance;
	return await repository.getByGeolocation(coordinates, distance);
}

this.create = async (bloodCenter) => {
	return await repository.create(bloodCenter);
}

module.exports = this;
