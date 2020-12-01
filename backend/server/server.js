const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult, oneOf, body } = require('express-validator');
const { validateCardNumber, validateCardExpiration, validateZipCode, validatePhoneNumber, validateCardExpirationFormat } = require('../../client/src/components/Form/validators');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello!'));

app.post('/api/magic', [
  check('email', 'Email address is required').trim().notEmpty(),
  check('email', 'Please enter a valid email address')
    .if(check('email').notEmpty())
    .isEmail()
    .normalizeEmail(),
  // TODO: Add custom check for if email already exists in DB
  check('quantity', 'Max quantity for this item is 3')
    .custom((value) => value <= 3),
  // TODO: Add custom check for if user purchased more than 3 already
  check('total').isString().notEmpty(),
  check('firstName', 'First name is required')
    .trim()
    .notEmpty()
    .escape(),
  check('lastName', 'Last name is required')
    .trim()
    .notEmpty()
    .escape(),
  check('phone', 'Phone number is required')
    .trim()
    .notEmpty()
    .escape(),
  check('phone', 'Please enter a valid 10-digit phone number')
    .if(check('phone').notEmpty())
    .custom((value) => validatePhoneNumber(value)),
  check('address.city', 'City is required')
    .trim()
    .notEmpty()
    .escape(),
  check('address.state', 'State is required')
    .trim()
    .notEmpty()
    .escape(),
  check('address.street1', 'Address line 1 is required')
    .trim()
    .notEmpty()
    .escape(),
  body('address.street2').trim().escape(),
  check('address.zipCode', 'Zip code is required')
    .trim()
    .notEmpty()
    .escape(),
  check('address.zipCode', 'Please enter a valid zip code')
    .if(check('address.zipCode').notEmpty())
    .custom((value) => validateZipCode(value)),
  check('payment.ccNum', 'Credit card number is required')
    .trim()
    .notEmpty()
    .escape(),
  check('payment.ccNum', 'Please enter a valid credit card number')
    .if(check('payment.ccNum').notEmpty())
    .custom((value) => validateCardNumber(value)),
  check('payment.exp', 'Credit card expiration date is required')
    .trim()
    .isLength({ min: 5 }),
  check('payment.exp', 'Invalid credit card expiration date format')
    .if(check('payment.exp').isLength({ max: 5 }))
    .custom((value) => validateCardExpirationFormat(value)),
    check('payment.exp', 'Credit card is expired')
    .if(
      check('payment.exp')
        .custom((value) => validateCardExpirationFormat(value))
      )
    .custom((value) => !validateCardExpiration(value))
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    res.sendStatus(201);
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});