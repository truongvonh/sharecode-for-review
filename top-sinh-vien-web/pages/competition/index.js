import React, { Component } from 'react';
import Banner from './components/banner';
import Teams from './components/between-2-team';
import CollapseRound from './components/collapse-round';
import Comment from 'components/comment';
import Head from 'components/common/head';

// style
import './styles.scss';

class competition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRound: [
        {
          id: 1,
          roundName: 'Chung kết',
          active: false
        },
        {
          id: 2,
          roundName: 'Bán kết',
          active: false
        },
        {
          id: 3,
          roundName: 'Tứ kết',
          active: false
        },
        {
          id: 4,
          roundName: 'Vòng 1/8',
          active: false
        },
        ,
        {
          id: 5,
          roundName: 'Vòng 1/16',
          active: false
        }
      ]
    };
  }

  listMatch = [
    {
      id: 1,
      university1: 'Đại học tài chính kế toán',
      pathImgUniversity1: '/static/img/avatar-user-2.png',
      vote1: '1632',
      university2: 'Đại học Đà Nẵng',
      pathImgUniversity2: '/static/img/avatar-user-2.png',
      vote2: '530',
      round: 2
    },
    {
      id: 2,
      university1: 'Đại học kiến trúc',
      pathImgUniversity1: '/static/img/avatar-user-2.png',
      vote1: '3004',
      university2: 'Đại học Duy Tân',
      pathImgUniversity2: '/static/img/avatar-user-2.png',
      vote2: '600',
      round: 1
    },
    {
      id: 3,
      university1: 'Đại học y dược',
      pathImgUniversity1: '/static/img/avatar-user-2.png',
      vote1: '122',
      university2: 'Đại học sài gòn',
      pathImgUniversity2: '/static/img/avatar-user-2.png',
      vote2: '700',
      round: 1
    },
    {
      id: 3,
      university1: 'Đại học y dược đn',
      pathImgUniversity1: '/static/img/avatar-user-2.png',
      vote1: '122',
      university2: 'Đại học TP HCM',
      pathImgUniversity2: '/static/img/avatar-user-2.png',
      vote2: '700',
      round: 3
    }
  ];

  onSetActive = id => {
    const listRound = this.state.listRound;
    listRound.filter(item => {
      if (item.id === id) {
        item.active = !item.active;
      } else {
        item.active = false;
      }
      return item;
    });
    this.setState({ listRound: listRound });
    this.setState({ roundTaget: id });
  };

  render() {
    const listMatch = this.listMatch.map((item, index) => {
      if (this.state.roundTaget && item.round == this.state.roundTaget) {
        return <Teams match={item} key={index}/>;
      }
    });

    const listRound = this.state.listRound.map((round, index) => {
      return (
        <CollapseRound
          onSetActive={this.onSetActive}
          key={index}
          roundName={round.roundName}
          listMatch={listMatch}
          id={round.id}
          active={round.active}
        />
      );
    });

    return (
      <div>
        <Head title="Cuoc thi"/>
        <Banner/>
        <div className="wrapper-button-competition d-flex justify-content-center">
          <button className="btn-elimination-round fz-12">Vòng sơ loại</button>
          <button className="btn-knock-out fz-12">Vòng Knock-out</button>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 wrapper-qualifying-round">{listRound}</div>
        </div>
        <Comment/>
      </div>
    );
  }
}

export default competition;
