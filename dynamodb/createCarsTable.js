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

var dynamodb = new AWS.DynamoDB();
var params = {
    TableName : "Cars",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "N" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
