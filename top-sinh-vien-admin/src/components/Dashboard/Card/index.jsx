import React, { memo } from 'react';
import { string, number } from 'prop-types';

const Card = ({ title, total, icon }) => {
  return (
    <div className="border-bottom card-body">
      <div className="row align-items-center justify-content-center">
        <div className="col-auto">
          <i className={`feather icon-${icon} text-primary f-36`}></i>
        </div>
        <div className="col text-right">
          <h3>{total}</h3>
          <h5 className="text-c-green mb-0"> <span className="text-muted">{title}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: string,
  total: number,
  icon: string
};

export default memo(Card);
