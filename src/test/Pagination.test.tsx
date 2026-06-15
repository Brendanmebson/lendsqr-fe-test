import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/common/Pagination';

const defaultProps = {
  currentPage: 1,
  totalPages: 10,
  pageSize: 10,
  totalItems: 100,
  onPageChange: vi.fn(),
  onPageSizeChange: vi.fn(),
};

describe('Pagination', () => {
  it('renders current page as active', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const page3 = screen.getByRole('button', { name: 'Page 3' });
    expect(page3).toHaveAttribute('aria-current', 'page');
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('calls onPageChange when page clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} currentPage={1} />);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageSizeChange when select changes', () => {
    const onPageSizeChange = vi.fn();
    render(<Pagination {...defaultProps} onPageSizeChange={onPageSizeChange} />);
    fireEvent.change(screen.getByLabelText('Items per page'), { target: { value: '20' } });
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });

  it('shows total items count', () => {
    render(<Pagination {...defaultProps} totalItems={500} />);
    expect(screen.getByText(/out of/i)).toHaveTextContent('out of 500');
  });

  it('renders all pages when total <= 7', () => {
    render(<Pagination {...defaultProps} totalPages={5} />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByLabelText(`Page ${i}`)).toBeInTheDocument();
    }
  });
});
