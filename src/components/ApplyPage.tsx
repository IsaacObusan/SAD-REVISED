import React, { useState } from 'react';

const AccessibilityToolbar: React.FC = () => {
  const [contrastMode, setContrastMode] = useState(false);
  const [textSize, setTextSize] = useState(16);
  const [letterSpacing, setLetterSpacing] = useState(1);

  const toggleContrastMode = () => {
    setContrastMode(!contrastMode);
    document.body.style.backgroundColor = contrastMode ? '' : '#000';
    document.body.style.color = contrastMode ? '' : '#fff';
  };

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.value, 10);
    setTextSize(size);
    document.body.style.fontSize = `${size}px`;
  };

  const handleLetterSpacingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const spacing = parseFloat(event.target.value);
    setLetterSpacing(spacing);
    document.body.style.letterSpacing = `${spacing}px`;
  };

  const resetAccessibility = () => {
    setContrastMode(false);
    setTextSize(16);
    setLetterSpacing(1);
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    document.body.style.fontSize = '16px';
    document.body.style.letterSpacing = '1px';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
      <button
        onClick={toggleContrastMode}
        className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600"
      >
        Toggle Contrast Mode
      </button>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          Text Size:
          <input
            type="range"
            min="12"
            max="24"
            value={textSize}
            onChange={handleTextSizeChange}
            className="slider"
          />
        </label>

        <label className="flex items-center gap-2">
          Letter Spacing:
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={letterSpacing}
            onChange={handleLetterSpacingChange}
            className="slider"
          />
        </label>
      </div>

      <button
        onClick={resetAccessibility}
        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
      >
        Reset Accessibility
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
