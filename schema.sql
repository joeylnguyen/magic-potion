CREATE DATABASE magicpotion;

CREATE TABLE customers(
  customer_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULl
);

CREATE TABLE orders(
  order_id SERIAL PRIMARY KEY,
  order_date TIMESTAMP NOT NULL DEFAULT NOW(),
  order_total VARCHAR(255) NOT NULL,
  customer_id INT NOT NULL,
  street1 VARCHAR(255) NOT NULL,
  street2 VARCHAR(255) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  ccNum VARCHAR(255) NOT NULL,
  exp VARCHAR(50) NOT NULL,
  fulfilled BOOLEAN DEFAULT FALSE NOT NULL,
  FOREIGN KEY (customer_id)
    REFERENCES customers (customer_id)
);

CREATE TABLE products(
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  product_description VARCHAR(255) NOT NULL,
  product_price DECIMAL(12,2) NOT NULL,
  product_max INT NOT NULL,
  product_img VARCHAR(255) NOT NULL
);

CREATE TABLE order_details(
  order_details_id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  order_id INT NOT NULL,
  product_quantity INT NOT NULL,
  FOREIGN KEY (product_id)
    REFERENCES products (product_id),
  FOREIGN KEY (order_id)
    REFERENCES orders (order_id) ON DELETE CASCADE
);
