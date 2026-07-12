import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Card from './card.component';

describe('Card', () => {
  it('renders its children', () => {
    render(
      <Card>
        <span>Content</span>
      </Card>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('merges custom classNames with the base styles', () => {
    render(
      <Card className="custom">
        <span>Content</span>
      </Card>,
    );

    const wrapper = screen.getByText('Content').parentElement;
    expect(wrapper?.className).toContain('bg-white');
    expect(wrapper?.className).toContain('custom');
  });
});
