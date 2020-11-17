const ship = {
	max: 4,
	passengers: [],
	onBoard: function(name) {
		if (this.passengers.length === 4) {
			console.log(`This ship is full. ${name} can not board this ship.`);
		} else {
			this.passengers.push(name);
			console.log(`${name} boarded.`);
		}
	}
}

ship.onBoard('chloe');
ship.onBoard('jay');
ship.onBoard('david');
ship.onBoard('asher');
ship.onBoard('daniel');
console.log(ship.passengers);