const service = require('./service');

this.getAll = async (req, res) => {
	await service.getAll().then(data => {
		res.json(data);
	});
}

this.create = async (req, res) => {
	await service.create(req.body).then(data => {
		res.json(data);
	});
}

this.calculateDistance = async (req, res) => {
	await service.calculateDistance().then(data => {
		res.json(data);
	});
}

this.login = async (req, res) => {
	await service.login(req.body).then(data => {
		res.json(data);
	});
}

this.me = (req, res) => {
	return res.json(req.authUser);
}

module.exports = this;
