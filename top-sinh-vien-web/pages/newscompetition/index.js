import React from 'react';
import Happening from './component/happening';
import Happened from './component/happened';
import { useRouter } from 'next/router';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { CAMPAIGN } from 'constants/common';

//  Import style
import './newscompetition.scss';

//component
import Head from 'components/common/head';
import { NAVIGATE_URL } from 'constants/url';
import { object, string } from 'prop-types';
import { Router } from 'routes/routesConfig';

function Newscompetition({ status, campaignData }) {

  const [selectStatus, setSelectStatus] = React.useState(status);
  const [selectCampaignData, setSelectCampaignData] = React.useState(campaignData);

  const getCampaign = async ({ status }) => {
    try {
      const data = await CAMPAIGN_ENDPOINT.LIST_CAMPAIGN({ status });
      setSelectCampaignData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickStatus = async text => {
    setSelectStatus(text);
    Router.pushRoute(
      NAVIGATE_URL.CAMPAIGN_TYPE_PAGE.URL(text),
      NAVIGATE_URL.CAMPAIGN_TYPE_PAGE.AS
    );
    try {
      await getCampaign({ status: text });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head title={status}/>
      <div
        className="wrapper-btn-competition d-flex justify-content-center align-items-center mb-4">
        {CAMPAIGN.ALL_STATUS.map((item, index) => (
          <button
            key={index}
            onClick={() => onClickStatus(item)}
            type="button"
            className={`btn btn-competition fz-14 font-weight-bold mx-2 mb-2 ${selectStatus.toUpperCase() === item && 'btn-active'}`}
          >
            {CAMPAIGN.ALL_TEXTS[index]}
          </button>
        ))}
      </div>
      {status === 'HAPPENED' ?
        <Happened campaignData={selectCampaignData}/> :
        <Happening campaignData={selectCampaignData}/>
      }
    </>
  );
}

Newscompetition.getInitialProps = async ({ req, query, reduxStore }) => {
  let { status } = query;
  const store = reduxStore.getState();
  const { user } = store.auth;
  let campaignData = {};
  status === 'true' ? status = CAMPAIGN.ALL_STATUS[3] : status;

  let options = {};

  if(!process.browser) {
    options = {
      headers: { cookie: req.headers.cookie }
    };
  }

  try {
    campaignData = !user ?
      await CAMPAIGN_ENDPOINT.LIST_CAMPAIGN({ status })  :
      await CAMPAIGN_ENDPOINT.LIST_CAMPAIGN({ status, ...options }) ;
  } catch (e) {
    console.log('error campaign', e);
  }

  return {
    status,
    campaignData
  };
};

Newscompetition.propTypes = {
  status: string,
  campaignData: object
};

export default Newscompetition;
