import React from 'react';

const useOutSideClick = (ref, cb) => {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOutSideClick;
