'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',//127.0.0.1
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'asiakas'
});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT * FROM Asiakas', function(error, results, fields){
        if ( error ){
          console.log("Virhe haettaessa dataa Asiakas-taulusta: " + error);
          res.status(500); //tämä lähtee selaimelle
          res.json({"status" : "ei toiminut"}); // ja tämä lähtee selaimelle
        }
        else
        {
        console.log("Data = " + JSON.stringify(results));
        res.json(results); // onnistunut data lähetetään selaimelle.
        }
    });

    },

    fetchAll: function(req, res){
      var sql = 'select * from jotain where 1 = 1'
      
      console.log("Body = " + JSON.stringify(req.body));
      console.log("Params = " + JSON.stringify(req.query));
      console.log(req.query.nimi);
      res.send("Kutsuttiin fetchAll");
    },

    create: function(req, res){
      console.log("Data = " + JSON.stringify(req.body));
      console.log(req.body.nimi);
      res.send("Kutsuttiin create");
    },

    update: function(req, res){

    },

    delete : function (req, res) {
      console.log("Body = " + JSON.stringify(req.body));
      console.log("Params = ", JSON.stringify(req.params));
        res.send("Kutsuttiin delete");
    }
}
