import React, { useEffect } from "react";

const HighContrast: React.FC = () => {
  useEffect(() => {
    // Add the high-contrast class to the body when the component is mounted
    document.body.classList.add("high-contrast-overlay");

    // Remove the high-contrast class when the component is unmounted
    return () => {
      document.body.classList.remove("high-contrast-overlay");
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default HighContrast;
