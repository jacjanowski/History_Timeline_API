
var express    = require("express"),
    bodyParser = require("body-parser"),
    request	   = require("request");


var PORT = process.env.PORT || 3000;
var app = express();


const URL = 'https://byabbe.se/on-this-day/1/3/events.json'

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public/'));

app.get("/", function(req,res){

    request(URL, function(err, res, body){
        if(!err && res.statusCode == 200){
            var data = JSON.parse(body);
            console.log("----------------------------------")
            console.log(data.events[0].description)
        }
    })



	res.render("show")
});











app.listen(PORT,function(){
    console.log('server successfully started on port '+PORT);
});