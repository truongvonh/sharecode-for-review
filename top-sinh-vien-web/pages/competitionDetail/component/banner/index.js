import React, { Component } from "react"

// style
import './banner.scss'

const Round = [
  {
    round: '1/16',
  }
]

const RoundCompetitionList = [
  {
    match: 'TRẬN 33',
    University: ' ĐẠI HỌC NGOẠI THƯƠNG - FTU ',
    nextRound: ' 1/8'
  }
]

const ListVote = [
  {
    logoUniversity: '/static/img/logo-university.png',
    vote: '1297',
    nameUniversity: 'Học viện tài chính'
  }
]

class Banner extends Component {
  render() {
    return (
      <div className='wrapper-banner'>
        <div className="wrapper-banner-button banner">
          <button>Thể lệ</button>
          <button>Giải thưởng</button>
        </div>

        <div className="banner">
          {Round.map((item, index) =>
            <div className="banner-item" key={index}>
              <img className="banner-image" src="/static/img/bg-rank.png" />
              <p className="banner-detail font-weight-bold">Vòng {item.round}</p>
            </div>
          )}
        </div>

        <div className=" d-flex banner-item-detail banner">
          {ListVote.map((item, index) =>
            <div key={index} >
              <img className="rounded-circle image-logo-university" src={item.logoUniversity} />
              <p className=" item-vote font-weight-bold">{item.vote}</p>
              <button className=" btn btn-primary button-vote">VOTE</button>
              <p className="item-vote-name font-weight-bold">{item.nameUniversity}</p>
            </div>
          )}

          {RoundCompetitionList.map((item, index) =>
            <div className="text-center " key={index}>
              <p className="font-weight-bold">{item.match}</p>
              <img src="/static/img/vs.png" />
              <div className="text-center">
                <p className="text-item-banner  ">
                  Trận đấu kết thúc ! Chúc Mừng Trường
                    <span className="font-weight-bold">{item.University}</span>
                  lọt vào
                    <span> {item.nextRound}</span>
                </p>
              </div>
              <button className="btn btn-primary active button-share font-weight-bold">
                <img className="button-share-image" src="/static/img/ic_share.svg" />150 Chia sẽ
                </button>
            </div>
          )}

          {ListVote.map((item, index) =>
            <div key={index} >
              <img className="rounded-circle image-logo-university" src={item.logoUniversity} />
              <p className="item-vote font-weight-bold">{item.vote}</p>
              <button className="btn btn-primary button-vote">VOTE</button>
              <p className="item-vote-name font-weight-bold">{item.nameUniversity}</p>
            </div>
          )}

        </div>
      </div>
    );
  }
}
export default Banner;
