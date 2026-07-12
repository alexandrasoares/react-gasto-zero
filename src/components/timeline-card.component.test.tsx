import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import TimelineCard from './timeline-card.component';
import { TimelineEntry } from '../interfaces/behavioral-history.interface';

const entry: TimelineEntry = {
  id: '1',
  action: 'Resisted impulse purchase',
  date: '2024-01-15',
  category: 'Shopping',
};

describe('TimelineCard', () => {
  it('renders the entry action, date and category', () => {
    render(<TimelineCard entry={entry} />);

    expect(screen.getByText('Resisted impulse purchase')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('Shopping')).toBeInTheDocument();
  });
});
