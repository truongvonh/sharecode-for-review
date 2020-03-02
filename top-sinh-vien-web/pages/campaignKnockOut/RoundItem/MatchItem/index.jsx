import SchoolTeam from 'pages/campaignKnockOut/RoundItem/SchoolTeam';
import { getNestedObjectSafe } from 'utils/helper';
import { Button } from 'reactstrap';
import React from 'react';
import { Link } from 'routes/routesConfig';
import { bool, func, object } from 'prop-types';
import { NAVIGATE_URL } from 'constants/url';
import './style.scss';

const MatchItem = ({ matchData, isSelectMatch = false, onSelectMatch = () => null }) => {

  const viewMatchButton = () => (
    <div className="view-match-btn p-3 d-flex flex-column align-items-center">
      <p className="color-main font-weight-bold">Trận {getNestedObjectSafe(matchData, ['battle', 'battle_id'])}</p>
      <Button className="bg-link text-uppercase border-0 font-weight-bold fz-14">vote</Button>
    </div>
  );

  return (
    <div className="all-match-of-round row align-items-center mb-xl-3">
      <SchoolTeam teamNumber={'school_team_1'}
                  matchData={matchData}
                  voteNumber={matchData.vote_team_1} />
      <div className="col-12 d-flex align-items-center col-xl-2 justify-content-center">
        { !isSelectMatch ? (
          <Link route={NAVIGATE_URL.CAMPAIGN_MATCH_PAGE.URL(matchData._id)} prefetch>
            <a className="d-block w-100">{ viewMatchButton() }</a>
          </Link>
        ) :
          <div className="w-100" onClick={() => onSelectMatch(matchData._id)}>
            { viewMatchButton() }
          </div>
        }

      </div>
      <SchoolTeam teamNumber={'school_team_2'}
                  voteNumber={matchData.vote_team_2}
                  matchData={matchData}
                  isReverse />
    </div>
  );
};

MatchItem.propTypes = {
  matchData: object,
  onSelectMatch: func,
  isSelectMatch: bool
};

export default React.memo(MatchItem);
