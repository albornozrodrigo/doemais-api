const service = require('./service');

this.getAll = async (req, res) => {
	await service.getAll().then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.create = async (req, res) => {
	await service.create(req.body).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.updateMe = async (req, res) => {
	await service.update(req.userAuthenticated._id, req.body).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.calculateDistance = async (req, res) => {
	await service.calculateDistance().then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.login = async (req, res) => {
	await service.login(req.body).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.me = (req, res) => {
	return res.status(200).json(req.userAuthenticated);
}

module.exports = this;
