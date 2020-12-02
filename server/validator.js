const { body, validationResult } = require('express-validator');
const {
  validateCardExpiration,
  validateZipCode,
  validatePhoneNumber,
  validateCardExpirationFormat,
} = require('../client/src/components/App/utils/validators');

const userValidationRules = () => {
  return [
    body('email', 'Email address is required').trim().notEmpty(),
    body('email', 'Please enter a valid email address')
      .if(body('email').notEmpty())
      .isEmail()
      .normalizeEmail(),
    body('quantity', 'Max quantity for this item is 3').custom(
      (value) => value <= 3
    ),
    body('total').isString().notEmpty(),
    body('firstName', 'First name is required').trim().notEmpty().escape(),
    body('lastName', 'Last name is required').trim().notEmpty().escape(),
    body('phone', 'Phone number is required').trim().notEmpty().escape(),
    body('phone', 'Please enter a valid 10-digit phone number')
      .if(body('phone').notEmpty())
      .custom((value) => validatePhoneNumber(value)),
    body('address.city', 'City is required').trim().notEmpty().escape(),
    body('address.state', 'State is required').trim().notEmpty().escape(),
    body('address.street1', 'Address line 1 is required')
      .trim()
      .isLength({ max: 50, min: 6 })
      .escape(),
    body('address.street2')
      .optional({ checkFalsy: true })
      .isLength({ max: 50, min: 6 })
      .trim()
      .escape(),
    body('address.zipCode', 'Zip code is required').trim().notEmpty().escape(),
    body('address.zipCode', 'Please enter a valid zip code')
      .if(body('address.zipCode').notEmpty())
      .isPostalCode('US'),
    body('payment.ccNum', 'Credit card number is required')
      .trim()
      .notEmpty()
      .escape(),
    body('payment.ccNum', 'Please enter a valid credit card number')
      .if(body('payment.ccNum').notEmpty())
      .isCreditCard(),
    body('payment.exp', 'Credit card expiration date is required')
      .trim()
      .isLength({ min: 5 }),
    body('payment.exp', 'Invalid credit card expiration date format')
      .if(body('payment.exp').isLength({ max: 5 }))
      .custom((value) => validateCardExpirationFormat(value)),
    body('payment.exp', 'Credit card is expired')
      .if(
        body('payment.exp').custom((value) =>
          validateCardExpirationFormat(value)
        )
      )
      .custom((value) => !validateCardExpiration(value)),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = {};
  errors.array().forEach((err) => {
    const name = err.param.split('.').pop();
    const msg = err.msg;

    extractedErrors[name] = msg;
  });

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
