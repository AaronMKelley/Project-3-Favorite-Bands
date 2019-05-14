
var mysql = require("mysql");
var express = require("express");
var bcrypt = require("bcryptjs");
var app = express();
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var session = require("express-session");
var cookieParser = require("cookie-parser")


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

connection.connect(function () {
	console.log(connection.threadId)
})

app.get('/', function (req, res) {
	res.render('pages/index')
})

function seatGeek(){

axios({
	method:'GET',
	url: `https://api.seatgeek.com/2/venues?postal_code=${zip}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
	responseType:'JSON'
})
.then(function(response){
	for (var i=0;i<response.length;i++){
		console.log(response.data)
	}
})
.catch(function (error) {
	console.log(error);
})}




app.listen(3000, function () {
	console.log("listening on 3000");
})