const repository = require('./repository');

this.getAll = async () => {
	return await repository.getAll();
}

this.getByGeolocation = async (body) => {
	const coordinates = body.coordinates;
	const distance = body.distance;
	return await repository.getByGeolocation(coordinates, distance);
	// .then(data => {
	// 	return data.map(item => {
	// 		item.distanceBetween = harversineDistance(coordinates.lat, coordinates.lng, item.address.location[1], item.address.location[0]);
	// 		return item;
	// 	});
	// });
}

this.create = async (bloodCenter) => {
	return await repository.create(bloodCenter);
}

const deg2rad = (degrees) => {
	return degrees * Math.PI / 180;
}

const harversineDistance = (lat1, lng1, lat2, lng2, unit = 'km') => {
	let latd = deg2rad(lat2 - lat1);
	let lngd = deg2rad(lng2 - lng1);
	let a = Math.sin(latd / 2) * Math.sin(latd / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(lngd / 2) * Math.sin(lngd / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	let radius = (unit === 'km') ? 6371.009 : 3958.761; // miles

	return Math.round(radius * c, 3);
}

module.exports = this;
