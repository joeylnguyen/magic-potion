import React from 'react';
import PropTypes from 'prop-types';

const ProductInfo = ({ productName, price, description }) => {
  return (
    <div>
      <h1>{productName}</h1>
      <h2>{`$${price}`}</h2>
      <p>{description}</p>
    </div>
  );
};

ProductInfo.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductInfo;
