
var express = require("express"),
    bodyParser = require("body-parser"),
    request = require("request");


var PORT = process.env.PORT || 3000;
var app = express();


// const URL = 'https://byabbe.se/on-this-day/1/7/events.json'

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public/'));

app.get("/", function (req, res) {

    res.render("home");


});



app.post('/on-this-day', function (req, res) {

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
                for(var j = 0; j < data.events[i].wikipedia.length; j++){
                    sources.push({
                        title: data.events[i].wikipedia[j].title,
                        wikipedia: data.events[i].wikipedia[j].wikipedia
                    });
                }
                console.log(arrayOfEvents[i].amount)

            }

            res.render("show", { dataObject: arrayOfEvents, sourceObject: sources });
        }
    })
})

app.get('/on-this-day/:month/:day', function (req, res) {
    res.send("we made it to the query page")
    console.log(req.params);

})










app.listen(PORT, function () {
    console.log('server successfully started on port ' + PORT);
});
