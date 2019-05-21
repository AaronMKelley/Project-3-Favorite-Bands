export const _signUp = (email, password_hash,profile_picture,spotify_playlist_link) => {
	return fetch("http://localhost:3001/signup", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({email, password_hash,profile_picture,spotify_playlist_link})
	  }).then(res => res.json())
}

export const _login = (email, password_hash,picture,spotify) => {
	return fetch("http://localhost:3001/login", {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({email, password_hash,picture,spotify})
	  }).then(res => res.json())
}
