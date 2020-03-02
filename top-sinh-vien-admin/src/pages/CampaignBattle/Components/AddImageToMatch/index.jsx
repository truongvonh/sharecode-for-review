import React, { memo, useState, useEffect, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import Card from '../../../../App/components/MainCard';
import { Row, Col, Form, Button } from 'react-bootstrap';
import SelectSearchBox from '../../../../components/SelectSearchBox';
import DropZoneFile from 'components/DropZoneFile';

import { array, func } from 'prop-types';
import { COMMON_ENDPOINT } from '../../../../api/constant';
import { checkUpload } from '../../../../utils/helper';
import { uploadImageToMatch, getTeamInRound } from 'store/campaignBattle/actions';
import { useActions } from 'hooks/useActions';
import { UPLOAD_IMAGE_TO_MATCH_SUCCESS } from '../../../../store/campaignBattle/constant';
import { toast } from 'react-toastify';

const AddImageToMatch = ({ allBattles, round_id }) => {
  const [battle, setBattle] = useState('');
  const [file, setFile] = useState([]);
  const [uploadImageToMatchAction, getTeamInRoundAction] = useActions([uploadImageToMatch, getTeamInRound], null);
  const addImageToMatchStatus = useSelector(store => store.campaignBattle.status, shallowEqual);

  useEffect(() => {
    switch (addImageToMatchStatus) {
      case UPLOAD_IMAGE_TO_MATCH_SUCCESS: {
        toast.success('Cập nhật hình ảnh thành công !');
        setFile([]);
        setBattle('');
        getTeamInRoundAction({ round_id });
        break;
      }
    }
  }, [addImageToMatchStatus]);

  const onChangeFile = data => {
    setFile(data);
  };

  const onRemoveFile = () => {
    setFile([]);
  };

  const onChangeMatchOption = match => {
    setBattle(match);
  };

  const addImageToMatch = async () => {
    let fileUpload = [];
    if (file && file.length) {
      fileUpload = checkUpload(file) ? await COMMON_ENDPOINT.UPLOAD_PHOTOS(file, 'CAMPAIGN') : [];
    }
    uploadImageToMatchAction({ match_id: battle._id, photos: fileUpload });
  };

  return (
    <Card title="Thêm ảnh chia sẻ trận đấu (qua Facebook)">
      <Row className="pt-4">
        <Col md={6}>
          <p>Chọn trận đấu:</p>
          <SelectSearchBox
            isMulti={false}
            options={allBattles}
            value={battle}
            onChange={onChangeMatchOption}
            placeholder="Trận đấu"
          />
        </Col>
        <Col md={6}>
          <Form.Group>
            <p className="mb-4">Chọn hình ảnh:</p>
            <DropZoneFile images={file} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file)} />
          </Form.Group>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            className="btn-theme border-0 label theme-bg2 text-white f-12"
            onClick={() => addImageToMatch()}
            disabled={!battle || !file.length}
          >
            Thêm hình ảnh
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

AddImageToMatch.propTypes = {
  allBattles: array,
  addImageToMatch: func
};

export default memo(AddImageToMatch);
