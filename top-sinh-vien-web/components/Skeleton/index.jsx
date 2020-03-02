import React from 'react';
import { bool, number, string } from 'prop-types';

const SkeletonLoading = ({ width, height, maxWidth = '100%', count = 1, isCircle = false }) => {

  const styles = React.useMemo(() => ({
    width,
    height,
    maxWidth,
    borderRadius: isCircle ? '50%' : '10px'
  }), [width, height, isCircle]);

  return (
    count === 1
      ?
        <div className="skeleton-loading"
           style={styles} />
      :
      Array.from(Array(count).keys()).map(item => (
        <div className={`skeleton-loading ${item !== count - 1 ? 'mb-2' : ''}`}
             key={item}
             style={styles} />
      ))

  );
};

SkeletonLoading.propTypes = {
  width: string,
  height: string,
  maxWidth: string,
  count: number,
  isCircle: bool
};

export default React.memo(SkeletonLoading);
