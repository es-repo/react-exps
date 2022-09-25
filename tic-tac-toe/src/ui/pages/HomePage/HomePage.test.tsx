import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('test example', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

