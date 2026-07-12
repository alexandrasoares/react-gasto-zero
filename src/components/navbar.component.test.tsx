import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Navbar from './navbar.component';
import { NavigationItem } from '../interfaces/behavioral-history.interface';

const links: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Rewards', path: '/rewards' },
];

describe('Navbar', () => {
  it('renders the brand and every link label', () => {
    render(<Navbar brand="Gasto Zero" links={links} />);

    expect(screen.getByText('Gasto Zero')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rewards' })).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    render(<Navbar brand="Gasto Zero" links={links} activePath="/rewards" />);

    expect(screen.getByRole('button', { name: 'Rewards' }).className).toContain('text-green-600');
    expect(screen.getByRole('button', { name: 'Dashboard' }).className).not.toContain(
      'text-green-600',
    );
  });

  it('calls onNavigate with the link path when a link is clicked', async () => {
    const onNavigate = vi.fn();
    render(<Navbar brand="Gasto Zero" links={links} onNavigate={onNavigate} />);

    await userEvent.click(screen.getByRole('button', { name: 'Dashboard' }));

    expect(onNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('does not throw when clicking a link without an onNavigate handler', async () => {
    render(<Navbar brand="Gasto Zero" links={links} />);

    await expect(
      userEvent.click(screen.getByRole('button', { name: 'Dashboard' })),
    ).resolves.not.toThrow();
  });
});
