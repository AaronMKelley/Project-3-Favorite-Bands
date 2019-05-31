let venues = [];
	
	// app.post('/zip',function(req,res){
	
	axios({

		method: 'GET',
		url: `https://api.seatgeek.com/2/venues?postal_code=${zip}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
		responseType: 'JSON'
	})
	.then(function (response) {
		// res.send(response.data)
		// console.log(response.data.venues);
		venues = response.data.venues;

		for (var i = 0; i < venues.length; i++) {
			// console.log(venues[i].name);
			var venueId = venues[i].id;

			axios({
				method: 'GET',
				url: `https://api.seatgeek.com/2/events?taxonomies.name=concert&venue.id=${venueId}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
				responseType: 'JSON'
			})
				.then(function (response) {
					// console.log(response.data.events);
					for (var j = 0; j < response.data.events.length; j++) {
						var performers = response.data.events[j].performers;
						
						for (var k = 0; k < performers.length; k++) {
							var artist = performers[k].name;
							// console.log(artist);
							axios({

								method: 'GET',
								url: "https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1",
								headers: {
									"Authorization": "Bearer BQBxIi8vornv6gdy3WXYYNpqOEx3mamXOzv1FUltQhFPvFctISFuRDRn2RGRyM_cV2LmWVksnwBKIMxOQTypowq9fdTD730AqyxAb_Yj3ueG3Uvhrku1Mv07WCuhnsuXNlujqAH4FCblQB6YrA"
								},
								responseType: 'JSON'
							})
							.then(function (response) {
								console.log(response.data.artists);
							})
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	})
	.catch(function (error) {
		console.log(error);
	})
