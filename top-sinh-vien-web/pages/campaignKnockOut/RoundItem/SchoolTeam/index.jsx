import { Link } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';
import { getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import { Button } from 'reactstrap';
import React from 'react';
import { bool, number, object } from 'prop-types';

const SchoolTeam = ({ matchData, teamNumber, voteNumber }) => (
  <div className={'col-12 d-flex align-items-center col-xl-5'}>
    <Link route={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(getNestedObjectSafe(matchData, [teamNumber, '_id']))}>
      <a className="font-weight-bold">
        { getNestedObjectSafe(matchData, [teamNumber, 'name']) }
      </a>
    </Link>
    <div className={'avatar-team flex-shrink-0'}>
      <Link route={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(getNestedObjectSafe(matchData, [teamNumber, '_id']))}>
        <a className="mx-3 d-block">
          <ImageWithFallback src={getNestedObjectSafe(matchData, [teamNumber, 'avatar', 0, 'origin'])}
                             alt={getNestedObjectSafe(matchData, [teamNumber, 'name'])} />
        </a>
      </Link>
    </div>
    <Link route={NAVIGATE_URL.CAMPAIGN_MATCH_PAGE.URL(matchData._id)} prefetch>
      <a>
        <Button className="bg-main text-white font-weight-bold border-0">
          <span>{voteNumber}</span>
          <br/>
          <span className="fz-12">vote</span>
        </Button>
      </a>
    </Link>
  </div>
);

SchoolTeam.propTypes = {
  matchData: object,
  teamNumber: number,
  voteNumber: number,
  isReverse: bool
};

export default React.memo(SchoolTeam);
