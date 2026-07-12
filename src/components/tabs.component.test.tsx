import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from './tabs.component';
import { TabItem } from '../interfaces/behavioral-history.interface';

const tabs: TabItem[] = [
  { label: 'All', value: 'all' },
  { label: 'Shopping', value: 'shopping' },
];

describe('Tabs', () => {
  it('renders every tab label', () => {
    render(<Tabs tabs={tabs} activeTab="all" onTabChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Shopping' })).toBeInTheDocument();
  });

  it('applies the active styling to the active tab only', () => {
    render(<Tabs tabs={tabs} activeTab="shopping" onTabChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'Shopping' }).className).toContain('text-green-600');
    expect(screen.getByRole('button', { name: 'All' }).className).not.toContain('text-green-600');
  });

  it('calls onTabChange with the tab value when clicked', async () => {
    const onTabChange = vi.fn();
    render(<Tabs tabs={tabs} activeTab="all" onTabChange={onTabChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'Shopping' }));

    expect(onTabChange).toHaveBeenCalledWith('shopping');
  });
});
