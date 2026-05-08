import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders officetreat heading', () => {
  render(<AuthProvider><App /></AuthProvider>);
  expect(screen.getByText(/OfficeTreat/i)).toBeInTheDocument();
});
