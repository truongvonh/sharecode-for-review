import React, { memo } from 'react';
import { string, number } from 'prop-types';
import Card from '../Dashboard/Card/index';

const CardView = ({ title, total, icon }) => {
  return (
    <div className="card-social card">
      <Card title={title} total={total} icon={icon}/>
    </div>
  );
};

CardView.propTypes = {
  title: string,
  total: number,
  icon: string,
  nameFirst: string,
  nameSecond: string,
  numberFirst: number,
  numberSecond: number,
  percentFirst: string,
  percentSecond: string
};

export default memo(CardView);
