import React, { useContext } from 'react';
import FormContext from '../../FormContext';

const ProductInfo = () => {
  const submit = () => console.log(values, errors);

  const { values, handleChange, errors } = useContext(FormContext);

  return (
    <div>
      <h1>Magic Potion</h1>
      <h2>$49.99</h2>
      <p>A magical potion that will cure all of your skincare problems.</p>
      <div>
        Quantity
        <select
          data-testid="select-quantity"
          id="quantity"
          name="quantity"
          value={values.quantity}
          onBlur={submit}
          onChange={handleChange}
        >
          <option key="1">1</option>
          <option key="2">2</option>
          <option key="3">3</option>
        </select>
      </div>
      <div>{`${values.quantity} x Magic Potion`}</div>
      <div name="total" id="total" value={values.total} onChange={handleChange}>
        {`Total = $${values.total}`}
      </div>
    </div>
  );
};

export default ProductInfo;
