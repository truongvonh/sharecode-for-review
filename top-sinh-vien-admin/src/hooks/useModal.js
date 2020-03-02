import { useState } from 'react';

const useModal = initState => {
  const [isShowing, setIsShowing] = useState(initState);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  const close = () => setIsShowing(false);

  return [isShowing, toggle, close];
};

export default useModal;
