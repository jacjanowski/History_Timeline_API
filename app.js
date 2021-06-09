var express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request");


var PORT = process.env.PORT || 3000;
var app = express();




app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));

app.get("/", function (req, res) {

    res.render("home");


});



app.post('/on-this-day/events', function (req, res) {

    var URL = 'https://byabbe.se/on-this-day/' + req.body.month + "/" + req.body.day + "/events.json";
    console.log("URL is: " + URL);

    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var arrayOfEvents = [];
            var sources = [];
            var data = JSON.parse(body);
            var eventLength = data.events.length;
            for (var i = 0; i < eventLength; i++) {
                arrayOfEvents.push({
                    date: data.date,
                    year: data.events[i].year,
                    description: data.events[i].description,
                    amount: data.events[i].wikipedia.length
                });
                for (var j = 0; j < data.events[i].wikipedia.length; j++) {
                    sources.push({
                        title: data.events[i].wikipedia[j].title,
                        wikipedia: data.events[i].wikipedia[j].wikipedia
                    });
                }


            }

            res.render("show", { dataObject: arrayOfEvents, sourceObject: sources });
        }
    })
})

app.post('/on-this-day/births', function (req, res) {
    var URL = 'https://byabbe.se/on-this-day/' + req.body.month + "/" + req.body.day + "/births.json";
    console.log("URL is: " + URL);

    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var arrayOfEvents = [];
            var sources = [];
            var data = JSON.parse(body);
            var eventLength = data.births.length;
            for (var i = 0; i < eventLength; i++) {
                arrayOfEvents.push({
                    date: data.date,
                    year: data.births[i].year,
                    description: data.births[i].description,
                    amount: data.births[i].wikipedia.length
                });
                for (var j = 0; j < data.births[i].wikipedia.length; j++) {
                    sources.push({
                        title: data.births[i].wikipedia[j].title,
                        wikipedia: data.births[i].wikipedia[j].wikipedia
                    });
                }


            }

            res.render("births", { dataObject: arrayOfEvents, sourceObject: sources });
        }
    })

})

app.post('/on-this-day/deaths', function (req, res) {
    var URL = 'https://byabbe.se/on-this-day/' + req.body.month + "/" + req.body.day + "/deaths.json";
    console.log("URL is: " + URL);

    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var arrayOfEvents = [];
            var sources = [];
            var data = JSON.parse(body);
            var eventLength = data.deaths.length;
            for (var i = 0; i < eventLength; i++) {
                arrayOfEvents.push({
                    date: data.date,
                    year: data.deaths[i].year,
                    description: data.deaths[i].description,
                    amount: data.deaths[i].wikipedia.length
                });
                for (var j = 0; j < data.deaths[i].wikipedia.length; j++) {
                    sources.push({
                        title: data.deaths[i].wikipedia[j].title,
                        wikipedia: data.deaths[i].wikipedia[j].wikipedia
                    });
                }


            }

            res.render("deaths", { dataObject: arrayOfEvents, sourceObject: sources });
        }
    })

})

app.get('/on-this-day/:month/:day', function (req, res) {
    res.send("we made it to the query page")
    console.log(req.params);

})










app.listen(PORT, "0.0.0.0", function () {
    console.log("Listening on Port 3000");
});