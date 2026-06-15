import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../components/common/StatusBadge';

describe('StatusBadge', () => {
  it('renders Active status', () => {
    render(<StatusBadge status="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders Inactive status', () => {
    render(<StatusBadge status="Inactive" />);
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('renders Pending status', () => {
    render(<StatusBadge status="Pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('renders Blacklisted status', () => {
    render(<StatusBadge status="Blacklisted" />);
    expect(screen.getByText('Blacklisted')).toBeInTheDocument();
  });

  it('renders a span element with the correct text', () => {
    const { container } = render(<StatusBadge status="Active" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge.tagName).toBe('SPAN');
    expect(badge.textContent).toBe('Active');
  });
});
