
var mysql = require('mysql');
var inquirer = require('inquirer');

var questions = [
    {
        type: 'input',
        name: 'ID',
        message: "Please enter the ID of the product you would like to buy !",
        validate: function(value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
          },
          filter: Number
      },
      {
        type: 'input',
        name:'Quantity' ,
        message: "How many units of the product would you like to buy?",
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
        con.query("SELECT * FROM products ", function (err, result, fields) {
        if (err) throw err;

        console.log('Bamazon Inventory: ');
        console.log('...................\n');
    
        var Inventory = '';
        for (var i = 0; i < result.length; i++) {
          Inventory = '';
          Inventory += 'Product ID: ' + result[i].id + '  //  ';
          Inventory += 'Product Name: ' + result[i].product_name + '  //  ';
          Inventory += 'Price: $' + result[i].price + '\n';
    
          console.log(Inventory);
        }
    
          console.log("---------------------------------------------------------------------\n");
        // console.log(result);

      
        // Inquirer..................................................
              inquirer.prompt(questions)
        .then(answers => {
          // Use user feedback for... whatever!! 

   
                 //........Update Function
                 var ItemID = answers.ID
                 var ItemQuantity = answers.Quantity;
                 var curenQuantity = result[ItemID-1].stock_quantity;
                 var UpdatedItemQuantity = curenQuantity -ItemQuantity;
                 //....avelabiliti check function.....
                 
                
                 console.log(`We have only ${curenQuantity} in stock`);
                
                 
                 if (ItemQuantity<=curenQuantity){
                //MYSQL update..............................................

        var sql = `UPDATE products SET stock_quantity =${UpdatedItemQuantity} WHERE id =${ItemID}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          // console.log(result.affectedRows + " record(s) updated");

          console.log('\nOrder receipt:');
          console.log(JSON.stringify(answers, null, '  '));
          console.log("Thank you for shopping with Bamazon !!!");
        });
        
        };

        });
  
              
        
       
      });
  });
