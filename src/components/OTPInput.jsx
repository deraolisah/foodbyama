import React, { useRef } from 'react';

const OTPInput = ({ length = 6, value, onChange }) => {
  const inputsRef = useRef([]);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, '');

    if (!val) return;

    const newValue = value.split('');
    newValue[index] = val[0];

    const updated = newValue.join('');
    onChange(updated);

    // Move to next input
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!value[index]) {
        inputsRef.current[index - 1]?.focus();
      }

      const newValue = value.split('');
      newValue[index] = '';
      onChange(newValue.join(''));
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);

    if (!paste) return;

    onChange(paste);

    paste.split('').forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char;
      }
    });

    inputsRef.current[paste.length - 1]?.focus();
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          inputMode="numeric"
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          ref={(el) => (inputsRef.current[index] = el)}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
        />
      ))}
    </div>
  );
};

export default OTPInput;