// ClickOutsideWrapper.js
import React, { useEffect, useRef } from 'react';

const ClickOutsideWrapper = ({ onClose, children }) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return <div ref={ref}>{children}</div>;
};

export default ClickOutsideWrapper;
