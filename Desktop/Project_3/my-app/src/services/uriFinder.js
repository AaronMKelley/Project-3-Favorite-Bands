// export const _uri = (artist) => {
//     return fetch("https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1", {
// 		method: 'GET',
		
// 		headers: {
// 			"Authorization": "Bearer BQBuO-kaxL-pxUneHu8P1MM2GVs5V2Qbc2zEAB6NB_wShkajK-_HNXCmzhUp8lSEzLo0-FTVSrIJ1nr9vAD_Zo0mXz-Vrgd5SxehHqF_mJ0oFu7a7YP356mux-F1PMG8-MvgPTUdeZ4xJCC1mg"
// 		},
// 		responseType: 'JSON'
//     })
//     .then(r => r.json())
//     .then(function (response) {
//         let uri = response.data.artists.items[0].uri.slice(15);
//         console.log(uri);
//         return uri;
//     })
// }
export const _uri = (artist) => {
    let encodedArtist = encodeURI(artist);
    return fetch(`/uri/${encodedArtist}`).then(res => res.json());
}

// export const _uri = (artist) => {
//     return fetch(`/uri/${artist}`)
//       .then(res => res.json())
//   }

// function uriFinder(artist) {
//     axios({

//         method: 'GET',
//         url: `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=1`,
//         headers: {
//             "Authorization": "Bearer BQB8kVLf3QttHUR9K38iOT6vJSY-WKZXKgdu7tDmfu4jBzcA3fLrgeJwO__1w4hyU4eHUrkp8kT_Nhc9ss_n3GSi1iKTaGnpaJKjNjqVUm5QGZetKLWyL5xZtQCIu9l04DR-UXOO0Hau_VUfsA"
//         },
//         responseType: 'JSON'
//     })
//     .then(function (response) {
//         console.log(response.data.artists.items[0].uri.slice(15));
//     })
// }

// console.log(uriFinder("Skrillex"));