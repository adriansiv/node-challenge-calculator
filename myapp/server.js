var express = require('express');
var app = express();

const myLogger = (req, res, next) => {
    const visitTime = new Date();
    console.log(`visited ${req.url} at ${visitTime.toLocaleString()}`);
    next();
};

app.use(myLogger);

app.get("/:operation", function(req, res) {
    const operation = req.params.operation;
    const value1 = parseFloat(req.query.val1);
    const value2 = parseFloat(req.query.val2);
    const result = switchOperation(operation, value1, value2);

    res.send(result.toString());
});

app.get("/:operation/:val1/:val2", function(req, res) {
    const operation = req.params.operation;
    const value1 = parseFloat(req.params.val1);
    const value2 = parseFloat(req.params.val2);
    const result = switchOperation(operation, value1, value2);

    res.send(result.toString());
});

function switchOperation(operation, value1, value2) {
    let result;

    switch (operation) {
        case ("add"):
            result = value1 + value2;
            break;
        case ("substract"):
            result = value1 - value2;
            break;
        case ("multiply"):
            result = value1 * value2;
            break
        case ("divide"):
            result = value1 / value2;
            break;
        default: 
            result = "¡No existe!";
    };

    return result;
}

const port = 3020;

app.listen(port, function() {
  console.log("This is my port " + port);
});