const service = require('./service');

this.getAll = async (req, res) => {
	await service.getAll().then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.getMyCampaigns = async (req, res) => {
	await service.getMyCampaigns(req.userAuthenticated).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.getByGeolocation = async (req, res) => {
	await service.getByGeolocation(req.body, req.userAuthenticated).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.create = async (req, res) => {
	await service.create(req.body, req.userAuthenticated).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.update = async (req, res) => {
	await service.update(req.body).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.enjoy = async (req, res) => {
	await service.enjoy(req.body.id, req.userAuthenticated._id).then(data => {
		res.status(data.status || 200).json(data);
	});
}

this.delete = async (req, res) => {
	await service.delete(req.params.id).then(data => {
		res.status(data.status || 200).json(data);
	});
}

module.exports = this;
