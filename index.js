var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var MongoClient = require("mongodb").MongoClient;
var path = require("path");
var cors = require("cors");
var request = require('request');
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccount.json');

var students = require("./studentsApi");

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v2";

var dbFileName = __dirname + "/students.db";


var app = express();



//PROXY MARIA SOLIS DIAGO                          
app.use("/proxyMS", function(req, res) {
  var url = "https://sos1718-09.herokuapp.com" + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});



app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname + "/public")));
app.use(cors());

//###########################################################################################################################//

//--------------------Maria--------------------//

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),

});

var db = admin.firestore();
students.register(app, db);

app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
 
 
console.log("Server setting up...");
