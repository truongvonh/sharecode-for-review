import ImageWithFallback from 'components/ImageWithFallback';
import { getNestedObjectSafe } from 'utils/helper';
import { Button } from 'reactstrap';
import { Link } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';
import { func, object, string } from 'prop-types';
import React from 'react';
import { Animated } from 'react-animated-css';

const SchoolInfor = ({ match, team = 'team_1', onVote = () => null }) => {
  return (
    <Animated animationIn="bounceIn"
              className="school-infor-wrapper"
              style={{ pointerEvents: 'auto' }}
              isVisible={true} >
      <div className="school-infor d-flex align-items-center justify-content-center px-3 flex-column">
        <div className="team-avatar mb-2">
          <ImageWithFallback src={getNestedObjectSafe(match, [team, 'school', 'avatar', 0, 'origin' ])}
                             alt={getNestedObjectSafe(match, [team, 'school', 'name' ])} />
        </div>
        <div className="text-center">
          <div className="all-vote mb-2">
            <p className="text-light font-weight-bold fz-16 mb-0">
              {getNestedObjectSafe(match, [team, 'votes'])}
            </p>
          </div>
          <Animated animationIn="bounceIn"
                    animationOut="tada"
                    style={{ pointerEvents: 'auto' }}
                    isVisible={getNestedObjectSafe(match, [team, 'is_user_status' ])} >
            <Button className={`${getNestedObjectSafe(match, [team, 'is_user_status' ]) ? 'bg-organe' : 'bg-link' }
                     text-white border-0 mb-2 font-weight-bold text-uppercase fz-14 px-3`}
                    onClick={() => onVote(getNestedObjectSafe(match, [team, '_id']))}>
              Vote
            </Button>
          </Animated>
          <Link route={NAVIGATE_URL.SCHOOL_DETAIL_PAGE.URL(getNestedObjectSafe(match, [team, 'school', '_id']))}>
            <a className="font-weight-bold text-white d-block" style={{ maxWidth: '200px' }}>
              { getNestedObjectSafe(match, [team, 'school', 'name' ]) }
            </a>
          </Link>
        </div>
      </div>
    </Animated>
  );
};

SchoolInfor.propTypes = {
  match: object,
  onVote: func,
  team: string
};

export default React.memo(SchoolInfor);
