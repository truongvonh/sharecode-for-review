import React, { useState, useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import SelectBox from './../SelectBox';
import { array, func, object, bool } from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomForm = ({ 
  allFields, 
  values, 
  // handleChange, 
  disabledStatus,
  handleChangeStatus, 
  handleChangeData }) => {
  
  const [state, setstate] = useState({});

  useEffect(() => {
    setstate(values);
  }, [values]);

  useEffect(() => {
    handleChangeData(state);
  }, [state]);

  const onChangeTypeText = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const onChangeData = (value, name, select = false) => {
    setstate({
      ...state,
      [name]: select ? value.target.value : value
    });
    if (name === 'status') {
      handleChangeStatus(value.target.value);
    };
  };

  const rendeFormItems = (allFields) => {

    const datePickerProps = {
      timeFormat: 'HH:mm',
      timeIntervals: 15,
      timeCaption: 'Time',
      dateFormat: 'd/MM/yyyy h:mm aa'
    };

    return allFields.length ? allFields.map((item, index) => {
      const itemName = item.name;
      
      if (item.type === 'datePicker') {
        const date = state[itemName];
        const value = typeof date !== 'undefined' ? new Date(date) : '';
        return (
          <Form.Group className="d-flex flex-column">
            <Form.Label>{item.label}</Form.Label>
            <DatePicker 
              selected={value}
              showTimeSelect={item.showTime}
              className="form-control"
              onChange={(date) => onChangeData(date, itemName)}
              {  ...datePickerProps }
            />
          </Form.Group>
        );
      }
      if (item.type === 'select') {
        return (
          <Form.Group>
            <Form.Label>{item.label}</Form.Label>
            <SelectBox 
              allSelect={item.allSelect}
              type={item.type}
              disabled={disabledStatus}
              value={state[itemName]}
              onChange={(value) => onChangeData(value, itemName, true)}
            />
          </Form.Group>
        );
      }
      return (
        <Form.Group key={index}>
          <Form.Label>{item.label}</Form.Label>
          <Form.Control
            type={ item.type || 'text' }
            name={itemName}
            value={state[itemName]}
            disabled={item.disabled}
            onChange={onChangeTypeText}
          />
        </Form.Group>
      );
    }) :  null;
  };

  return (
    <Form>
      { rendeFormItems(allFields) }
    </Form>
  );
};

CustomForm.propTypes = {
  allFields: array,
  handleChangeData: func,
  handleChange: func,
  handleChangeStatus: func,
  values: object,
  disabledStatus: bool,
  errors: object,
};

export default CustomForm;
