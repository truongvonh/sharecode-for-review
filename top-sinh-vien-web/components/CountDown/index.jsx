import React, { Component } from 'react';
import { string } from 'prop-types';
import './style.scss';

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    let result = String(value);
    while (value.length < 2) {
      result = '0' + value;
    }
    return result;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown d-flex justify-content-center">
        <div className="countdown-wrapper d-flex align-items-start justify-content-around p-3 bg-white">
          <div className="Countdown-col">
            <div className="Countdown-col-element text-center">
              <strong className="font-weight-bold fz-30 color-link">{this.addLeadingZeros(countDown.days)}</strong>
              <p className="mb-0 color-link font-weight-bold">Ngày</p>
            </div>
          </div>
          <p className="mb-0 color-link font-weight-bold fz-30">:</p>
          <div className="Countdown-col">
            <div className="Countdown-col-element text-center">
              <strong className="font-weight-bold fz-30 color-link">{this.addLeadingZeros(countDown.hours)}</strong>
              <p className="mb-0 color-link font-weight-bold">Giờ</p>
            </div>
          </div>
          <p className="mb-0 color-link font-weight-bold fz-30">:</p>
          <div className="Countdown-col">
            <div className="Countdown-col-element text-center">
              <strong className="font-weight-bold fz-30 color-link">{this.addLeadingZeros(countDown.min)}</strong>
              <p className="mb-0 color-link font-weight-bold">Phút</p>
            </div>
          </div>
          <p className="mb-0 color-link font-weight-bold fz-30">:</p>
          <div className="Countdown-col">
            <div className="Countdown-col-element text-center">
              <strong className="font-weight-bold fz-30 color-link">{this.addLeadingZeros(countDown.sec)}</strong>
              <p className="mb-0 color-link font-weight-bold">Giây</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Countdown.propTypes = {
  date: string.isRequired
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;
