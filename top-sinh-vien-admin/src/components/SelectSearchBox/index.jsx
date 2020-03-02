import React, { memo } from 'react';
import { string, array, any, bool } from 'prop-types';
import ReactSelect from 'react-select';

const SelectSearchBox = props => {
  const { options, keyValue, keyLabel, value, isMulti, placeholder, ...rest } = props;
  const selectedObject = options.find(p => p[keyValue] === value);
  return (
    // <ReactSelect
    //   isMulti={isMulti}
    //   options={options.map(p => ({
    //     label: p[keyLabel],
    //     value: p[keyValue]
    //   }))}
    //   name="text"
    //   value={
    //     isMulti
    //       ? value
    //       : selectedObject
    //       ? {
    //           label: selectedObject[keyLabel],
    //           value: selectedObject[keyValue]
    //         }
    //       : null
    //   }
    //   {...rest}
    // />
    <ReactSelect isMulti={isMulti} options={options} value={value} name="text" placeholder={placeholder} {...rest} />
  );
};

SelectSearchBox.propTypes = {
  value: any,
  keyValue: any,
  keyLabel: any,
  isDisabled: bool,
  isClearable: bool,
  isSearchable: bool,
  options: array,
  classes: string,
  isMulti: bool
};

SelectSearchBox.defaultProps = {
  options: [],
  keyValue: '_id',
  keyLabel: 'label',
  isDisabled: false,
  isClearable: true,
  isSearchable: true,
  classes: ''
};

export default memo(SelectSearchBox);
