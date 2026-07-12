import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from './pagination.component';

const setup = (currentPage: number, totalPages: number) => {
  const onPageChange = vi.fn();
  render(
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      prevLabel="Prev"
      nextLabel="Next"
    />,
  );
  return { onPageChange };
};

describe('Pagination', () => {
  it('renders a numbered button for each page', () => {
    setup(1, 3);

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
  });

  it('disables Prev on the first page and Next on the last page', () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={() => {}}
        prevLabel="Prev"
        nextLabel="Next"
      />,
    );
    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();

    rerender(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={() => {}}
        prevLabel="Prev"
        nextLabel="Next"
      />,
    );
    expect(screen.getByRole('button', { name: 'Prev' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('requests the previous page when Prev is clicked', async () => {
    const { onPageChange } = setup(2, 3);

    await userEvent.click(screen.getByRole('button', { name: 'Prev' }));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('requests the next page when Next is clicked', async () => {
    const { onPageChange } = setup(2, 3);

    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('requests the exact page when a number is clicked', async () => {
    const { onPageChange } = setup(1, 3);

    await userEvent.click(screen.getByRole('button', { name: '3' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
