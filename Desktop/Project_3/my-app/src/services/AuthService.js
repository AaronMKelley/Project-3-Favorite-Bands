export const _signUp = (email, password_hash, profile_picture, spotify_playlist_link) => {
	return fetch("http://localhost:3001/signup", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password_hash, profile_picture, spotify_playlist_link })
	}).then(res => res.json())
}

export const _login = (email, password_hash) => {
	console.log(email)
	return fetch("http://localhost:3001/login", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password_hash })
	}).then(res => res.json())
}


// PUT IN AXIOS CALL IN HERE. 

export const _zipCode = (zip) => {
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
			let title =[];
			for (let j = 0; j < events.length; j++) {
				console.log(events[j].title)

				title.push(events[j].title)

			}
			return  title
		})


		.catch(function (error) {
			console.log(error)
		})
}




// export const _zipCode = ({zip}) => {
// 	console.log(zip)
// 	return fetch("http://localhost:3001/zip",{
// 		method: 'POST',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type':'application/json'
// 		},
// 		body: JSON.stringify({zip})
// 	}).then(function(response){
// 		console.log(response)
// 		console.log(response)

// 	})
// 	.catch(function (error){
// 		console.log(error)
// 	})
// }