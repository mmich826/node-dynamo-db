https://medium.com/quick-code/node-js-restful-api-with-dynamodb-local-7e342a934a24   Cars example

https://medium.com/@Keithweaver_/using-aws-dynamodb-using-node-js-fd17cf1724e0   -   Fruit

https://github.com/keithweaver/MERN-boilerplate/tree/master-w-dynamodb  - Github MEAN stack project



Start DynamoDB:
cd /Users/michaelmichalak/repos/misc/DynamoDBLocal_lib
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb


Useful dynamodb CLI cmds:
 aws dynamodb delete-table --table-name Cars
 aws dynamodb list-tables --endpoint-url http://localhost:8000 --profile XXXXX --region us-east-1
 aws dynamodb list-tables --endpoint-url http://localhost:8000 --profile XXXXXX --region us-east-1b
 aws dynamodb delete-table --table-name Cars --profile XXXXX --region us-east-1
 aws dynamodb delete-table --table-name Cars --profile carsDb --region us-east-1
 aws dynamodb delete-table --table-name Cars --profile carsDb --region us-east-1 --endpoint-url http://localhost:8000


Urls hitting service:
http://localhost:3000/cars  GET
http://localhost:3000/cars/car  POST
    x-www-form-urlencoded
        name:Honda Cvic
        manufacturer:Honda
        type:automatic
