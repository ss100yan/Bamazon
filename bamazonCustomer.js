
var mysql = require('mysql');
var Inquirer = require('inquirer');



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
  });