import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { array, func, number } from 'prop-types';
import AnimateWrapper from 'components/AuthModal/AnimateWrapper';

const ModalButton = (props) => {
  const { modal, toggle, setSelect, cancel, select, filterOption } = props;
  return (
    <div >
      <Modal className="auth-modal" isOpen={modal}>
        <ModalHeader toggle={cancel} />
        <ModalBody className="bg-white rounded shadow-lg overflow-hidden ">
          <div className="">
            <div className="d-flex">
              <div>
                <spans className="text-secondary fz-16" onClick={cancel}>Hủy</spans>
              </div>
              <div className=" mb-0 ">
                <h4 className="filter-button-item fz-20 font-weight-bold  color-font ">Lọc địa điểm</h4>
              </div>
              <div>
                <span className="text-secondary fz-16" onClick={toggle}>Áp dụng</span>
              </div>
            </div>
            <hr />
            <AnimateWrapper>
              <div className=" pretty p-default p-round ">
                {filterOption && filterOption.map((item, index) =>
                  <RadioCustom key={index} setSelect={setSelect} select={select} item={item} />
                )}
              </div>
            </AnimateWrapper>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
const RadioCustom = props => {
  const { setSelect, item, select } = props;
  const [checked, setChecked] = useState(select.includes(item.value));
  const handleCheck = () => {
    if (!checked) {
      setSelect([...select, item.value]);
      setChecked(true);
    }
    else {
      const arr = select;
      arr.splice(select.indexOf(item.value), 1);
      setSelect(arr);
      setChecked(false);
    }
  };
  return (
    <div className="radio pt-2" >
      <label className="text-center fz-16 font-weight-bold" htmlFor={`label${item.value}`} value={item.value}>{item.label}</label>
      <input onClick={() => handleCheck()} id={`label${item.value}`} className="radio-item" type="checkbox" name="optradio" checked={checked} />
    </div>
  );
};
ModalButton.propTypes = {
  toggle: func,
  modal: func,
  select: number,
  setSelect: func,
  cancel: func,
  filterOption: array,
};

export default ModalButton;
