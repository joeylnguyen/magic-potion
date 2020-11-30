import React from 'react';
import Form from './components/Form/Form';
import ProductInfo from './components/ProductInfo/ProductInfo';
import FormContext from './FormContext';
import useForm from './components/Form/useForm';
import validateForm from './components/Form/validateForm';

const App = () => {
  const submit = () => console.log('Submitted!', values);
  const { values, handleChange, handleSubmit, errors } = useForm(
    submit,
    validateForm
  );

  return (
    <div>
      <FormContext.Provider
        value={{ values, handleChange, handleSubmit, errors }}
      >
        <ProductInfo />
        <Form />
      </FormContext.Provider>
    </div>
  );
};

export default App;
