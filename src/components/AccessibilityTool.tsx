import React, { useState, useRef, useEffect } from "react";


import {
  FaArrowDown,
  FaArrowUp,
  FaAdjust,
  FaFont,
  FaArrowsAltV,
  FaUndo,
  FaSearchPlus,
} from "react-icons/fa";

const AccessibilityToolbar: React.FC = () => {
  const [textSize, setTextSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

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
    setIsMagnifierActive(false);
  };

  const toggleToolbarVisibility = () => {
    setIsToolbarVisible(!isToolbarVisible);
  };

  const toggleMagnifier = () => {
    setIsMagnifierActive((prevState) => {
      const newState = !prevState;
      document.body.style.cursor = newState ? "zoom-in" : "default";
      return newState;
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMagnifierActive) {
        setMagnifierPosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (isMagnifierActive) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMagnifierActive]);

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
      toolbarRef.current.style.left = `${Math.max(
        0,
        Math.min(window.innerWidth - toolbarRef.current.offsetWidth, newX)
      )}px`;
      toolbarRef.current.style.top = `${Math.max(
        0,
        Math.min(window.innerHeight - toolbarRef.current.offsetHeight, newY)
      )}px`;
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(activeButton === buttonName ? null : buttonName);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleToolbarVisibility}
        className="fixed z-50 p-4 text-white transition duration-300 ease-in-out transform -translate-x-1/2 border-4 border-indigo-700 rounded-full shadow-xl bottom-3 left-1/2 bg-gradient-to-r from-teal-500 to-teal-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:scale-105"
      >
        {isToolbarVisible ? <FaArrowDown size={20} /> : <FaArrowUp size={20} />}
      </button>

      {/* Toolbar */}
      {isToolbarVisible && (
        <div
          ref={toolbarRef}
          
          className="fixed z-50 flex flex-col items-center w-1/2 p-2 text-white -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl bottom-16 left-1/2 sm:w-2/3 md:w-1/3"



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
                className={`bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full transition-all duration-300 transform ${
                  activeButton === "contrast" ? "scale-110 shadow-lg" : "hover:scale-110 hover:shadow-lg"
                }`}
                aria-label="Toggle Contrast"
              >
                <FaAdjust size={20} />
              </button>
              <span className="mt-1 text-xs">Contrast</span>
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
              <span className="mt-1 text-xs">Text Size</span>
            </div>

            {/* Line Spacing Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  handleLineSpacingChange();
                  handleButtonClick("spacing");
                }}
                className={`bg-teal-500 text-gray-900 font-semibold py-2 px-4 rounded-full transition-all duration-300 transform ${
                  activeButton === "spacing" ? "scale-110 shadow-lg" : "hover:scale-110 hover:shadow-lg"
                }`}
                aria-label="Adjust Line Spacing"
              >
                <FaArrowsAltV size={20} />
              </button>
              <span className="mt-1 text-xs">Spacing</span>
            </div>

            {/* Reset Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  resetAccessibility();
                  handleButtonClick("reset");
                }}
                className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform ${
                  activeButton === "reset" ? "scale-110 shadow-lg" : "hover:scale-110 hover:shadow-lg"
                }`}
                aria-label="Reset Accessibility"
              >
                <FaUndo size={20} />
              </button>
              <span className="mt-1 text-xs">Reset</span>
            </div>

            {/* Magnifier Button */}
            <div className="flex flex-col items-center">
              <button
                onClick={toggleMagnifier}
                className={`bg-teal-500 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform ${
                  isMagnifierActive ? "scale-110 shadow-lg" : "hover:scale-110 hover:shadow-lg"
                }`}
                aria-label="Toggle Magnifier"
              >
                <FaSearchPlus size={20} />
              </button>
              <span className="mt-1 text-xs">Magnifier</span>
            </div>
          </div>
        </div>
      )}

      {/* Magnifier Lens */}
      {isMagnifierActive && (
        <div
          className="fixed border-2 border-gray-300 rounded-full shadow-lg pointer-events-none"
          style={{
            width: "150px",
            height: "150px",
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            transform: `translate(-50%, -50%)`,
            left: `${magnifierPosition.x}px`,
            top: `${magnifierPosition.y}px`,
            zIndex: 1000,
          }}
        ></div>
      )}
    </div>
  );
};

export default AccessibilityToolbar;
