import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the default title', () => {
    render(<Header />);
    expect(screen.getByText('Notes App')).toBeInTheDocument();
  });

  it('renders a custom title when provided', () => {
    render(<Header title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
