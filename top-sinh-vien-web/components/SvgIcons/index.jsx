import React from 'react';
import { css } from 'glamor';
import { string, number, bool } from 'prop-types';
import { ReactSVG } from 'react-svg';

const MAIN_COLOR = '#0B46AE';

const COLOR_CONTRAST = {
  TYPE_DEFAULT: {
    color: '#999999',
    hover: MAIN_COLOR
  },

  TYPE_LIGHT: {
    color: '#fff',
    hover: '#fff'
  }
};

const SvgIcons = ({
  width = 25,
  height = 25,
  colorType = 'TYPE_DEFAULT',
  fileName,
  noHover = false,
  ...props
}) => {
  const defaultSize = {
    height: height,
    width: width,
    transition: 'all 300ms ease-in-out'
  };

  const styles = css({
    ' svg': defaultSize,
    ' path': {
      ...defaultSize,
      stroke: COLOR_CONTRAST[colorType].color
    },
    ' svg:hover path, a:hover path': {
      stroke: !noHover && COLOR_CONTRAST[colorType].hover
    }
  });

  return <ReactSVG src={`/static/icons/${fileName}.svg`} { ...props }  {...styles} />;
};

SvgIcons.propTypes = {
  width: number,
  height: number,
  colorType: string,
  noHover: bool,
  fileName: string
};

export default SvgIcons;
