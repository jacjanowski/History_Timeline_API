
var express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request");


var PORT = process.env.PORT || 3000;
var app = express();


const URL = 'https://byabbe.se/on-this-day/1/7/events.json'

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));

var arrayOfEvents = [];
app.get("/", function (req, res) {

    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var eventLength = data.events.length;
            for (var i = 0; i < eventLength; i++) {
                arrayOfEvents.push({
                    date: data.date,
                    year: data.events[i].year,
                    description: data.events[i].description
                });

            }

            res.render("show", { dataObject: arrayOfEvents });
        }
    })



});










<<<<<<< HEAD
app.listen(PORT, function () {
    console.log('server successfully started on port ' + PORT);
});
=======

app.listen(PORT, function () {
    console.log('server successfully started on port ' + PORT);
});
>>>>>>> 483baef41c14a08a394ccc03a9c28525859dca3e
