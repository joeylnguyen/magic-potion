const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const pool = require("./database");
const { userValidationRules, validate } = require("./validator");
const controllers = require("./controllers");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(`Incoming ${req.method}`);
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => res.send("Hello!"));

// Get order
app.get("/api/magic/:id", async (req, res) => {
  try {
    const order = await controllers.getOrderById(req.params.id);
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
      res.status(404).json({ error: "resource not found" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
  res.sendStatus(200);
});

// Post order
app.post("/api/magic", userValidationRules(), validate, async (req, res) => {
  try {
    // Only one product (magic potion) in db so we'll default productId and productMax to its values
    const magicPotion = "Magic Potion";
    const product = await pool.query(
      `SELECT * FROM products WHERE product_name = 'Magic Potion'`
    );
    const productId = product.rows[0].product_id;
    const productMax = product.rows[0].product_max;

    // Check if customer email is already in database
    const customer = await controllers.getCustomer(req.body);

    let customerId =
      customer.rows.length > 0 ? customer.rows[0].customer_id : null;

    if (customerId) {
      // Customer is in database. Fetch their orders this month
      const customerOrders = await controllers.getOrders(req.body, productId);

      // Validate customer is not exceeding max purchases within a month
      const purchasedQty = customerOrders.rows.reduce((acc, row) => {
        return acc + row.product_quantity;
      }, 0);

      if (purchasedQty + req.body.quantity > productMax) {
        throw new Error(
          `Order exceeds maximum purchase quantity for this month. You have ${
            productMax - purchasedQty
          } Magic Potion(s) available for purchase.`
        );
      }
    } else {
      // Customer not in database. Create new customer
      const newCustomer = await controllers.createCustomer(req.body);
      customerId = newCustomer.rows[0].customer_id;
    }

    // Customer is valid. Create order
    const newOrder = await controllers.createOrder(req.body, customerId);
    const orderId = newOrder.rows[0].order_id;

    const newOrderDetails = await controllers.createOrderDetails(
      req.body,
      orderId,
      productId
    );

    res.status(201).json({ id: orderId, message: "Order submitted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: { message: err.message } });
  }
});

// Update order
app.patch("/api/magic/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const fulfilled = await controllers.fulfillOrder(id);

    if (fulfilled.rowCount) {
      res.json({ message: "resource updated successfully" });
    } else {
      res.status(404).json({ error: "resouce not found" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Delete order
app.delete("/api/magic/:id", async (req, res) => {
  try {
    const deleted = await controllers.deleteOrder(req.params.id);

    if (deleted.rowCount) {
      res.json({ message: "resource deleted successfully" });
    } else {
      res.status(404).json({ error: "resouce not found" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
