import useModal from 'hooks/useModal';
import React from 'react';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { Link } from 'routes/routesConfig';
import { fakeArrayForPLaceHolder, getNestedObjectSafe, isNearUntilToday } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import { Collapse } from 'reactstrap';
import { object, string } from 'prop-types';
import PlaceHolderMatch from 'pages/campaignKnockOut/PlaceHolderMatch';
import MatchItem from 'pages/campaignKnockOut/RoundItem/MatchItem';
import Countdown from 'components/CountDown';

const INIT_MATCH = {
  bannersWeb: [],
  result: []
};

const RoundItem = ({ roundData, type_id }) => {

  const [isCollaped, toggleCollaped] = useModal(false);
  const [matchByRound, setMatchByRound] = React.useState(INIT_MATCH);
  const [loadingMatch, setLoadingMatch] = React.useState(true);

  const onGetAllMatch = async () => {
    try {
      const allMatch = await CAMPAIGN_ENDPOINT.LIST_MATCH_BY_ROUND({ type_id, round_id: roundData._id });
      setMatchByRound(allMatch);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingMatch(false);
    }
  };

  const onToggleMatch = () => {
    toggleCollaped();
    if (!matchByRound.length)
      setTimeout(async() => {
        await onGetAllMatch();
      }, 500);
  };

  const checkAndRenderAds = (index = 0) =>
    ( getNestedObjectSafe(matchByRound, ['banners', index, 'url']) || []).length > 0 &&
    ( <Link route={getNestedObjectSafe(matchByRound, ['banners', index, 'link'])}>
      <a target="_blank">
        <div className={`ads-round-img text-center ${index ? 'mb-3' : ''}`}>
          <ImageWithFallback src={getNestedObjectSafe(matchByRound, ['banners', index, 'url', 0, 'origin' ])} />
        </div>
      </a>
    </Link> );

  return (
    <div className="round-wrapper mb-4">
      <div className={`${!isCollaped ? ' bg-white color-main' : 'bg-main text-white' } mb-3 rounded shadow text-center py-3 cursor-pointer`}
           onClick={onToggleMatch}>
        <h3 className="fz-18 font-weight-bold mb-0">{roundData.title}</h3>
      </div>
      <Collapse isOpen={isCollaped}>
        <div className="container">
          { isNearUntilToday(roundData.startTime) && (
            <div className="my-3">
              <Countdown date={new Date(roundData.startTime)} />
            </div>
          ) }
          { checkAndRenderAds(1) }
          { (matchByRound.result.length > 0 && !loadingMatch) && matchByRound.result.map((match, index) => (
            <MatchItem matchData={match} key={index} />
          )) }
          { loadingMatch && fakeArrayForPLaceHolder(roundData).map((_, index) => <PlaceHolderMatch key={index}/> ) }
          { checkAndRenderAds(0) }
        </div>
      </Collapse>
    </div>

  );
};

RoundItem.propTypes = {
  roundData: object,
  type_id: string,
};

export default React.memo(RoundItem);
