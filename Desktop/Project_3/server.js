
var mysql = require("mysql");
var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var session = require("express-session");
var cookieParser = require("cookie-parser");
const axios = require('axios');


app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: "app", cookie: { maxAge: 1 * 1000 * 60 * 60 * 24 * 365 }, resave: true,
saveUninitialized: true }));
app.set('view engine', 'ejs');

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "password",
	database: "conventions_db"
});

admin_status = "false";

let zip = 94607;

connection.connect(function () {
	console.log(connection.threadId)
})

app.get('/', function (req, res) {
	res.render('pages/index')
})

function showFinder(zip){
	let venues = [];

	axios({
		method:'GET',
		url: `https://api.seatgeek.com/2/venues?postal_code=${zip}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
		responseType:'JSON'
	})
	.then(function(response){
		venues = response.data.venues;

		for (var i = 0; i < venues.length; i++){
			console.log(venues[i].name);
			var venueId = venues[i].id;

			axios({
				method:'GET',
				url: `https://api.seatgeek.com/2/events?taxonomies.name=concert&venue.id=${venueId}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
				responseType: 'JSON'
			})
			.then(function(response){
				console.log(response.data.events);
			})
			.catch(function (error) {
				console.log(error);
			})
		}
	})
	.catch(function (error) {
		console.log(error);
	})

}



showFinder(zip);
app.listen(3000, function () {
	console.log("listening on 3000");
})