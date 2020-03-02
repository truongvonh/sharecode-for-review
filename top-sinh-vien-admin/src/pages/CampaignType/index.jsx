import React, { memo, useState, useEffect } from 'react';
import { func } from 'prop-types';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect, useSelector, shallowEqual } from 'react-redux';
import Card from '../../App/components/MainCard';
import TypeModal from './Components/TypeModal';
import ListType from './Components/ListType';
import { formatDate } from '../../utils/helper';
import { addType, getType, addRound, addAvatarRuleRewardForCampaignType } from '../../store/campaign/actions';
import { ADD_TYPE_SUCCESS } from '../../store/campaign/constant';

const CampaignType = ({ addType, getType, addRound, addAvatarRuleRewardForCampaignType }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const onOpen = () => setIsShowModal(!isShowModal);
  const onClose = () => setIsShowModal(false);
  const allTypes = useSelector(store => store.campaign.types, shallowEqual);
  const typeStatus = useSelector(store => store.campaign.status, shallowEqual);
  const isAuthenticated = useSelector(store => store.auth.user && store.auth.user._id);

  useEffect(() => {
    getType();
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeStatus === ADD_TYPE_SUCCESS) {
      const type_id = allTypes[allTypes.length - 1]._id;
      addRound({ type_id });
    }
  }, [allTypes.length, typeStatus]);

  const onSubMitType = values => {
    const { name } = values;
    const type = name.replace(/ /g, '_');
    addType({ name, type, startTime: formatDate() });
    onClose();
  };

  return (
    <>
      <Card title="Các thể loại">
        <div className="flex justify-content-end">
          <Button variant="primary" onClick={onOpen}>
            Thêm thể loại
          </Button>
          <TypeModal show={isShowModal} onSubmit={onSubMitType} onHide={onClose} />
        </div>

        {allTypes.length ? (
          <ListType addAvatarRuleRewardForCampaignType={addAvatarRuleRewardForCampaignType} allTypes={allTypes} />
        ) : null}
      </Card>
    </>
  );
};

CampaignType.propTypes = {
  addType: func,
  getType: func,
  addRound: func,
  addAvatarRuleRewardForCampaignType: func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addType, getType, addRound, addAvatarRuleRewardForCampaignType }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(memo(CampaignType));
