import React from 'react';
import BillingForm from '../BillingForm/BillingForm';
import ProductInfo from '../ProductInfo/ProductInfo';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import TotalPrice from '../TotalPrice/TotalPrice';
import useForm from './hooks/useForm';

const magicPotionData = {
  productName: 'Magic Potion',
  price: 49.99,
  description: 'A magic potion to cure all of your skincare woes.',
  max: 3,
};

const App = () => {
  const submitData = () => console.log('Submitted!', values);
  const { values, handleChange, handleSubmit, errors } = useForm(submitData);

  return (
    <div>
      <ProductInfo
        values={values}
        errors={errors}
        handleChange={handleChange}
        productName={magicPotionData.productName}
        price={magicPotionData.price}
        description={magicPotionData.description}
      />
      <QuantityPicker
        values={values}
        errors={errors}
        handleChange={handleChange}
        max={magicPotionData.max}
      />
      <TotalPrice
        values={values}
        name={magicPotionData.productName}
        handleChange={handleChange}
      />
      <BillingForm
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <button type="submit" onClick={handleSubmit}>
        Complete Purchase
      </button>
    </div>
  );
};

export default App;
