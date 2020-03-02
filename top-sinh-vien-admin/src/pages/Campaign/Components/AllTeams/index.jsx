import React, { memo, useState, useEffect } from 'react';
import { array, func, string } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import ConfirmModal from './../ConfirmModal';
import { rendeTableHeader } from './../../../../utils/renderUltil';
import useModal from '../../../../hooks/useModal';
import ToolTipCustom from '../../../../components/ToolTipCustom';
import BaseModal from '../../../../components/BaseModal';
import ImageWithFallback from '../../../../components/ImageWithFallback';
import DropZoneFile from '../../../../components/DropZoneFile';
import ModalActions from '../../../../components/ModalActions';
import { useSelector, shallowEqual } from 'react-redux';
import { ADD_AVATAR_TEAM_SUCCESS } from '../../../../store/campaign/constant';
import { _renderTitle } from '../../../../utils/helper';
import { COMMON_ENDPOINT } from '../../../../api/constant';
import { checkUpload } from '../../../../utils/helper';
import './style.scss';
import { toast } from 'react-toastify';
const headerField = ['No.', 'Team', 'Avatar team', 'Tổng số vote (Vòng sơ loại)', 'Thao tác'];

const AllTeams = ({ teams, onGoToNextRound, addAvatarTeam, type_id }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [team, setTeam] = useState('');
  const [teamParam, setTeamParam] = useState(null);
  const addBannerStatus = useSelector(store => store.campaign.status, shallowEqual);
  const isLoading = useSelector(store => store.campaign.isLoading, shallowEqual);
  const [isOpenUploadAvatar, toggleUploadAvatar, closeUploadAvatar] = useModal(false);
  const [file, setFile] = useState([]);

  useEffect(() => {
    if (addBannerStatus === ADD_AVATAR_TEAM_SUCCESS) {
      toast.success('Update avatar type for team success !');
      setTeam('');
      closeUploadAvatar();
    }
  }, [addBannerStatus]);

  const toggleModalWithContent = (check, params) => {
    setToggleModal(true);
    setContentModal(check ? 'Are you sure add team next round' : 'Are you sure remove team next round');
    setTeamParam(params);
  };

  const onSelectAction = () => {
    onGoToNextRound(teamParam);
    setToggleModal(false);
  };

  const onChangeFile = data => {
    setFile(data);
  };

  const onRemoveFile = () => {
    setFile([]);
  };

  const handleAddAvatarTeam = async item => {
    try {
      let file = [];

      if (item.avatar && item.avatar.length) {
        file = checkUpload(item.avatar) ? await COMMON_ENDPOINT.UPLOAD_PHOTOS(item.avatar, 'CAMPAIGN') : item.avatar;
      }
      addAvatarTeam({ avatar: file, team: item.team, type_id: item.type_id });
    } catch (error) {
      toast.failed('Update avatar type for team failed !');
    }
    closeUploadAvatar();
  };

  const renderItemAction = item => {
    const checkParams = {
      team: item.team && item.team._id,
      check: !item.check ? true : false
    };

    return !item.check ? (
      <Button onClick={() => toggleModalWithContent(true, checkParams)} variant="outline-info" className="font-size-sm">
        Next round
      </Button>
    ) : (
      <Button
        onClick={() => toggleModalWithContent(false, checkParams)}
        variant="outline-danger"
        className="font-size-sm"
      >
        Cancel
      </Button>
    );
  };

  const selectToUpload = item => {
    setTeam(item.team._id);
    setFile(
      item.team &&
        item.team.school &&
        item.team.school.avatar.length &&
        item.team.school.avatar.map(item => ({ ...item, preview: item.origin }))
    );
    toggleUploadAvatar();
  };

  const getSchoolAvatar = item =>
    item.team && item.team.school && item.team.school.avatar.length && item.team.school.avatar[0].origin;

  const renderTeamsTableBody = teams => {
    const result = teams.length
      ? teams.map((item, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{_renderTitle(item.team && item.team.school && item.team.school.name)}</td>
            <td>
              {getSchoolAvatar(item) ? (
                <ImageWithFallback
                  className="rounded-circle circle-image-avatar"
                  src={getSchoolAvatar(item)}
                  onClick={() => selectToUpload(item)}
                />
              ) : (
                <ToolTipCustom content="Upload avatar team">
                  <Button
                    variant="success"
                    onClick={() => selectToUpload(item)}
                    className="rounded-circle p-2 d-flex justify-content-center align-items-center m-0"
                  >
                    <i className="feather mr-0 icon-image" />
                  </Button>
                </ToolTipCustom>
              )}
            </td>
            <td className="text-center">{item.vote || 0}</td>
            <td>{renderItemAction(item)}</td>
          </tr>
        ))
      : null;

    return <tbody>{result}</tbody>;
  };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderTeamsTableBody(teams)}
      </Table>
      <ConfirmModal
        onHide={() => setToggleModal(!toggleModal)}
        onSelect={onSelectAction}
        show={toggleModal}
        content={contentModal}
      />
      <BaseModal
        borderNone={true}
        title="Cập nhật avatar team cho thể loại"
        show={isOpenUploadAvatar}
        onHide={closeUploadAvatar}
        actions={
          <ModalActions
            onHide={closeUploadAvatar}
            isLoading={isLoading}
            disabledOk={isLoading}
            onOk={e => handleAddAvatarTeam({ team, type_id, avatar: file })}
          />
        }
      >
        <DropZoneFile images={file} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file)} />
      </BaseModal>
    </>
  );
};

AllTeams.propTypes = {
  teams: array,
  onGoToNextRound: func,
  handleAddAvatarTeam: func,
  addAvatarTeam: func,
  type_id: string
};

export default memo(AllTeams);
