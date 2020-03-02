import React from 'react';
import { element, object } from 'prop-types';
import { Button } from 'reactstrap';
import { NAVIGATE_URL } from 'constants/url';
import { Link } from 'routes/routesConfig';
import './style.scss';
import { getNestedObjectSafe } from 'utils/helper';
// import ImageModal from 'album-detail/ImageModal';
import useHandlerRound from 'hooks/useHanlderRound';
import dynamic from 'next/dynamic';

const ImageModal = dynamic(
  () => import('components/ImageModal'),
  {
    ssr: false
  }
);

const CampaignRoundWrapper = ({ children, router }) => {
  const { type_id, round_id } = router.query;
  const {
    displayImage,
    isShowImage,
    closeImage,
    detailType,
    round32,

    toggleImage,
    toggleWithSelectImage
  } = useHandlerRound(type_id);

  return (
    <>
      <ImageModal isOpen={isShowImage}
                  toggle={toggleImage}
                  close={closeImage}
                  image={displayImage}
                  title={getNestedObjectSafe(detailType, ['name'])}/>
      <div className="campaign-round-wrapper mb-4" style={{
        background: `url(${getNestedObjectSafe(detailType, ['avatarWeb', 0, 'origin'])}) no-repeat center center`,
      }}>
        <div className="d-flex justify-content-end p-3">
          <Button outline
                  color="primary"
                  onClick={() => toggleWithSelectImage('ruleWeb')}
                  className="bg-white color-main fz-14 bor font-weight-bold border-0  mr-3">
            Thể lệ
          </Button>
          <Button outline
                  color="primary"
                  onClick={() => toggleWithSelectImage('rewardWeb')}
                  className="bg-white color-main fz-14 bor font-weight-bold border-0 ">
            Giải thưởng
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-4 campaign-round-navigate">
        <Link route={NAVIGATE_URL.CAMPAIGN_KICK_START_PAGE.URL(type_id, round32._id)}>
          <a>
            <Button outline
                    color="secondary"
                    className={`${router.pathname === NAVIGATE_URL.CAMPAIGN_KICK_START_PAGE.AS ? 'active border-0' : ''}  mr-3  fz-14 font-weight-bold`}>
              Vòng sơ loại
            </Button>
          </a>
        </Link>

        <Link route={NAVIGATE_URL.CAMPAIGN_KNOCK_OUT_PAGE.URL(type_id, round_id)}>
          <a>
            <Button outline
                    color="secondary"
                    className={`${router.pathname === NAVIGATE_URL.CAMPAIGN_KNOCK_OUT_PAGE.AS ? 'active border-0' : ''} fz-14 font-weight-bold`}>
              Vòng knock-out
            </Button>
          </a>
        </Link>
      </div>
      {children}
    </>
  );
};

CampaignRoundWrapper.propTypes = {
  children: element,
  router: object
};

export default CampaignRoundWrapper;
