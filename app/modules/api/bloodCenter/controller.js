const service = require('./service');

this.getAll = async (req, res) => {
	const body = req.body.coordinates || {};
	console.log(req.body);
	await service.getAll(body).then(data => {
		res.json(data);
	});
}

this.create = async (req, res) => {
	await service.create(req.body).then(data => {
		res.json(data);
	});
}

module.exports = this;
