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
        res ? logFunctionCall('/version', "was successfully sent") : logFunctionCall('/version', "FAILED to send");
        res.send('This is version 1 of the HotBurger service\n');
});

// Retrieves a list of menu items
app.get('/getmenu', function (req, res) {
        res.render('menu', {});
});

// Posts the order and quantity
app.post('/purchase', function(req, res) {
        if(isNaN(req.body.quantity)){
                res.send("Not a valid quantity... " + "<a href='/getmenu'>Return</a>")
        } else {
                res.send("You purchased " + req.body.quantity + " " + req.body.item + "(s)");
        }        
});

// app.get('/logs', async function(req, res) {
//         // If a result was successfully sent, write to the log (await) before reading from it
//         res ? await logFunctionCall('/logs') : resultFailed('/logs');
//         fs.readFile("./logs/logfile.txt", function(err, buf) {
//                 err ? res.send("Failed to read file when calling the /logs route") : res.send(buf.toString());
//         });
// });

// Logs function calls and indicates whether a result was succesful or not
function logFunctionCall(route, resultSuccess) {
        return new Promise((resolve) => {
                fs.appendFile('./logs/logfile.txt', `${route} route was called.  The result ${resultSuccess}\n`, "utf8", (err) => {
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