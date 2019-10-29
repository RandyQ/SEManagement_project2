const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get('/', function(req, res) {
        res.send("This is the home page\n");
});

// Version of software
app.get('/version', function (req, res) {
        // If a result was successfully sent
        res ? logFunctionCall('/version', "SUCCESSFULLY sent") : logFunctionCall('/version', "FAILED to send");
        res.send('This is version 1 of the HotBurger service\n');
});

// Retrieves a list of menu items
app.get('/getmenu', function (req, res) {
        res ? logFunctionCall("/getmenu", "SUCCESSFULLY sent") : logFunctionCall("/getmenu", "FAILED to send");
        res.render('menu', {});
});

// Posts the order and quantity
app.post('/purchase', function(req, res) {
        if(isNaN(req.body.quantity)){
                res.send("Not a valid quantity... " + "<a href='/getmenu'>Return</a>")
        } else {
                res ? logFunctionCall("/purchase", "SUCCESSFULLY sent") : logFunctionCall("/purchase", "FAILED to send");
                logOrder(req.body.item.toLowerCase(), req.body.quantity, getPrice(req.body.item.toLowerCase()));
                res.send("You purchased " + req.body.quantity + " " + req.body.item + "(s)");
        }        
});

// Retrieves the price of @param 
function getPrice(item) {
        let price = 0;
        if (item === "hotdog") {
                price = 20;
        } 
        else if (item === "hamburger") {
                price = 35;
        }
        else if (item === "soda") {
                price = 4;
        }
        else if (item === "cookie"){
                price = 6;
        }

        return price;
}

// Logs the order item, quantity, and price
function logOrder(item, quantity, price) {
        fs.appendFile('./logs/logfile.txt', `Item: ${item} Quantity: ${quantity} Price: ${price}\n`, "utf8", (err) => {
                if (err) {
                        console.log(`ERROR: Log failed to write to file.`);
                }
        });
}

// Logs function calls and indicates whether a result was succesful or not
function logFunctionCall(route, resultSuccess) {
        let dateTime = new Date();
        let time = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
        return new Promise((resolve) => {
                fs.appendFile('./logs/logfile.txt', `${route} route was called.  The result ${resultSuccess}.  Time: ${time}\n`, "utf8", (err) => {
                        if (err) {
                                console.log(`ERROR: Log failed to write to file when calling the ${route} route`);
                        }

                        resolve();
                });
        });
}

// Error middleware
app.use(function(req, res, next) {
        res.status(404);
        res.send('404 – Not Found');
});

module.exports = app;