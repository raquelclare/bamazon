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