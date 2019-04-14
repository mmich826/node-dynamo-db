var AWS = require("aws-sdk");
var fs = require('fs');

const config = require('../config/config');
const isDev = process.env.NODE_ENV !== 'production';
if (isDev) {
    console.log('isDev');
    AWS.config.update(config.aws_local_config);
} else {
    console.log('isProd');
    AWS.config.update(config.aws_remote_config);
}


var docClient = new AWS.DynamoDB.DocumentClient();
console.log("Importing Cars into DynamoDB. Please wait.");
var cars = JSON.parse(fs.readFileSync('carData.json', 'utf8'));
cars.forEach(function(car) {
    console.log(car)
    var params = {
        TableName: "Cars",
        Item: {
            "id": car.id,
            "type": car.type,
            "name": car.name,
            "manufacturer": car.manufacturer,
            "fuel_type": car.fuel_type,
            "description": car.description
        }
    };
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add Car", car.name, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", car.name);
        }
    });
});
