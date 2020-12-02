import React, { useState } from 'react';
import axios from 'axios';
import BillingForm from '../BillingForm/BillingForm';
import ProductInfo from '../ProductInfo/ProductInfo';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import TotalPrice from '../TotalPrice/TotalPrice';
import Success from '../Success/Success';
import useForm from './hooks/useForm';

const magicPotionData = {
  productName: 'Magic Potion',
  price: 49.99,
  description: 'A magic potion to cure all of your skincare woes.',
  max: 3,
};

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [orderId, setOrderId] = useState(null);

  const submitData = async (values) => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        'http://localhost:4000/api/magic',
        values
      );
      const { id, message } = result.data;
      setSuccessMsg(message);
      setOrderId(id);
      setValues(initialValues);
    } catch (err) {
      handleServerErrors(err.response.data.errors);
    }
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const {
    values,
    initialValues,
    errors,
    handleChange,
    handleSubmit,
    handleServerErrors,
    setValues,
  } = useForm(submitData);

  return (
    <div>
      {isSubmitted && successMsg.length > 0 ? (
        <Success
          successMsg={successMsg}
          orderId={orderId}
          setIsSubmitted={setIsSubmitted}
          setSuccessMsg={setSuccessMsg}
        />
      ) : (
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
            price={magicPotionData.price}
          />
          <BillingForm
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <button type="submit" onClick={handleSubmit}>
            {isLoading ? 'Submitting...' : 'Complete Purchase'}
          </button>
          {errors.message && <p>{errors.message}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
