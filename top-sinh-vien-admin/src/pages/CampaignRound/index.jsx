import React, { memo, useEffect, useState } from 'react';
import { func, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button, Col, Row } from 'react-bootstrap';
import Card from '../../App/components/MainCard';
import { connect, shallowEqual, useSelector } from 'react-redux';
import SelectBox from 'components/SelectBox';
import CampaignBannersModal from 'components/CampaignBannersModal';
import { addBannerToMatchOrRound, getRoundOfType, getType, editBannersOfMatchOrRound } from 'store/campaign/actions';
import AllRounds from './Components/AllRounds';
import UpdateRoundModal from './Components/UpdateRoundModal';
import useModal from '../../hooks/useModal';
import { CAMPAIGN_EVENTS_ENDPOINT } from '../../api/constant.js';
import { EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS } from '../../store/campaign/constant';

const CampaignRound = ({
  editBannersOfMatchOrRound,
  isAuthenticated,
  getType,
  getRoundOfType,
  addBannerToMatchOrRound
}) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [roundItem, setRoundItem] = useState({});
  const [typeId, setTypeId] = useState('');
  const [bannerDetail, setBannerDetail] = useState({});
  const [typeScreen, setTypeScreen] = useState('');

  const types = useSelector(store => store.campaign.types, shallowEqual);
  const status = useSelector(store => store.campaign.status, shallowEqual);
  const roundOfType = useSelector(store => store.campaign.roundOfType, shallowEqual);
  const [bannerModal, toggleBannerModal, closeBannerModal] = useModal(false);
  useModal();

  useEffect(() => {
    getType();
  }, [isAuthenticated]);

  const onCloseBannerModal = () => {
    closeBannerModal();
    setBannerDetail({});
  };

  useEffect(() => {
    if (status === EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS) onCloseBannerModal();
  }, [status]);

  useEffect(() => {
    if (types.length) {
      const type_id = types[0]._id;
      setTypeId(type_id);
      getRoundOfType({ type_id });
    }
  }, [types]);

  const onSelectType = e => {
    const type_id = e.target.value;
    getRoundOfType({ type_id });
    setTypeId(type_id);
  };

  const onEditRound = round => {
    setRoundItem(round);
    setToggleModal(!toggleModal);
  };

  const onCloseModal = () => setToggleModal(false);

  const onGetRoundBanner = async (item, typeScreen) => {
    const { _id: id } = item;
    setTypeScreen(typeScreen);
    try {
      const bannerDetail = await CAMPAIGN_EVENTS_ENDPOINT.GET_DETAIL_BANNER_OF_MATCH_OR_ROUND({ id });
      if (bannerDetail) setBannerDetail(bannerDetail);
    } catch (e) {
      console.log('this has error');
    }
    toggleBannerModal();
  };

  return (
    <>
      <Row>
        <Col>
          <Card title="Danh cách các vòng đấu cho từng thể loại">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="col-12 col-md-4 col-xl-3">
                <h5 className="font-weight-bold">Thể loại:</h5>
                <SelectBox className="w-100" onChange={onSelectType} allSelect={types} />
              </div>
              <Button onClick={toggleBannerModal} variant="outline-primary">
                Add campaign banners
              </Button>
            </div>
            <div className="mt-3">
              <AllRounds onEditRound={onEditRound} allRounds={roundOfType} onGetRoundBanner={onGetRoundBanner} />
            </div>
            <div className="test">
              <UpdateRoundModal roundItem={roundItem} show={toggleModal} onHide={onCloseModal} />
            </div>
          </Card>
        </Col>
      </Row>
      <CampaignBannersModal
        typeScreen={typeScreen}
        typeId={typeId}
        status={status}
        show={bannerModal}
        options={roundOfType}
        type_apply="ROUND_BANNER"
        onHide={onCloseBannerModal}
        bannerDetail={bannerDetail}
        addBannerToMatchOrRound={addBannerToMatchOrRound}
        editBannersOfMatchOrRound={editBannersOfMatchOrRound}
      />
    </>
  );
};

CampaignRound.propTypes = {
  isAuthenticated: object,
  getRoundOfType: func,
  addBannerToMatchOrRound: func,
  editBannersOfMatchOrRound: func,
  getType: func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getType, getRoundOfType, addBannerToMatchOrRound, editBannersOfMatchOrRound }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(memo(CampaignRound));
