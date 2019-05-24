
var mysql = require("mysql");
var express = require("express");
var bcrypt = require("bcryptjs");
var logger = require("morgan");
var app = express();
var methodOverride = require('method-override')
var bodyParser = require('body-parser');

const axios = require('axios');
var jwt = require('jsonwebtoken');


var PORT = process.env.PORT || 3001


app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "company_db"
});


connection.connect(function () {
	console.log(connection.threadId)
})

require('dotenv').config()


app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	next();
});


function verifyToken(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token.process.env.JWT_Secret, (err, decod) => {
			if (err) {
				res.status(403).json({
					message: "wrong token"
				})
			} else {
				req.deconded = decod;
				next();  // a react function 
			}
		})
	} else {
		res.status(403).josn({
			message: "No Token"
		});
	}
}

app.get('/', function (req, res) {
	res.send('routes available: login : post -> /login, signup : post -> /signup, get all the venues: get -> /venues, get one venue: get -> /venue/:id, deleting a artist: post -> /artist/:id, adding a artist: post -> /artist');
});

app.post('/login', function (req, res) {
	connection.query('SELECT id, email, password_hash FROM users WHERE email= ? LIMIT 1',[req.body.email],
	 function (error, result) {
		 console.log(error)
		 console.log(result)
		if (!result) return res.status(404).json({ error: 'user not found' });

		if (!bcrypt.compareSync(req.body.password_hash, result[0].password_hash)) return res.status(401).json({ error: 'incorrect password' });

		var payload = {
			_id: result[0].id,
			email: result[0].email,
		};

		var token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6h' });

		return res.json({
			message: 'successfully authenticated',
			token: token,
			sign_in: true, 
		});

	});
});






app.post('/signup', function (req, res) {
	connection.query("SELECT email FROM users WHERE email = ? LIMIT 1", [req.body.email],
		function (error, result) {
			console.log(result)
			if (result.length>0) return res.status(406).json({ error: 'user already exists' });
console.log(req.body)

console.log(error)
			if (!req.body.password_hash) return res.status(401).json({ error: 'you need a password' });

			if (req.body.password_hash.legnth <= 5) return res.status(401).json({ error: 'password length must be greater than five.' });

			console.log('got to line')

			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(req.body.password_hash, salt, function (err, hash) {
					connection.query("INSERT INTO users (email,password_hash,profile_photo,spotify_playlist_link) VALUES (?,?,?,?)", [req.body.email, hash, req.body.profile_picture, req.body.spotify_playlist_link],
						function (error, results) {
							console.log('got to line')

							if (error) {
								res.send(error);
							} else {
								res.json({
									message: "sucessfully signed up",
									sign_up: false,
								});
							}
						})
				})
			})
		})
})










// 	// API call to get data from SeatGeek. 

// function showFinder(zip) {


	let venues = [];
// app.post('/zip',function(req,res){
	let zip=94102
	axios({
	
		method: 'GET',
		url: `https://api.seatgeek.com/2/venues?postal_code=${zip}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
		responseType: 'JSON'
	})
		.then(function (response) {
			console.log(response.data)
			venues = response.data.venues;

			// for (var i = 0; i < venues.length; i++) {
			// 	console.log(venues[i].name);
			// 	var venueId = venues[i].id;

			// 	axios({
			// 		method: 'GET',
			// 		url: `https://api.seatgeek.com/2/events?taxonomies.name=concert&venue.id=${venueId}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
			// 		responseType: 'JSON'
			// 	})
			// 		.then(function (response) {
			// 			console.log(response.data.events);
			// 		})
			// 		.catch(function (error) {
			// 			console.log(error);
			// 		})
			// }
		})
		.catch(function (error) {
			console.log(error);
		})

// })
	
// }

// showFinder(zip);

app.listen(PORT, function () {
	console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});