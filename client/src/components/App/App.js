import React, { useState } from 'react';
import axios from 'axios';
import BillingForm from '../BillingForm/BillingForm';
import ProductInfo from '../ProductInfo/ProductInfo';
import QuantityPicker from '../QuantityPicker/QuantityPicker';
import TotalPrice from '../TotalPrice/TotalPrice';
import Success from '../Success/Success';
import useForm from './hooks/useForm';
import bottleJPG from '../../assets/bottle.jpg';

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
      const result = await axios.post('/api/magic', values);
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
    <div className="bg-gray-50 py-16 lg:py-24 px-8 md:px-16 lg:px-16 max-w-screen mx-auto min-h-screen text-base md:text-lg text-indigo-900">
      {isSubmitted && successMsg.length > 0 ? (
        <Success
          successMsg={successMsg}
          orderId={orderId}
          setIsSubmitted={setIsSubmitted}
          setSuccessMsg={setSuccessMsg}
        />
      ) : (
        <div>
          <div className="flex flex-col lg:flex lg:flex-row lg:space-x-10">
            <img
              className="lg:w-3/4"
              src={bottleJPG}
              alt="Two magic potion bottles"
            />
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
            </div>
          </div>
          <BillingForm
            values={values}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <button
            className="rounded-md mt-5 flex items-center justify-center w-min text-center lg:text-right lg:items-right lg:justify-start"
            type="submit"
            onClick={handleSubmit}
          >
            <span className="text-center text-lg flex flex-col justify-center w-40 h-16 text-center text-white leading-none bg-indigo-900 border-indigo-900 border rounded transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-xl lg:mt-0">
              {isLoading ? 'Submitting...' : 'Submit Purchase'}
            </span>
          </button>
          {errors.message && (
            <p className="text-md p-1 text-red-500">{errors.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
