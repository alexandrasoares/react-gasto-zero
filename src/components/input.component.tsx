import React from 'react';

interface InputProps {
  label: string;
  type?: 'text' | 'number' | 'email' | 'textarea';
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
    onChange(newValue);
  };

  if (type === 'textarea') {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-green-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-green-50 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  );
};

export default Input;
