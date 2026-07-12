import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './button.component';

describe('Button', () => {
  it('renders its children and defaults to type "button"', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows a loading label and disables the button when loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Submit
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Loading...');
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Nope</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant and custom classes', () => {
    render(
      <Button variant="secondary" className="extra">
        Styled
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-white');
    expect(button.className).toContain('extra');
  });

  it('honors an explicit type prop', () => {
    render(<Button type="submit">Send</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
