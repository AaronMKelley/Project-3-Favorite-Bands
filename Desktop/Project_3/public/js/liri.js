require("dotenv").config();
var fs = require('fs');
var request = require('request');
var axios = require('axios')
var moment = require('moment');



$('#enter').on('click',function(){
    event.preventDeault();
    var zip =$('#zipper').val().trim();

    $.ajax({
        url:`https://api.seatgeek.com/2/venues?postal_code=${zip}&client_id=MTY2Mjc3MDV8MTU1NzgwMjk5MC41OA`,
        method:"GET"
    }).then(function(response){
        console.log(zip)
        console.log(response)
    },
    function(x,error){
        console.log(error)
  });
});