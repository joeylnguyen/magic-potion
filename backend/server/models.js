const pool = require('./database');

const getCustomer = async (data) => {
  return await pool.query(
    'SELECT customer_Id FROM customers WHERE email = $1',
    [data.email]
  );
};

const getOrderById = async (id) => {
  return await pool.query(
    'SELECT o.*, c.first_name, c.last_name, c.email, od.product_quantity FROM orders o JOIN customers c ON o.customer_id = c.customer_id JOIN order_details od ON o.order_id = od.order_id WHERE o.order_id = $1',
    [id]
  );
};

const getOrders = async (data, productId) => {
  const email = data.email;

  // Selects all orders within this month for a given customer to validate that customer is not exceeding max purchases within a month
  const query = `SELECT c.customer_id, o.order_id, od.product_quantity, p.product_id, p.product_name FROM orders o JOIN customers c ON o.customer_id = c.customer_id JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id WHERE c.email = $1 AND p.product_id = $2 AND EXTRACT(month from o.order_date) = EXTRACT(month from NOW())`;

  return await pool.query(query, [email, productId]);
};

const createCustomer = async (data) => {
  return await pool.query(
    'INSERT INTO customers(first_name, last_name, email) VALUES($1, $2, $3) RETURNING *',
    [data.firstName, data.lastName, data.email]
  );
};

const createOrder = async (data, customerId) => {
  return await pool.query(
    'INSERT INTO orders (customer_id, phone, street1, street2, city, state, zip, ccnum, exp, order_total) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
    [
      customerId,
      data.phone,
      data.address.street1,
      data.address.street2,
      data.address.city,
      data.address.state,
      data.address.zipCode,
      data.payment.ccNum,
      data.payment.exp,
      data.total,
    ]
  );
};

const createOrderDetails = async (data, orderId, productId) => {
  return await pool.query(
    'INSERT INTO order_details(order_id, product_id, product_quantity) VALUES($1, $2, $3) RETURNING *',
    [orderId, productId, data.quantity]
  );
};

// Currently not in use. Will be used when more products are added to database
const getProduct = async (data) => {
  return await pool.query(`SELECT * FROM products WHERE product_name = $1`, [
    data.name,
  ]);
};

const deleteOrder = async (id) => {
  return await pool.query('DELETE FROM orders WHERE order_id = $1', [id]);
};

const fulfillOrder = async (id) => {
  return await pool.query(
    'UPDATE orders SET fulfilled = TRUE WHERE order_id = $1',
    [id]
  );
};

module.exports = {
  getOrderById,
  getCustomer,
  getOrders,
  createCustomer,
  createOrder,
  createOrderDetails,
  getProduct,
  fulfillOrder,
  deleteOrder,
};
