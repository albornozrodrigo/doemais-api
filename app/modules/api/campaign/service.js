const repository = require('./repository');

this.getAll = async () => {
	return await repository.getAll();
}

this.getMyCampaigns = async (user) => {
	return await repository.getMyCampaigns(user);
}

this.getByGeolocation = async (body, userAuthenticated) => {
	const coordinates = body.coordinates || [];
	const distance = body.distance || 15;
	let canDonateTo;

	switch(userAuthenticated.bloodType) {
		case 'A+': {
			canDonateTo = ['A+', 'AB+'];
		}
		case 'A-': {
			canDonateTo = ['A+', 'A-', 'AB+', 'AB-'];
		}
		case 'B+': {
			canDonateTo = ['B+', 'AB+'];
		}
		case 'B-': {
			canDonateTo = ['B+', 'B-', 'AB+', 'AB-'];
		}
		case 'AB+': {
			canDonateTo = ['B+', 'B-', 'AB+', 'AB-'];
		}
		case 'AB-': {
			canDonateTo = ['AB+', 'AB-'];
		}
		case 'O+': {
			canDonateTo = ['A+', 'B+', 'AB+', 'O+'];
		}
		case 'O-': {
			canDonateTo = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
		}
	}

	return await repository.getByGeolocation(coordinates, distance, userAuthenticated._id, canDonateTo);
}

this.create = async (campaign, userAuthenticated) => {
	campaign.user = userAuthenticated._id;
	return await repository.create(campaign);
}

this.update = async (campaign) => {
	return await repository.update(campaign);
}

this.enjoy = async (campaignId, userId) => {
	return await repository.enjoy(campaignId, userId);
}

this.delete = async (id) => {
	return await repository.delete(id);
}

module.exports = this;
