import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getFilterMember } from '../../../store/Dashboard/actions';
import { useActions } from '../../../hooks/useActions';
import { useSelector, shallowEqual } from 'react-redux';
import FormInput from '../FormInput';

const FilterMember = ({ data, label, name }) => {
  const getFilterMemberAction = useActions(getFilterMember, null);
  const allFilterStatistical = useSelector(store => store.statistical.filterStatistical, shallowEqual);

  let [type, setType] = useState('day');
  let [year, setYear] = useState();
  let [month, setMonth] = useState();

  /* Handle */
  useEffect(() => {
    getFilterMemberAction({ type });
  }, []);

  const handleChangeType = item => {
    setType(item ? item.value : 'day');
    getFilterMemberAction({ type: item ? item.value : 'day', month, year });
  };

  const handleChangeMonth = item => {
    setMonth(item ? item.value : '');
    getFilterMemberAction({ type, month: item ? item.value : '', year });
  };

  const handleChangeYear = item => {
    setYear(item ? item.value : '');
    getFilterMemberAction({ type, month, year: item ? item.value : '' });
  };

  const defaultData = {
    labels: !!allFilterStatistical && allFilterStatistical.map(item => item._id),
    datasets: [
      {
        label: 'Thống kê user',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#3ebfea',
        borderColor: '#3ebfea',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 5,
        data: !!allFilterStatistical && allFilterStatistical.map(item => item.sum)
      }
    ]
  };

  return (
    <>
      <FormInput
        handleChangeType={handleChangeType}
        handleChangeMonth={handleChangeMonth}
        handleChangeYear={handleChangeYear}
      />
      <Bar height={100} data={defaultData} />
      <h4 style={{ textAlign: 'center', padding: '5px' }}>Thống kê thành viên theo biểu đồ cây</h4>
    </>
  );
};

export default React.memo(FilterMember);
