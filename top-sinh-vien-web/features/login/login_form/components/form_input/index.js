import React, { memo, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import useInput from 'features/login/login_form/components/form_input/hooks';

const FormInput = (field, validator, onChangeText, ref, icon, type, placeholder) => {
  const { state, errorState, handleChangeText, handleValidator } = useInput(field, onChangeText, validator);

  useImperativeHandle(ref, () => {
    return {
      isValid: () => !handleValidator()
    };
  });

  const errorClass = errorState.error ? 'has-danger' : '';

  return (
    <span className={`bmd-form-group ${errorClass}`}>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="material-icons">{icon}</i>
          </span>
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <input
            type={type}
            ref={ref}
            value={state[field]}
            onChange={handleChangeText}
            className="form-control mb-1"
            placeholder={placeholder}
          />
          {errorState.error && (
            <label id="exampleEmails-error" className="error" htmlFor="exampleEmails">
              {errorState.errorMessage}
            </label>
          )}
        </div>
      </div>
    </span>
  );
};

FormInput.propsTypes = {
  field: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  validator: PropTypes.func
};

FormInput.defaultProps = {
  icon: '',
  type: '',
  placeholder: '',
  onChangeText: () => null,
  validator: () => ({ error: false, errorMessage: '' })
};

export default memo(forwardRef(FormInput));
