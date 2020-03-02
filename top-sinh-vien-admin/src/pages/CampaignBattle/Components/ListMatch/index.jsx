import React, { memo, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { array, func, string } from 'prop-types';
import { Table } from 'react-bootstrap';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import CampaignBannersModal from 'components/CampaignBannersModal';
import ImageWithFallback from 'components/ImageWithFallback';
import { rendeTableHeader } from './../../../../utils/renderUltil';
import useModal from '../../../../hooks/useModal';
import { CAMPAIGN_EVENTS_ENDPOINT } from '../../../../api/constant';
import {
  ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS
} from '../../../../store/campaign/constant';

const headerField = ['Trận', 'Team 1', 'Team 2', 'Photos', 'Thao tác'];
const type = {
  MOBILE: 'MOBILE',
  WEBSITE: 'WEBSITE'
};

const ListMatch = ({ typeId, allMatch, teamInBattleOptions, addBannerToMatchOrRound, editBannersOfMatchOrRound }) => {
  const addBannerStatus = useSelector(store => store.campaign.status, shallowEqual);
  const [bannerDetail, setBannerDetail] = useState({});
  const [isOpenBannerModal, toggleBannerModal, closeBannerModal] = useModal(false);
  const [typeScreen, setTypeScreen] = useState('');
  const checkAddOrEditSuccess =
    addBannerStatus === EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS ||
    addBannerStatus === ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS;

  useEffect(() => {
    if (checkAddOrEditSuccess) {
      setBannerDetail({});
      closeBannerModal();
    }
  }, [addBannerStatus]);

  const onCloseBannerModal = () => {
    closeBannerModal();
    setBannerDetail({});
  };

  const toggleAddBannerModal = async (item, type) => {
    const { _id: id } = item;
    try {
      setTypeScreen(type);
      const bannerDetail = await CAMPAIGN_EVENTS_ENDPOINT.GET_DETAIL_BANNER_OF_MATCH_OR_ROUND({ id });
      if (bannerDetail) setBannerDetail(bannerDetail);
    } catch (e) {
      setBannerDetail({});
    }
    toggleBannerModal();
  };

  const renderMatchTableBody = allMatchs => {
    const result = allMatchs.length
      ? allMatchs.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">Trận {item.battle_id && item.battle_id.battle_id}</th>
              <td>{item.team_1 && item.team_1.school && item.team_1.school.name}</td>
              <td>{item.team_2 && item.team_2.school && item.team_2.school.name}</td>
              <td>
                <ImageWithFallback
                  src={!!item.photos[0] && item.photos[0].origin}
                  className="img-thumbnail rounded"
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: 'cover'
                  }}
                />
              </td>
              <td>
                <ButtonWithToolTip
                  onClick={() => toggleAddBannerModal(item, type.MOBILE)}
                  variant="success"
                  classes="flex-shrink-0 p-2"
                  content="Edit this banners of match for mobile"
                  icons="icon-image"
                />
                <ButtonWithToolTip
                  onClick={() => toggleAddBannerModal(item, type.WEBSITE)}
                  variant="info"
                  classes="flex-shrink-0 p-2"
                  content="Edit this banners of match for website"
                  icons="icon-image"
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
        {renderMatchTableBody(allMatch)}
      </Table>
      <CampaignBannersModal
        typeScreen={typeScreen}
        type_apply="MATCH_BANNER"
        typeId={typeId}
        options={teamInBattleOptions}
        show={isOpenBannerModal}
        onHide={onCloseBannerModal}
        bannerDetail={bannerDetail}
        addBannerToMatchOrRound={addBannerToMatchOrRound}
        editBannersOfMatchOrRound={editBannersOfMatchOrRound}
      />
    </>
  );
};

ListMatch.propTypes = {
  allMatch: array,
  teamInBattleOptions: array,
  addBannerToMatchOrRound: func,
  typeId: string,
  editBannersOfMatchOrRound: func
};

export default memo(ListMatch);
