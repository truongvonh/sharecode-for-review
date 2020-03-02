import React, { useEffect, useState } from 'react';
import SelectSearchBox from 'components/SelectSearchBox';
import { Col, Row } from 'react-bootstrap';
import { func, string } from 'prop-types';
import { BANNER_CONSTANT } from 'constant';
import { useActions } from '../../../hooks/useActions';
import { useSelector, shallowEqual } from 'react-redux';
import { getYearCreate } from '../../../store/Dashboard/actions';

const FormInput = ({
  handleChangeType = () => null,
  handleChangeMonth = () => null,
  handleChangeYear = () => null
}) => {
  const getYearCreateAction = useActions(getYearCreate, null);
  const getAllYearCreate = useSelector(store => store.statistical.allYearCreateUser, shallowEqual);
  const [isShowMonth, setIsShowMonth] = useState(false);
  const [isShowYear, setIsShowYear] = useState(false);

  /* Handle */
  useEffect(() => {
    getYearCreateAction();
  }, []);

  const handleChange = item => {
    if (item && item.value === 'month') {
      setIsShowMonth(true);
      setIsShowYear(false);
    } else if (item && item.value === 'year') {
      setIsShowYear(true);
      setIsShowMonth(true);
    } else {
      setIsShowMonth(false);
      setIsShowYear(false);
    }
    handleChangeType(item && item);
  };

  return (
    <>
      <Row>
        <Col xs={4}>
          <SelectSearchBox
            isMulti={false}
            options={BANNER_CONSTANT.TYPE}
            placeholder="Chọn loại (mặc định là ngày)"
            classes="flex-shrink-0"
            onChange={handleChange}
            keyLabel="fullName"
          />
        </Col>
        {!isShowMonth ? (
          <Col xs={4}>
            <SelectSearchBox
              isMulti={false}
              options={BANNER_CONSTANT.MONTH}
              placeholder="Chọn tháng"
              classes="flex-shrink-0"
              onChange={handleChangeMonth}
              keyLabel="fullName"
            />
          </Col>
        ) : null}
        {!isShowYear ? (
          <Col xs={4}>
            {getAllYearCreate && (
              <SelectSearchBox
                isMulti={false}
                options={getAllYearCreate}
                placeholder="Chọn năm"
                classes="flex-shrink-0"
                onChange={handleChangeYear}
                keyLabel="fullName"
              />
            )}
          </Col>
        ) : null}
      </Row>
    </>
  );
};

FormInput.propTypes = {
  handleChangeType: func,
  handleChangeMonth: func,
  handleChangeYear: func
};

export default React.memo(FormInput);
