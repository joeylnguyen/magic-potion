import React from 'react';
import PropTypes from 'prop-types';

const ProductInfo = ({ productName, price, description }) => {
  return (
    <div className="flex flex-col mt-3 space-y-2 lg:text-right">
      <h1 className="text-4xl lg:text-7xl font-semibold">{productName}</h1>
      <h2 className="text-2xl lg:text-4xl font-medium pb-3">{`$${price}`}</h2>
      <p className="text-indigo-800 font-thin lg:text-2xl">{description}</p>
    </div>
  );
};

ProductInfo.propTypes = {
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductInfo;
