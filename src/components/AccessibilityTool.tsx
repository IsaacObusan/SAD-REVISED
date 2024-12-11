import React, { useState, useRef } from "react";
import { FaArrowDown, FaArrowUp, FaAdjust, FaFont, FaArrowsAltV, FaUndo } from "react-icons/fa";

const AccessibilityToolbar: React.FC = () => {
  const [textSize, setTextSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);

  // Button state to track which button is clicked
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  // Handling drag events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (toolbarRef.current) {
      setDragging(true);
      setOffset({
        x: e.clientX - toolbarRef.current.getBoundingClientRect().left,
        y: e.clientY - toolbarRef.current.getBoundingClientRect().top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && toolbarRef.current) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;
      toolbarRef.current.style.left = `${Math.max(0, Math.min(window.innerWidth - toolbarRef.current.offsetWidth, newX))}px`;
      toolbarRef.current.style.top = `${Math.max(0, Math.min(window.innerHeight - toolbarRef.current.offsetHeight, newY))}px`;
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  // Toggle active state for each button
  const handleButtonClick = (buttonName: string) => {
    if (activeButton === buttonName) {
      setActiveButton(null); // Deactivate if clicked again
    } else {
      setActiveButton(buttonName); // Activate the clicked button
    }
  };

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={toggleToolbarVisibility}
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-teal-500 text-white p-4 rounded-full z-50 border-4 border-indigo-700 shadow-xl transition duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:scale-105"
      >
        {isToolbarVisible ? <FaArrowDown size={20} /> : <FaArrowUp size={20} />}
      </button>

      {/* Toolbar */}
      {isToolbarVisible && (
        <div
          ref={toolbarRef}
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-700 to-gray-900 text-white p-3 md:p-4 flex flex-col items-center space-y-4 justify-center z-50 border-2 border-gray-600 rounded-xl w-2/3 sm:w-1/2 md:w-1/3 shadow-2xl"
          style={{
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            transition: "transform 0.2s ease",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex flex-wrap justify-center space-x-4">
            {/* Contrast Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  toggleContrastMode();
                  handleButtonClick("contrast");
                }}
                className={`bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full transition-all duration-300 transform ${activeButton === "contrast" ? "scale-110 shadow-lg" : "hover:scale-110 hover:shadow-lg"}`}
                aria-label="Toggle Contrast"
              >
                <FaAdjust size={20} />
              </button>
              <span className="text-xs mt-1">Contrast</span>
            </div>

            {/* Text Size Button */}
            <div className="flex flex-col items-center">
              <label htmlFor="text-size-slider" className="text-sm">
                <FaFont size={20} />
              </label>
              <input
                id="text-size-slider"
                type="range"
                min="12"
                max="24"
                value={textSize}
                onChange={handleTextSizeChange}
                className="w-32 bg-gray-600 rounded-lg"
              />
              <span className="font-medium">{textSize}px</span>
              <span className="text-xs mt-1">Text Size</span>
            </div>

            {/* Line Spacing Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  handleLineSpacingChange();
                  handleButtonClick("spacing");
                }}
                className={`bg-teal-500 text-gray-900 font-semibold py-2 px-4 rounded-full transition-all duration-300 transform ${activeButton === "spacing" ? "scale-110 shadow-lg" : "hover:scale-110 hover:shadow-lg"}`}
                aria-label="Adjust Line Spacing"
              >
                <FaArrowsAltV size={20} />
              </button>
              <span className="text-xs mt-1">Spacing</span>
            </div>

            {/* Reset Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  resetAccessibility();
                  handleButtonClick("reset");
                }}
                className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform ${activeButton === "reset" ? "scale-110 shadow-lg" : "hover:scale-110 hover:shadow-lg"}`}
                aria-label="Reset Accessibility"
              >
                <FaUndo size={20} />
              </button>
              <span className="text-xs mt-1">Reset</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityToolbar;
