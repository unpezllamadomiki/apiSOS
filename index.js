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


var initialStudents = [{ "province": "sevilla", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30493 },
    { "province": "cadiz", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10766 },
    { "province": "sevilla", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66325 },
    { "province": "granada", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54024 },
    { "province": "granada", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22905 },
    { "province": "granada", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44405 }

];




//###########################################################################################################################//

//--------------------Maria--------------------//

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sosapi-cf2e0.firebaseio.com'

});

var db = admin.database();
//students.register(app, db);

/*app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
 */
 
app.get(BASE_API_PATH + "/students-an/prueba", (req, res) => {
        console.log("Load initial data");
        res.sendStatus(200);
        /*db.find({}, (err, students) => {
            if (err) {
                console.error(" Error accesing DB");
                process.exit(1);
                return;
            }
            db.find({}).toArray((err, students) => {
                if (students.length == 0) {
                    console.log("Empty DB");
                    db.insert(initialStudents);
                    res.sendStatus(201);

                }
                else {
                    console.log("DB initialized with " + students.length + " students");
                    res.sendStatus(200);
                }

            });
        });*/

        /*db.ref('/students-an/students').once('value').then(function(snapshot) {
            var noexists = (snapshot.val() == null);
            if (noexists) {
                console.log("Empty DB");
                var usersRef = ref2.child("students-an");
                usersRef.set({initialStudents});
                res.sendStatus(201);
            }else{
                var usersRef = ref2.child("students-an");
                console.log("DB initialized");
                res.sendStatus(200);
                
            }

        });*/
    });

console.log("Server setting up...");
