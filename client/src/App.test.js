import React from 'react';
import ReactDom from 'react-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders correct content', () => {
  const root = document.createElement('div');
  ReactDom.render(<App />, root);
});
