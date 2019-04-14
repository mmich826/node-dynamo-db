var AWS = require("aws-sdk");
const config = require('../config/config');
const isDev = process.env.NODE_ENV !== 'production';

// AWS.config.update({
//     region: "us-east-1",
//     endpoint: "http://localhost:8000"
// });
if (isDev) {
    console.log('isDev');
    AWS.config.update(config.aws_local_config);
} else {
    console.log('isProd');
    AWS.config.update(config.aws_remote_config);
}

var docClient = new AWS.DynamoDB.DocumentClient()
var table = "Cars";
var id = 4;
var params = {
    TableName: table,
    Key:{
        "id": id
    }
};
// docClient.get(params, function(err, data) {
//     if (err) {
//         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });

docClient.scan(params, scanCB);
function scanCB(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the Cars
        console.log("Scan succeeded.");
        data.Items.forEach(function(car) {
            console.log(car.id, car.type, car.name)
        });
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, scanCB);
        }
    }
}
