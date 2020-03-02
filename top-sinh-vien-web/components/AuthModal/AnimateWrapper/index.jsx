import React from 'react';
import { bool, element, func, string } from 'prop-types';
import { Animated } from 'react-animated-css';

const AnimateWrapper = ({ animateDirection, children, className = 'd-flex flex-column', ...props }) => {
  return (
    <Animated  animationIn={`${animateDirection ? 'fadeInLeft' : 'fadeInRight'}`}
               animationOut={`${animateDirection ? 'fadeOutLeft' : 'fadeOutRight'}`}
               animationInDuration={1000}
               animationOutDuration={1000}
               className={className}
               { ...props }>
      {children}
    </Animated>
  );
};

AnimateWrapper.propTypes = {
  animateDirection: bool,
  className: string,
  children: element
};

export default React.memo(AnimateWrapper);
