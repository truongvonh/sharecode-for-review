import React from 'react';

import './style.scss';
import { func, object } from 'prop-types';
import { getNestedObjectSafe } from 'utils/helper';
import { Link } from 'routes/routesConfig';
import ImageWithFallback from 'components/ImageWithFallback';
import { NAVIGATE_URL } from 'constants/url';
import SvgIcons from 'components/SvgIcons';

const TeamVoteInRound32 = ({ teamData, onVote = () => null }) => {

  return (

    <div className="col-12 mx-auto col-md-6 col-lg-3 mb-3 px-2 mb-3 align-items-lg-stretch">
      <div className="wrapper-item-card bg-white p-3 h-100 rounded shadow">
        <div className="wrapper-item-rank">
          <div className="img-wrapper">
            <div className="rank">
              <p className="rank-item fz-14 font-weight-bold">{getNestedObjectSafe(teamData, ['rank'])}</p>
            </div>
            <Link route={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(getNestedObjectSafe(teamData, ['team', 'school', '_id']))}>
              <a className="d-block d-flex align-items-center">
                <div className="rank-item-image overflow-hidden border-secondary rounded w-100">
                  <ImageWithFallback src={getNestedObjectSafe(teamData, ['team', 'school', 'cover', 0, 'thumb'])}
                                     alt={getNestedObjectSafe(teamData, ['team', 'school', 'name'])} />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="wrapper-item-name order-2 order-md-1">
            <h4 className="font-weight-bold name-item my-2 fz-16">
              {getNestedObjectSafe(teamData, ['team', 'school', 'name'])}
            </h4>
            <p className="address-item fz-12">
              Địa chỉ: {getNestedObjectSafe(teamData, ['team', 'school', 'address'])}
            </p>
          </div>
          <div className={`
              ${teamData.user_vote ? 'voted' : '' }
              vote-wrapper position-relative order-1 d-flex flex-row flex-md-column order-md-2 align-items-center
            `}>
            <button type="button"
                    className="btn btn-outline-light border-0 rounded-circle shadow like-btn bg-white p-0"
                    onClick={() => onVote(getNestedObjectSafe(teamData, ['team', '_id']))}>
              <SvgIcons fileName="ic_voted"
                        noHover
                        width={30}
                        height={30} />
            </button>
            <p className="mb-0 color-main font-weight-bold fz-12 text-nowrap p-2 flex-grow-1">{teamData.vote} VOTE</p>
          </div>
        </div>
      </div>
    </div>

  );
};

TeamVoteInRound32.propTypes = {
  teamData: object,
  onVote: func
};

export default React.memo(TeamVoteInRound32);
