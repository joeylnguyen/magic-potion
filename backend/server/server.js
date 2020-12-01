const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult, oneOf, body } = require('express-validator');
const { userValidationRules, validate } = require('./validator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello!'));

app.post('/api/magic', userValidationRules(), validate, (req, res) => {
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
