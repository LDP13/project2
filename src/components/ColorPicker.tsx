import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

const presetColors = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Teal', value: '#0d9488' },
];

function ColorPicker({ label, value, onChange, className = '' }: ColorPickerProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {presetColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              value === color.value
                ? 'border-gray-900 dark:border-white scale-110'
                : 'border-transparent hover:scale-105'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;