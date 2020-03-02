import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

const CountdownTimer = props => {
  const calculateTimeLeft = () => {
    const difference = +new Date(DayFinnish) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  let DayFinnish = props.DayFinnish;
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(DayFinnish));
    }, 1000);
  });

  return (
    <div className="row justify-content-center">
      <div className="col-10 col-lg-7 wrapper-clock d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p>{timeLeft.days}</p>
          <p>Ngày</p>
        </div>
        <p>:</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p>{timeLeft.hours}</p>
          <p>Giờ</p>
        </div>
        <p>:</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p>{timeLeft.minutes}</p>
          <p>Phút</p>
        </div>
        <p>:</p>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p>{timeLeft.seconds}</p>
          <p>Giây</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
