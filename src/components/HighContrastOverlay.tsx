// HighContrastOverlay.tsx
import React from 'react';

interface HighContrastOverlayProps {
  isVisible: boolean;
}

const HighContrastOverlay: React.FC<HighContrastOverlayProps> = ({ isVisible }) => {
  return isVisible ? (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50"
      style={{
        pointerEvents: 'none', // Prevent the overlay from blocking interaction with other elements
      }}
    ></div>
  ) : null;
};

export default HighContrastOverlay;
