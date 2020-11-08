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
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
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
      console.log(req.query.nimi);
      console.log(req.query.hasOwnProperty('osoite'));
      var nimi = req.query.nimi;
      var osoite = req.query.osoite;
      var asty = req.query.asty;
      var sql = "SELECT * FROM Asiakas WHERE 1 = 1"
      if(req.query.hasOwnProperty('nimi') != false){
        sql = sql + " AND nimi like '" + nimi + "%'";
      }
      if(req.query.hasOwnProperty('osoite') != false){
        sql = sql + " AND osoite like '" + osoite + "%'";
      }
      if(req.query.hasOwnProperty('asty') != false){
        sql = sql + " AND asty_avain like '" + asty + "%'";
      }
      
      

      connection.query(sql, function(error, results, fields){
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

      // console.log("Body = " + JSON.stringify(req.body));
      // console.log("Params = " + JSON.stringify(req.query));
      // console.log(req.query.nimi);
      // res.send(res);
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
