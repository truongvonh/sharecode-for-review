import { ALL_INTERACT_CONTENT } from 'constants/common';
import SvgIcons from 'components/SvgIcons';
import { Link } from 'routes/routesConfig';
import i18n from 'locales/i18n';
import React from 'react';
import { bool, func, object, string } from 'prop-types';
import './style.scss';
import { checkIsDetailLocationPage, checkIsDetailSchoolPage, getNestedObjectSafe } from 'utils/helper';
import { Animated } from 'react-animated-css';
import { NAVIGATE_URL } from 'constants/url';

const VoteAction = ({ objItem, user = null, isNewFeed = false, onVoteDocument = () => null, postId }) => {
  const onCheckVote = () => {
    if (isNewFeed) onVoteDocument(objItem.type, getNestedObjectSafe(objItem, ['impactObj', 'linkDetailPost']));
    else onVoteDocument(objItem._id);
  };
  const checkDetailPage = React.useMemo(() => {
    return checkIsDetailSchoolPage(objItem.type)
      ? NAVIGATE_URL.DETAIL_SCHOOL_REVIEW.URL(postId, objItem.type)
      : checkIsDetailLocationPage(objItem.type)
      ? NAVIGATE_URL.DETAIL_LOCATION_REVIEW.URL(postId, objItem.type)
      : NAVIGATE_URL.NEW_DETAIL_PAGE.URL(postId, objItem.type);
  }, [postId, objItem]);

  return (
    <ul
      className={`${objItem.voted &&
        user &&
        'voted'} interactive-wrapper d-flex justify-content-between pl-0 mt-4 mb-3`}
    >
      {ALL_INTERACT_CONTENT.ALL_ICONS.map((icons, index) => (
        <li key={index} className="cursor-pointer d-flex align-items-center" onClick={() => !index && onCheckVote()}>
          <div className={`mr-1 ${!index ? 'heart-icon' : ''}`}>
            <Animated
              animationIn={!index ? 'bounceIn' : false}
              animationOut="bounce"
              style={!index && { pointerEvents: 'auto' }}
              isVisible={!index && objItem.voted}
            >
              <SvgIcons noHover fileName={icons} />
            </Animated>
          </div>
          <span className="d-inline-block mr-1">{objItem[ALL_INTERACT_CONTENT.ALL_PROPERTY[index]]}</span>
          <span>
            {index === 1 ? (
              isNewFeed ? (
                <Link route={checkDetailPage}>
                  <a className="color-font">{i18n.t(`interact.${ALL_INTERACT_CONTENT.ALL_TEXT[index]}`)}</a>
                </Link>
              ) : (
                i18n.t(`interact.${ALL_INTERACT_CONTENT.ALL_TEXT[index]}`)
              )
            ) : (
              i18n.t(`interact.${ALL_INTERACT_CONTENT.ALL_TEXT[index]}`)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
};

VoteAction.propTypes = {
  objItem: object,
  user: object,
  isNewFeed: bool,
  onVoteDocument: func,
  postId: string
};

export default React.memo(VoteAction);
