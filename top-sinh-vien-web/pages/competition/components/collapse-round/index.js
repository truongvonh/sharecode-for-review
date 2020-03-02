import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import Clock from '../clock';

import './styles.scss';

class CollapseRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DayFinnish: '2020-01-31'
    };
  }

  render() {
    return (
      <div>
        <CustomButton
          onSetActive={this.props.onSetActive}
          roundName={this.props.roundName}
          active={this.props.active}
          id={this.props.id}
        />
        <Collapse isOpen={this.props.active}>
          <Clock DayFinnish={this.state.DayFinnish} />
          <div className="row justify-content-center">
            <img className="pt-4 w-100 pl-3 pr-3 pb-4" src="/static/img/banner-ads.png" alt="banner-ads" />
          </div>
          {this.props.listMatch}
        </Collapse>
      </div>
    );
  }
}

const CustomButton = props => {
  if (props.active === false) {
    return (
      <button
        className="btn-qualifying-round fz-18"
        onClick={() => {
          props.onSetActive(props.id);
        }}
      >
        {props.roundName}
      </button>
    );
  } else
    return (
      <button
        className="btn-qualifying-round active fz-18"
        onClick={() => {
          props.onSetActive(props.id);
        }}
      >
        {props.roundName}
      </button>
    );
};

export default CollapseRound;
