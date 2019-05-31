export const _artists = (zip) => {
	console.log(zip)
	return fetch(`https://api.seatgeek.com/2/venues?postal_code=${zip}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`, {
		method: 'GET',
		// repsonseType: 'JSON',
		headers: {
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json'
		},

		//  body: JSON.stringify({zip})
	})
		.then(r => r.json())
		.then(function (response) {
			console.log(response.venues)

			let venues = response.venues

			for (let i = 0; i < venues.length; i++) {
				console.log(venues[i].name);
				var venueId = venues[i].id;
			}

			return fetch(`https://api.seatgeek.com/2/events?taxonomies.name=concert&venue.id=${venueId}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`, {
				method: 'GET',
			})
		})
		.then(r => r.json())
		.then(function (response) {
			console.log(response.events)
			let events = response.events
			let artists =[];
			for (let j = 0; j < events.length; j++) {
                console.log(events[j].title)
                let performers = events[j].performers;

                for (let k = 0; k < performers.length; k++) {
                    artists.push(performers[k].name);
                }

			}
			return  artists;
		})


		.catch(function (error) {
			console.log(error)
		})
}