var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(function (req, res, next) {
    "use strict";
    // We need the following as you'll run HTML+JS+Ajax+jQuery on http://localhost, 
    // but service is taken from http://protoNNN.haaga-helia.fi (NNN is some number)
    // https://www.w3.org/TR/cors/#access-control-allow-origin-response-header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Above commands for setting up the required modules, settings and headers!!!
// At the bottom of this file is the server starting function!!!

// Now follow the action functions that register to handle certain URL patterns

// List Countries
app.get('/3000/Info/listCountries', function (req, res) {
    fs.readFile(__dirname + "/" + "Info/countries.json", 'utf8', function (err, data) {
        console.log("Data: "+data, "Err:" +err);   // ZZZZZ
        res.end(data);
    });
})



// Add country   GET
app.get('/3000/Info/addCountry', function (req, res) {
    var name = req.query.name;
    var population = req.query.population;
    console.log("Adding with GET - name: " + name + " population: " + population);   // ZZZZZ
    var returnValue = addCountry(name, population);
    res.writeHead(Number(returnValue.HttpStatusCode), { 'Content-Type': 'text/plain' });
    res.end(returnValue.HttpStatusCode + " " + returnValue.Message.toString());
})

// Add Country  POST
app.post('/3000/Info/addCountry', function (req, res) {
    var name = req.body.name;
    var population = req.body.population;
    console.log("Adding with POST - name: " + name + " population: " + population);   // ZZZZZ
    var returnValue = addCountry(name, population);
    res.writeHead(Number(returnValue.HttpStatusCode), { 'Content-Type': 'text/plain' });
    res.end(returnValue.HttpStatusCode + " " + returnValue.Message.toString());
})


function addCountry(name, population) {
    "use strict";
    var returnValue;
    if (!population) {
        returnValue = { "HttpStatusCode": "400", "Message": "Error: population cannot be missing!" };
    } else if (population < 0) {
        returnValue = { "HttpStatusCode": "400", "Message": "Error: population cannot be below zero!" };
    } else if (!name || name.length === 0) {
        returnValue = { "HttpStatusCode": "400", "Message": "Error: Name cannot be empty!" };
    } else {
        switch (name) {
            case 'Finland':
                returnValue = { "HttpStatusCode": "409", "Message": "Error: Finland already in database!" };
                break;
            case 'Pakistan':
                returnValue = { "HttpStatusCode": "500", "Message": "Error: Some server error inserting Pakistan!" };
                break;
            case 'Nepal':
                returnValue = { "HttpStatusCode": "502", "Message": "Error: Connection to secondary server could not be established for Nepal!" };
                break;
            case 'Mars':
                returnValue = { "HttpStatusCode": "503", "Message": "Error: Database not available for Mars!" };
                break;
            default:
                returnValue = { "HttpStatusCode": "200", "Message": name + ", " + population + " added OK!" };
                break;
        }
    }

    return returnValue;
}



var server = app.listen(3000, function () {
    "use strict";
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
