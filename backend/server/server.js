const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./database');
const { userValidationRules, validate } = require('./validator');
const models = require('./models');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`Incoming ${req.method}`);
  next();
});

app.get('/', (req, res) => res.send('Hello!'));

// Get order
app.get('/api/magic/:id', async (req, res) => {
  try {
    const order = await models.getOrderById(req.params.id);

    if (order.rowCount) {
      const {
        first_name,
        last_name,
        email,
        street1,
        street2,
        city,
        state,
        zip,
        phone,
        ccnum,
        exp,
        product_quantity,
        order_total,
        order_date,
        fulfilled,
      } = order.rows[0];

      const data = {
        firstName: first_name,
        lastName: last_name,
        email,
        address: { street1, street2, city, state, zip },
        phone,
        payment: { ccNum: ccnum, exp },
        quantity: product_quantity,
        total: order_total,
        orderDate: order_date,
        fulfilled,
      };
      return res.json(data);
    } else {
      res.status(404).json({ error: 'resouce not found' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
  res.sendStatus(200);
});

// Post order
app.post('/api/magic', userValidationRules(), validate, async (req, res) => {
  // Only one product (magic potion) in db so we'll default productId and productMax to its values
  const magicPotion = 'Magic Potion';
  const product = await pool.query(
    `SELECT * FROM products WHERE product_name = 'Magic Potion'`
  );
  const productId = product.rows[0].product_id;
  const productMax = product.rows[0].product_max;

  try {
    // Check if customer email is already in database
    const customer = await models.getCustomer(req.body);

    let customerId = customer.rows[0].customer_id;

    if (customerId) {
      // Customer is in database. Fetch their orders this month
      const customerOrders = await models.getOrders(req.body, productId);

      // Validate customer is not exceeding max purchases within a month
      const purchasedQty = customerOrders.rows.reduce((acc, row) => {
        return acc + row.product_quantity;
      }, 0);

      if (purchasedQty + req.body.quantity > productMax) {
        return res.status(400).json({
          error: `Order exceeds maximum purchase quantity for this month. You have ${
            productMax - purchasedQty
          } Magic Potion(s) available for purchase.`,
        });
      }
    } else {
      // Customer not in database. Create new customer
      const newCustomer = await createCustomer(req.body);
      customerId = newCustomer.rows[0].customer_id;
    }

    // Customer is valid. Create order
    const newOrder = await models.createOrder(req.body, customerId);
    const orderId = newOrder.rows[0].order_id;

    const newOrderDetails = await models.createOrderDetails(
      req.body,
      orderId,
      productId
    );

    res.status(201).json({ id: orderId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order
app.patch('/api/magic/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const fulfilled = await models.fulfillOrder(id);

    if (fulfilled.rowCount) {
      res.json({ message: 'resource updated successfully' });
    } else {
      res.status(404).json({ error: 'resouce not found' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Delete order
app.delete('/api/magic/:id', async (req, res) => {
  try {
    const deleted = await models.deleteOrder(req.params.id);

    if (deleted.rowCount) {
      res.json({ message: 'resource deleted successfully' });
    } else {
      res.status(404).json({ error: 'resouce not found' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
