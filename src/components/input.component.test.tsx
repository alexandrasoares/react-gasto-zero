import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from './input.component';

describe('Input', () => {
  it('renders the label and current value for a text input', () => {
    render(<Input label="Name" value="Alice" onChange={() => {}} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Alice');
  });

  it('emits the raw string value on text change', async () => {
    const onChange = vi.fn();
    render(<Input label="Name" value="" onChange={onChange} />);

    // Controlled with a fixed value, so each keystroke reports the typed char as a string.
    await userEvent.type(screen.getByRole('textbox'), 'H');

    expect(onChange).toHaveBeenCalledWith('H');
    expect(typeof onChange.mock.calls[0][0]).toBe('string');
  });

  it('parses numeric input to a number', async () => {
    const onChange = vi.fn();
    render(<Input label="Amount" type="number" value={0} onChange={onChange} />);

    await userEvent.type(screen.getByRole('spinbutton'), '5');

    expect(onChange).toHaveBeenLastCalledWith(5);
    expect(onChange).not.toHaveBeenLastCalledWith('5');
  });

  it('falls back to 0 for an empty numeric value', () => {
    const onChange = vi.fn();
    render(<Input label="Amount" type="number" value={10} onChange={onChange} />);

    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '' } });

    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('renders a textarea when type is textarea', () => {
    render(
      <Input label="Notes" type="textarea" value="hello" onChange={() => {}} placeholder="Write" />,
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveValue('hello');
    expect(textarea).toHaveAttribute('placeholder', 'Write');
  });
});
