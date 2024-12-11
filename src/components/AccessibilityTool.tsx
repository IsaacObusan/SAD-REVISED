import React, { useState } from "react";

const AccessibilityToolbar: React.FC = () => {
  const [textSize, setTextSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setTextSize(newSize);
    document.body.style.fontSize = `${newSize}px`;
  };

  const handleLineSpacingChange = () => {
    const newSpacing = lineSpacing === 1.5 ? 2 : 1.5;
    setLineSpacing(newSpacing);
    document.body.style.lineHeight = `${newSpacing}`;
  };

  const toggleContrastMode = () => {
    setIsHighContrast(!isHighContrast);
    document.body.classList.toggle("high-contrast", !isHighContrast);
  };

  const resetAccessibility = () => {
    setTextSize(16);
    setLineSpacing(1.5);
    setIsHighContrast(false);
    document.body.style.fontSize = "16px";
    document.body.style.lineHeight = "1.5";
    document.body.classList.remove("high-contrast");
  };

  const toggleToolbarVisibility = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={toggleToolbarVisibility}
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white p-2 rounded-full z-50"
      >
        {isToolbarVisible ? "▼" : "▲"}
      </button>

      {/* Toolbar */}
      {isToolbarVisible && (
        <div
          className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-50 text-gray-800 p-3 md:p-4 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 justify-between z-50 border-2 border-gray-600 rounded-lg w-11/12 sm:w-4/5 md:w-3/5"
          style={{
            boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <button
            onClick={toggleContrastMode}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded w-full md:w-auto"
          >
            {isHighContrast ? "Disable Contrast Mode" : "Enable Contrast Mode"}
          </button>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <label htmlFor="text-size-slider" className="text-sm">
              Text Size:
            </label>
            <input
              id="text-size-slider"
              type="range"
              min="12"
              max="24"
              value={textSize}
              onChange={handleTextSizeChange}
              className="w-full md:w-32 bg-gray-700"
            />
            <span className="font-medium">{textSize}px</span>
          </div>

          <button
            onClick={handleLineSpacingChange}
            className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold py-2 px-4 rounded w-full md:w-auto"
          >
            Adjust Spacing
          </button>

          <button
            onClick={resetAccessibility}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full md:w-auto"
          >
            Reset Accessibility
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessibilityToolbar;
