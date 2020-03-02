import React from 'react';
import ImageWithFallback from 'components/ImageWithFallback';
import Link from 'next/link';
import DataFound from 'components/dataFound';
import { useRouter } from 'next/router';

import './style.scss';
import { object } from 'prop-types';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { ALL_NAME_ROUNDS } from 'constants/common';
import { NAVIGATE_URL } from 'constants/url';
import { getNestedObjectSafe, stringDate } from 'utils/helper';
import { useActions } from 'hooks/useActions';
import { toggleLoginModal } from 'redux/common/actions';
import { Router } from 'routes/routesConfig';
import { shallowEqual, useSelector } from 'react-redux';

const Happening = ({ campaignData }) => {

  const [matchId, setMatchId] = React.useState(null);
  const toggleLoginAction = useActions(toggleLoginModal, null);
  const user = useSelector(store => store.auth.user, shallowEqual);

  const onGotoMatchHappening = async (type_id) => {
    try {
      const roundOfType = await CAMPAIGN_ENDPOINT.GET_ALL_ROUND_OF_TYPE({ type_id });
      const round32 = roundOfType.find(round => round.name_round === ALL_NAME_ROUNDS.ROUND_32);
      // const result = await CAMPAIGN_ENDPOINT.LIST_MATCH_BY_ROUND({ type_id, round_id: round32._id });
      // const { _id: round_id, name_round } = result.round;
      Router.pushRoute(
        NAVIGATE_URL.CAMPAIGN_KICK_START_PAGE.URL(type_id, round32._id),
        NAVIGATE_URL.CAMPAIGN_KICK_START_PAGE.AS,
      );
    } catch (e) {
      if (e === 'TOKEN_INVALID') toggleLoginAction();
    }
  };

  // React.useEffect (() => {
  //   if (matchId) {
  //     onGotoMatchHappening(matchId);
  //   }
  // }, [user, matchId]);

  const onGotoMatch = React.useCallback(async (item) => {
      setMatchId(item._id);
      await onGotoMatchHappening(item._id);
  }, []);

  return (
    <div className="row">
      { campaignData.length ? campaignData.map((item, index) => (
        <div className="col-lg-6 mb-4" key={index}>
          <div className="wrapper-competition cursor-pointer flex-column p-4"
               onClick={() => onGotoMatch(item)}>
            <div className="wrapper-img-competition">
              <ImageWithFallback
                    className="img-competition w-100"
                    alt="img-competition-cover"
                    src={getNestedObjectSafe(item, ['cover', 0, 'origin'])}
                  />
            </div>
            <div className="wrapper-title-item pt-3">
              <Link href={NAVIGATE_URL.GROUP_DETAIL_PAGE.URL(item._id)}>
                <a>
                  <h4 className="item-title font-weight-bold fz-24">{item.name}</h4>
                </a>
              </Link>
              <p className="item-date fz-16">
                { stringDate(item.startTime) } -
                { item.endTime ? stringDate(item.endTime) : '' }
              </p>
            </div>
          </div>
        </div>
      )) : <DataFound /> }
    </div>
  );
};

Happening.propTypes = {
  campaignData: object
};

export default Happening;
