const fetch = require("node-fetch");

var MongoClient = require("mongodb").MongoClient;

//mongodb://localhost:27017/ MONGO LOCAL
var url =
  "mongodb+srv://adminMongo:admin1234@projet4-meteo-pollution.j48l1.mongodb.net/projet4-meteo-pollution-lb.j48l1.mongodb.net:27017";

// https://api.openweathermap.org/data/2.5/weather?q=Toulouse&lang=fr&units=metric&appid=4dd7bb5e8f098fcc8694f07327fc433f   meteo

// http://api.openweathermap.org/data/2.5/air_pollution?lat=43.599563&lon=1.418764&appid=4dd7bb5e8f098fcc8694f07327fc433f   pollution

//=================== Au lancement je drop database puis je recupere les données (car la recupération via la boucle se fait a la fin du premier temps de l'interval)

MongoClient.connect(url, function (err, db) {
  // Dropping the database

  db.db("meteo").dropDatabase();
  db.db("pollution").dropDatabase();

  console.log("Dropping successful");
});

setTimeout(function () {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Toulouse&lang=fr&units=metric&appid=4dd7bb5e8f098fcc8694f07327fc433f",
    { method: "GET" }
  )
    .then((reponse) => reponse.json())
    .then((json) => {
      console.log(json);

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("meteo");
        console.log("dbo : " + dbo);

        var myobj = json;
        console.log("myobj : " + myobj);

        dbo.collection("dataMeteo").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    });
}, 5000);

setTimeout(function () {
  fetch(
    "http://api.openweathermap.org/data/2.5/air_pollution?lat=43.599563&lon=1.418764&appid=4dd7bb5e8f098fcc8694f07327fc433f",
    { method: "GET" }
  )
    .then((reponse) => reponse.json())
    .then((json) => {
      console.log(json);

      MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("pollution");
        console.log("dbo : " + dbo);

        var myobj = json;
        console.log("myobj : " + myobj);

        dbo.collection("dataPollution").insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    });
}, 10000);

//====================== Interval de relance continue

setInterval(function () {
  MongoClient.connect(url, function (err, db) {
    // Dropping the database

    db.db("meteo").dropDatabase();
    db.db("pollution").dropDatabase();

    console.log("Dropping successful");
  });
  setTimeout(function () {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Toulouse&lang=fr&units=metric&appid=4dd7bb5e8f098fcc8694f07327fc433f",
      { method: "GET" }
    )
      .then((reponse) => reponse.json())
      .then((json) => {
        console.log(json);

        MongoClient.connect(url, function (err, db) {
          if (err) throw err;

          var dbo = db.db("meteo");
          console.log("dbo : " + dbo);

          var myobj = json;
          console.log("myobj : " + myobj);

          dbo.collection("dataMeteo").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        });
      });
  }, 5000);

  setTimeout(function () {
    fetch(
      "http://api.openweathermap.org/data/2.5/air_pollution?lat=43.599563&lon=1.418764&appid=4dd7bb5e8f098fcc8694f07327fc433f",
      { method: "GET" }
    )
      .then((reponse) => reponse.json())
      .then((json) => {
        console.log(json);

        MongoClient.connect(url, function (err, db) {
          if (err) throw err;

          var dbo = db.db("pollution");
          console.log("dbo : " + dbo);

          var myobj = json;
          console.log("myobj : " + myobj);

          dbo.collection("dataMeteo").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
          });
        });
      });
  }, 10000);
}, 20000);
