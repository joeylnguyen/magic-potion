import React from 'react';
import ReactDom from 'react-dom';
import { render, screen } from '@testing-library/react';
import ProductInfo from '../ProductInfo';

it('renders correct content', () => {
  const div = document.createElement('div');
  ReactDom.render(<ProductInfo />, div);
});
