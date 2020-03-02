import React, { memo, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { array, func, object } from 'prop-types';
import { Table } from 'react-bootstrap';
import { rendeTableHeader } from './../../../../utils/renderUltil';
import useModal from '../../../../hooks/useModal';
import ButtonWithToolTip from '../../../../components/ButtonWithToolTip';
import { shallowEqual, useSelector } from 'react-redux';
import { ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_SUCCESS } from '../../../../store/campaign/constant';
import ActionTypeModel from '../ActionTypeModal';

const headerField = ['No.', 'Tên thể loại', 'Thao tác'];
const type = ['mobile', 'website'];

const ListType = ({ allTypes, addAvatarRuleRewardForCampaignType }) => {
  const addPrizeStatus = useSelector(store => store.campaign.status, shallowEqual);
  const [isOpenPrizeModal, togglePrizeModal, closePrizeModal] = useModal(false);
  const [campaignTypeItem, setCampaignTypeItem] = useState({});
  const [typeScreen, setTypeScreen] = useState(type[0]);

  useEffect(() => {
    if (addPrizeStatus === ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_SUCCESS) {
      toast.success('Cập nhật thành công !');
      closePrizeModal();
      setCampaignTypeItem({});
    }
  }, [addPrizeStatus]);

  const onAddPrizeItem = item => {
    setCampaignTypeItem(item);
    setTypeScreen(type[0]);
    togglePrizeModal();
  };

  const onAddPrizeItemWebsite = item => {
    setCampaignTypeItem(item);
    setTypeScreen(type[1]);
    togglePrizeModal();
  };

  const renderTypesBody = allTypes => {
    const result = allTypes.length
      ? allTypes.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td className="d-flex align-items-center">
                <ButtonWithToolTip
                  content="Add all prize avatar for this campaign type for mobile"
                  icons="icon-award"
                  variant="primary"
                  onClick={() => onAddPrizeItem(item)}
                />
                <ButtonWithToolTip
                  content="Add all prize avatar for this campaign type for website"
                  icons="icon-award"
                  variant="success"
                  onClick={() => onAddPrizeItemWebsite(item)}
                />
              </td>
            </tr>
          );
        })
      : null;

    return <tbody>{result}</tbody>;
  };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderTypesBody(allTypes)}
      </Table>
      <ActionTypeModel
        typeScreen={typeScreen}
        campaignTypeItem={campaignTypeItem}
        show={isOpenPrizeModal}
        onHide={closePrizeModal}
        addAvatarRuleRewardForCampaignType={addAvatarRuleRewardForCampaignType}
      />
    </>
  );
};

ListType.propTypes = {
  allTypes: array,
  addAvatarRuleRewardForCampaignType: func
};

export default memo(ListType);
