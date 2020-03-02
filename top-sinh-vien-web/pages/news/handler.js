import React from 'react';
import { ADS_ENDPOINT, AFFILIATE_ENDPOINT } from 'constants/endpoints';
import { chunkArray } from 'utils/helper';

const INIT_AFFILIATE_PAGINATION = {
  page: 1,
  limit: 100
};

const newsHandler = () => {
  const [affiliate, setAffiliate] = React.useState([]);
  const [affiliatePagination, setAffiliatePagination] = React.useState(INIT_AFFILIATE_PAGINATION);
  const [affiliateLoading, setAffiliateLoading] = React.useState(true);

  const getAllAffiliate = async ({ page = INIT_AFFILIATE_PAGINATION.page, limit = INIT_AFFILIATE_PAGINATION.limit }) => {
    try {
      const data = await AFFILIATE_ENDPOINT.ALL_AFFILIATE({ page, limit });
      setAffiliate(data);
    } catch (e) {
      console.log(e);
    } finally {
      setAffiliateLoading(false);
    }
  };

  React.useEffect(() => {
    getAllAffiliate({ });
  }, []);

  const [allAds, setAllAds] = React.useState([]);
  const [adsLoading, setAdsLoading] = React.useState(true);

  const getAllAds = async () => {
    try {
      const data = await ADS_ENDPOINT.ALL_BANNER_ADS();
      setAllAds(data);
    } catch (e) {
      console.log(e);
    } finally {
      setAdsLoading(false);
    }
  };
  React.useEffect(() => {
    getAllAds();
  }, []);

  return {
    affiliate,
    affiliateLoading,

    allAds: React.useMemo(() => chunkArray(allAds, 1), [allAds]),
    adsLoading
  };
};

export default newsHandler;
