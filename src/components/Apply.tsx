import React, { useState } from "react";

const AccessibilityToolbar: React.FC = () => {
  const [textSize, setTextSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setTextSize(newSize);
    document.documentElement.style.setProperty("--base-font-size", `${newSize}px`);
    
    // Apply the new font size globally
    document.body.style.fontSize = `${newSize}px`;

    // Apply the font size to all text-containing elements (including cards, etc.)
    const allTextElements = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, li, .card p, .tab-content p, .read-the-docs");
    allTextElements.forEach((element) => {
      const textElement = element as HTMLElement;  // Cast to HTMLElement
      textElement.style.fontSize = `${newSize}px`;
    });
  };

  const handleLineSpacingChange = () => {
    const newSpacing = lineSpacing === 1.5 ? 2 : 1.5;
    setLineSpacing(newSpacing);
    document.documentElement.style.setProperty("--line-height", `${newSpacing}`);
    document.body.style.lineHeight = `${newSpacing}`; // Apply line height to body

    // Apply line-height globally to all text-containing elements
    const allTextElements = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, li, .card p, .tab-content p, .read-the-docs");
    allTextElements.forEach((element) => {
      const textElement = element as HTMLElement;
      textElement.style.lineHeight = `${newSpacing}`;
    });
  };

  const toggleContrastMode = () => {
    setIsHighContrast(!isHighContrast);
    document.body.classList.toggle("high-contrast", !isHighContrast);
  };

  const resetAccessibility = () => {
    setTextSize(16);
    setLineSpacing(1.5);
    setIsHighContrast(false);
    document.documentElement.style.setProperty("--base-font-size", "16px");
    document.documentElement.style.setProperty("--line-height", "1.5");
    document.body.classList.remove("high-contrast");

    // Reset global styles for font size and line height
    document.body.style.fontSize = "16px";
    document.body.style.lineHeight = "1.5";

    // Reset text size and line height in cards and other sections
    const allTextElements = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, li, .card p, .tab-content p, .read-the-docs");
    allTextElements.forEach((element) => {
      const textElement = element as HTMLElement;
      textElement.style.fontSize = "16px";
      textElement.style.lineHeight = "1.5";
    });
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-100 p-4 flex items-center justify-between z-50 border-t-2 border-gray-600"
      style={{
        boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <button
        onClick={toggleContrastMode}
        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded"
      >
        {isHighContrast ? "Disable Contrast Mode" : "Enable Contrast Mode"}
      </button>

      <div className="flex items-center space-x-4">
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
          className="w-32 bg-gray-700"
        />
        <span className="font-medium">{textSize}px</span>
      </div>

      <button
        onClick={handleLineSpacingChange}
        className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold py-2 px-4 rounded"
      >
        Adjust Spacing
      </button>

      <button
        onClick={resetAccessibility}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Reset Accessibility
      </button>
    </div>
  );
};

export default AccessibilityToolbar;
