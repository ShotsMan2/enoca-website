"use client";

import React, { useState, useEffect } from 'react';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FloatingInput({ label, className = "", ...props }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  useEffect(() => {
    setHasValue(!!props.value || !!props.defaultValue);
  }, [props.value, props.defaultValue]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (!e.target.value) setHasValue(false);
    if (props.onBlur) props.onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    if (props.onChange) props.onChange(e);
  };

  const isActive = focused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className={`w-full h-[52px] px-4 pt-5 pb-1 rounded-xl border ${isActive ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all peer`}
        placeholder=" " 
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? "top-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-500"
            : "top-4 text-sm text-gray-500 dark:text-gray-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
