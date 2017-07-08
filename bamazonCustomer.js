var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost", 
    port: 8889,

    user: "root", 
    password: "root", 
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw (err);
    displayInventory();
    order();
});

function displayInventory() {
    var query = "SELECT item_id,product_name,department_name,price FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Product ID: " + res[i].item_id + 
                " || Product: " + res[i].product_name +
                " || Department: " + res[i].department_name +
                " || Price: " + res[i].price
                );
        }
    });
}

function order() {
    inquirer.prompt([
        {

            type: "input", 
            message: "What is the ID of the product you would like to buy?",
            name: "orderID",
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
    
        },
        {
            type: "input",
            message: "How many of this product did you want to purchase?",
            name: "orderAmt",
            alidate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }

        }
    ]).then(function(productChoice) {
        var query = "UPDATE stock_quantity FROM products WHERE ?";
        var item = productChoice.orderID;
        var quantity = productChoice.orderAmt;

        console.log("Updating inventory...\n");

        connection.query(query, { item_id: item }, function(err, res) {
            {
                stock_quantity: stock_quantity - quantity
            }
        });
        //     [
        //         {
        //             stock_quantity: stock_quantity - quantity
        //         },
        //         {
        //             item_id: item
        //         }
        //     ], 
        //     function(err, res) {
        //         console.log(res.affectedRows + " product purchased!\n");
        //     }
        // );
        // connection.query(query, [productChoice.orderID, productChoice.orderAmt], function(err, res) {
        //     console.log(productChoice.orderID + " /// " + productChoice.orderAmt);
        //     for (var i = 0; i < res.length , i++) {
        //         console.log(res[i].item_id + " /// " + res[i].stock_quantity);
        //     }
        // });
    });
}