import React from 'react';
import { string } from 'prop-types';

const
  IonicIcons = ({ name, ...props }) => {
  return (
    <i { ...props } className={`border-0 p-0 ${name}`} />
  );
};

IonicIcons.propTypes = {
  name: string
};

export default IonicIcons;
