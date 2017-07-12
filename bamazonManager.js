var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw (err);
    options();
});

function options() {

    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "options"
        }
    ).then(function(answer) {

        switch (answer.options) {

            case "View Products for Sale":
            viewProducts();
            break;

            case "View Low Inventory":
            lowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            addProduct();
            break;
        }
    });
}

function viewProducts() {
    console.log("Viewing all products...");

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                "Product ID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Department: " + res[i].department_name +
                " || Price: " + res[i].price +
                " || Quantity: " + res[i].stock_quantity
            );
        }
    });
}

function lowInventory() {
    console.log("Viewing low inventory products...");

    connection.query("SELECT * FROM products WHERE stock_quantity < 3", function(err, res) {
        // Meaning that if there is anything to even return
        if(res.length > 0) {
            for (var i = 0; i < res.length; i++) {
                console.log(
                "Product ID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Department: " + res[i].department_name +
                " || Price: " + res[i].price +
                " || Quantity: " + res[i].stock_quantity
                );
            }
        } else {
            console.log("No items are at risk!");
        }
    });
}

function addInventory() {
    console.log("Adding to inventory...");
}

function addProduct() {
    console.log("Adding a new product...");
}