//.............Importing mysql and inquirer modules ..........................................

var mysql = require('mysql');
var inquirer = require('inquirer');

//..............Creating Varible for inquirer to prompt order questions to the customer......................

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

//................Creating a connection to the database.......................

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");
        con.query("SELECT * FROM products ", function (err, result, fields) {
        if (err) throw err;

//.......Displaying the Bamazon products, ID's and prices.........................

        console.log('Bamazon.com Inventory: ');
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

      
        // Inquirer prompts order questions to the customer......................................
              inquirer.prompt(questions)
        .then(answers => {
         

  
         //........Database update ...............................

                 var ItemID = answers.ID
                 var ItemQuantity = answers.Quantity;
                 var curenQuantity = result[ItemID-1].stock_quantity;
                 var UpdatedItemQuantity = curenQuantity -ItemQuantity;

        //....availability check .......................................
                 
                 
                 if (ItemQuantity<=curenQuantity){
      //.................MYSQL update..............................................

        var sql = `UPDATE products SET stock_quantity =${UpdatedItemQuantity} WHERE id =${ItemID}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          // console.log(result.affectedRows + " record(s) updated");

         
         

          
        });
               console.log('\n.....................................');
               console.log('\nOrder receipt:');
               console.log(JSON.stringify(answers, null, '  '));
               console.log(`\n....... ${result[ItemID-1].product_name} .......`);
               console.log(`\nTotal coast: ${result[ItemID-1].price} USD + Tax and delivery fee.`);
               console.log('\n.....................................');
               console.log("Thank you for shopping with Bamazon !!!");
               console.log("Questions abou your purchase: 1-800-Bamazon or www.Bamazon.com/support");
        }
          else{
            console.log('\n.....................................');
            console.log(`We have only ${curenQuantity} in stock`);
            console.log('We apologize about the inconvenience!');
          };

        });
  
              
        
       
      });
  });
