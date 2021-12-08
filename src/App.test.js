import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('render h1 element', () => {
  render(<App />);
  expect(screen.getByText('To Do List')).toBeInTheDocument();
});