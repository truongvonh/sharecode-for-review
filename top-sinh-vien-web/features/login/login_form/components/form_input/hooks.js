import { useState } from 'react';

const useInput = (field, onChangeText, validator) => {
  const [state, setState] = useState({ [field]: '' });
  const [errorState, setErrorState] = useState({ error: false, errorMessage: '' });

  const handleValidator = (text = state[field]) => {
    let error = true,
      errorMessage = '';

    if (validator) {
      const validation = validator(text);
      [error, errorMessage] = [validation.error, validation.errorMessage];
    }

    setErrorState({
      error,
      errorMessage
    });

    return error;
  };

  const handleChangeText = e => {
    const text = e.target.value;

    handleValidator(text);

    setState({
      [field]: text
    });

    onChangeText({ [field]: text });
  };

  return {
    state,
    errorState,
    handleChangeText,
    handleValidator
  };
};

export default useInput;
