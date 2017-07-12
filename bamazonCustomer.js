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
    displayInventory();
    order();
});

function displayInventory() {
    var query = "SELECT item_id,product_name,department_name,price FROM products";
    connection.query(query, function (err, res) {
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
    var query = "SELECT * FROM products";

    connection.query(query, function (err, res) {

        inquirer.prompt([
            {

                type: "input",
                message: "What is the ID of the product you would like to buy?",
                name: "orderID",
                validate: function (value) {
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
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }

            }
        ]).then(function (productChoice) {
            var query2 = "UPDATE products SET ? WHERE ?";

            // Variables from choice made
            var item = productChoice.orderID;
            var itemIndex = (productChoice.orderID - 1);
            var quantity = productChoice.orderAmt;

            // Variables from database
            var itemQuantityDB = (res[itemIndex].stock_quantity);
            var itemPrice = (res[itemIndex].price);

            // Variables for cost
            var cost = (itemPrice * quantity);

            if (itemQuantityDB >= quantity) {

                console.log("Updating inventory...\n");

                connection.query(query2,
                    [
                        {
                            stock_quantity: itemQuantityDB - quantity
                        },
                        {
                            item_id: item
                        }
                    ],
                    function (err, res) {
                        console.log("Thank you for purchasing! Your purchase total is $" + cost);
                        continueOrder();
                    });
            } else {
                console.log("Insufficient Quantity! Our apologies but there are only " + itemQuantityDB + " units left for this item.");
                continueOrder();
            }
        });
    });
}

function continueOrder() {
    inquirer.prompt({
        type: "choice",
        message: "Do you want to continue shopping?",
        choices: ["yes", "no"],
        name: "choice"
    }).then(function (answer) {

        switch (answer.choice) {
            case "yes":
                order();
                break;

            case "no":
                console.log("Thanks for shopping with us! Come again!");
                break;
        }
    });
}