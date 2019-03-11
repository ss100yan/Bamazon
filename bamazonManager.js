//.............Importing mysql and inquirer modules ..........................................

var mysql = require('mysql');
var inquirer = require('inquirer');


//................Creating a connection to the database.......................

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");
    connection.query("SELECT * FROM products ", function (err, res, fields) {
        if (err) throw err;

        // console.log(res);
            
      });
    });


    function start(){
        inquirer.prompt([{
          type: "list",
          name: "choice",
          message: "Select an option",
          choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }]).then(function(ans){
           switch(ans.choice){
            case "View Products for Sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break;
            case "Add to Inventory": addToInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            }
        });
      }
      
      //............views all inventory.......................................................................
      function viewProducts(){
              
        connection.query('SELECT * FROM Products', function(err, res){
        if(err) throw err;
        console.log('----------------------------------------------------------------------------------------------------')
      
        for(var i = 0; i<res.length;i++){
          console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
          console.log('--------------------------------------------------------------------------------------------------')
        }
      
        start();
        });
      }
      
      //.......................................views low inventory.....................................

      function viewLowInventory(){
        
      
        connection.query('SELECT * FROM Products', function(err, res){
        if(err) throw err;
        console.log('----------------------------------------------------------------------------------------------------')
      
        for(var i = 0; i<res.length;i++){
          if(res[i].stock_quantity <= 3){
          console.log("ID: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
          console.log('--------------------------------------------------------------------------------------------------');
          }
        }
      
        start();
        });
      }
      
      //..................prompt to add more of an product ..............................

      function addToInventory(){
        
      
        connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        var itemArray = [];
       

        for(var i=0; i<res.length; i++){
          itemArray.push(res[i].product_name);
        }
      
        inquirer.prompt([{
          type: "list",
          name: "product",
          choices: itemArray,
          message: "Select the product to update quantity"
        }, {
          type: "input",
          name: "qty",
          message: `Enter the new quantity of product you selected`,
      
          }]).then(function(ans){
         
            connection.query('UPDATE products SET ? WHERE ?', [
              {stock_quantity: parseInt(ans.qty)}
              ,{product_name: ans.product}
              ], function(err, res){
                if(err) throw err;
                console.log("---------------------------------------------------------------------\n");
                console.log(`The new  quantity of ${ans.product} is ${ans.qty}`);
                console.log("---------------------------------------------------------------------\n");
                start();
              });
            })
        });
      }
      
      //...............................new product.............................
      function addNewProduct(){
              
    inquirer.prompt([{

      type: "input",
      name: "Name",
      message: "Enter the item name.",
  },
  {
      type: "input",
      name: "Department",
      message: "Enter department name.",
  },
  {
      type: "input",
      name: "Price",
      message: "Enter the price of the new product.",
  },
  {
      type: "input",
      name: "Stock",
      message: "Enter the stock quantity of the new product.",
  }

]).then(function(New) {
  console.log("---------------------------------------------------------------------\n");
  console.log(`The new  product  ${New.Name} was added to the inventory database`);
  console.log("---------------------------------------------------------------------\n");


connection.query("INSERT INTO products SET ?", {
  product_name: New.Name,
  department_name: New.Department,
  price: New.Price,
  stock_quantity: New.Stock
}, function(err, res) {});
start();
});
}
      //.................function starts the the MNGR. prompts.........................

      start();