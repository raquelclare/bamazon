DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INTEGER(50)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Amazon Echo", "Electronics", 179.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Clarisonic", "Beauty", 129.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Roku 4", "Electronics", 89.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Salt Lamp", "Home & Kitchen", 50.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Baby Monitor", "Baby" , 74.99, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Sparkling Water Maker", "Home & Kitchen", 95.29, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Snuggie", "Clothing", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Kitty Litter", "Pet", 7, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Kindle Paperwhite", "Electronics", 119.00, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("7 Piece Knife Set", "Home & Kitchen", 25.99, 12);