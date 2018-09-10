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

this.login = async (req, res) => {
	//
}

module.exports = this;
