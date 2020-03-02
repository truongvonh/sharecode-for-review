import { useState, useEffect } from 'react';

const MORE_SIZE = 100;

const useInfinityScroll = (ref, offSetTop = MORE_SIZE) => {
  const [isLoadMore, setLoadMore] = useState(false);
  const [isBottom, setToBottom] = useState(false);

  useEffect(() => {
    if (isBottom && !isLoadMore) setLoadMore(true);
  }, [isBottom, isLoadMore]);

  useEffect(() => {
    const refElement = ref && ref.current;

    function handleScroll() {
      const { scrollHeight, scrollTop, clientHeight } = ref.current;
      const checkGotoBottom = scrollTop + clientHeight + offSetTop > scrollHeight;
      setToBottom(checkGotoBottom);
    }
    if (refElement !== null) {
      refElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (refElement !== null) {
        refElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return {
    isLoadMore,
    isBottom,
    setLoadMore
  };
};

export default useInfinityScroll;
