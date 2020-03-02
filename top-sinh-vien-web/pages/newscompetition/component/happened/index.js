import React from 'react';
import { Row } from 'reactstrap';
import ImageWithFallback from 'components/ImageWithFallback';
import SvgIcons from 'components/SvgIcons';
import Truncate from 'react-truncate';

import './style.scss';
import { array, object } from 'prop-types';
import { getNestedObjectSafe, stringDate } from 'utils/helper';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { ALL_NAME_ROUNDS } from 'constants/common';
import { Router } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';

const HappendendItem = ({ campaignType }) => {

  const onGoToAllRound = async (type_id) => {
    try {
      const allRound = await CAMPAIGN_ENDPOINT.GET_ALL_ROUND_OF_TYPE({ type_id });
      const knockOutRound16 = allRound.find(round => round.name_round === ALL_NAME_ROUNDS.ROUND_16);
      Router.pushRoute(
        NAVIGATE_URL.CAMPAIGN_KNOCK_OUT_PAGE.URL(type_id, knockOutRound16._id),
        NAVIGATE_URL.CAMPAIGN_KNOCK_OUT_PAGE.AS,
      );
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <div className="col-lg-6 col-xl-4 mb-4 cursor-pointer"
         onClick={() => onGoToAllRound(campaignType._id)}>
      <div
        className="wrapper-competition-happened d-flex p-3 h-100 justify-content-center flex-column flex-sm-row shadow">
        <div className="p-0 pr-sm-4 wrapper-img-competition-cover mb-3 mb-lg-0 d-flex align-items-center">
          <ImageWithFallback
            className="img-competition"
            alt="img-competition-cover"
            src={getNestedObjectSafe(campaignType, ['avatar', 0, 'thumb'])}
          />
        </div>
        <div className="w-100 d-flex justify-content-center flex-column">

          <h4 className="fz-18 font-weight-bold mb-2">
            <Truncate lines={1} className="fz-18 font-weight-bold">
              {campaignType.name}
            </Truncate>
          </h4>

          <div className="d-flex">
            <p className="item-date fz-14 pb-2 mb-0 ml-2">{stringDate(campaignType.startTime)}</p>
            <p className="item-date fz-14 pb-2 mb-0 ">{campaignType.endTime ? stringDate(campaignType.endTime) : ''}</p>
          </div>
          <div className="pb-2 d-flex align-items-center">
            <div className="pr-2">
              <SvgIcons fileName="icon-gold-cup" width="18"/>
            </div>
            <span className="text-champion fz-14"> Quán quân:</span>
            <Truncate lines={1} className="text-champion-sub pl-2 fz-14">
              <span>{getNestedObjectSafe(campaignType, ['champion', 'school', 'name'])}</span>
            </Truncate>
          </div>

          <div className="d-flex pb-2">
            <SvgIcons fileName="icon-silver-cup" width="18"/>
            <span className="text-champion fz-14 pl-2">Á quân:</span>
            <Truncate lines={1} className="text-champion-sub pl-2 fz-14">
              <span>{getNestedObjectSafe(campaignType, ['secondBest', 'school', 'name'])}</span>
            </Truncate>
          </div>

          <div className="wrapper-icon d-flex pt-2">
            <div className="pr-2 d-flex align-items-center">
              <SvgIcons fileName="ic_like" width="15"/>
              <span className="pl-2">{campaignType.totalVote}</span>
            </div>
            <div className="pr-2 d-flex align-items-center">
              <SvgIcons fileName="ic_coment" width="15"/>
              <span className="pl-2">{campaignType.totalComment}</span>
            </div>
            <div className="pr-2 d-flex align-items-center">
              <SvgIcons fileName="ic_share" width="15"/>
              <span className="pl-2">{campaignType.share}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HappendendItem.propTypes = {
  campaignType: object
};

const Happened = ({ campaignData }) => {
  return (
    <Row>
      {campaignData.length > 0 && campaignData.map((item, index) => (
        <HappendendItem campaignType={item} key={index}/>
      ))}
    </Row>
  );
};

Happened.propTypes = {
  campaignData: array
};

export default Happened;
