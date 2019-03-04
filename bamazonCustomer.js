
var mysql = require('mysql');
var inquirer = require('inquirer');

var questions = [
    {
        type: 'input',
        name: 'ID',
        message: "Please enter the ID of the product they would like to buy !",
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
          },
          filter: Number
      },
      {
        type: 'input',
        name:'Quantity' ,
        message: "How many units of the product they would like to buy?",
        vvalidate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
          },
          filter: Number
      },


];



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

              inquirer
        .prompt(questions)
        .then(answers => {
          // Use user feedback for... whatever!! 

               console.log('\nOrder receipt:');
               console.log(JSON.stringify(answers, null, '  '));
        });

        

       
      });
  });
 