CREATE DATABASE bamazon;

CREATE TABLE products(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(20),
  department_name VARCHAR(20),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity ) 
VALUES
 ('Mclaren F1', 'Auto', '1000000,00', '5'),
 ('Mazerati Z', 'Auto', '450000,00', '8'),
 ('Audi A12', 'Auto', '150000,00', '15'),
 ('Porshe Cayene', 'Auto', '150000,00', '15'),
 ('Mercedes TY', 'Auto', '350000,00', '5'),
 ('Toyota Corolla', 'Auto', '18000,00', '150'),
 ('BMW M3', 'Auto', '50000,00', '50'),
 ('Ford Mustang', 'Auto', '75000,00', '50'),
 ('Cadillac Escalade', 'Auto', '90000,00', '50'),
 ('Jeep Compass', 'Auto', '25000,00', '50');