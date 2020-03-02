import React, { memo, useState, useEffect, useMemo } from 'react';
import { func } from 'prop-types';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from 'App/components/MainCard';
import SelectBox from 'components/SelectBox';
import ListMatch from './Components/ListMatch';
import { qualifyRoundSelector, teamNotInBattleSelector } from './../../selector/campaignSelector';
import {
  getType,
  getRoundOfType,
  getTeamNotJoin,
  addBannerToMatchOrRound,
  editBannersOfMatchOrRound
} from 'store/campaign/actions';
import { getTeamInRound, addTeamToAnyRound } from 'store/campaignBattle/actions';
import CampaignBannersModal from 'components/CampaignBannersModal';
import AddImageToMatch from './Components/AddImageToMatch/';
import useModal from '../../hooks/useModal';

const CampaignBattle = ({
  getType,
  getRoundOfType,
  getTeamNotJoin,
  getTeamInRound,
  addTeamToAnyRound,
  addBannerToMatchOrRound,
  editBannersOfMatchOrRound
}) => {
  const [isOpenBannerModal, toggleBannerModal, closeBannerModal] = useModal(false);
  const [bannerDetail, setBannerDetail] = useState({});
  const types = useSelector(store => store.campaign.types);
  const allQualifyRounds = useSelector(qualifyRoundSelector);
  const teamNotInBattle = useSelector(teamNotInBattleSelector);
  const teamInBattle = useSelector(store => store.campaignBattle.teamInBattle);
  const isAuthenticated = useSelector(store => store.auth.user && store.auth.user._id);
  const [typeId, setTypeId] = useState('');
  const [teamToBattle, setTeamToBattle] = useState({
    team_1: '',
    team_2: ''
  });
  const { team_1, team_2 } = teamToBattle;
  const [roundId, setRoundId] = useState('');

  const avgLengthOfTeam = useMemo(() => Math.round(teamNotInBattle.length / 2), [teamNotInBattle.length]);
  const allTeam1 = useMemo(() => [...teamNotInBattle].splice(0, avgLengthOfTeam), [teamNotInBattle.length]);
  const allTeam2 = useMemo(() => [...teamNotInBattle].splice(avgLengthOfTeam, teamNotInBattle.length), [
    teamNotInBattle.length
  ]);

  const getTeamRemainByRound = round_id => {
    getTeamNotJoin({ round_id });
    getTeamInRound({ round_id });
    setRoundId(round_id);
  };

  useEffect(() => {
    getType();
  }, [isAuthenticated]);

  useEffect(() => {
    if (types.length) {
      const type_id = types[0]._id;
      getRoundOfType({ type_id });
      setTypeId(type_id);
    }
  }, [types]);

  useEffect(() => {
    if (allQualifyRounds.length) {
      const round_id = allQualifyRounds[0]._id;
      getTeamRemainByRound(round_id);
    }
  }, [allQualifyRounds]);

  const onChangeType = type => {
    const type_id = type.target.value;
    getRoundOfType({ type_id });
    setTypeId(type_id);
  };

  const onChangeRound = round => {
    const round_id = round.target.value;
    getTeamRemainByRound(round_id);
  };

  const onSelectTeam = e => {
    setTeamToBattle({
      ...teamToBattle,
      [e.target.name]: e.target.value
    });
  };

  const onAddMatch = () => {
    addTeamToAnyRound({
      round_id: roundId,
      team_1: team_1 || allTeam1[0]._id,
      team_2: team_2 || allTeam2[0]._id
    });
  };

  const teamInBattleOptions = teamInBattle.map(item => {
    return {
      ...item,
      label: `Trận ${item.battle_id && item.battle_id.battle_id}`,
      value: item._id,
      title: item.battle_id && item.battle_id.name_battle
    };
  });

  return (
    <>
      <Form>
        <Card title="Thêm trận đấu">
          <h5 className="border-bottom pb-4">Thiết lập vòng knockout</h5>
          <Row className="pt-4">
            <Col md={6}>
              <p className="mb-2">Thể loại:</p>
              <SelectBox onChange={onChangeType} allSelect={types} />
            </Col>
            <Col md={6}>
              <p className="mb-2">Vòng đấu:</p>
              <SelectBox type="round" onChange={onChangeRound} allSelect={allQualifyRounds} />
            </Col>
          </Row>
          <h5 className="py-4 border-bottom">Thiết lập cặp đấu:</h5>
          <Row>
            {[allTeam1, allTeam2].map((item, index) => (
              <Col md={6} key={index}>
                <p className="mb-2">Chọn team {index + 1}</p>
                <SelectBox type="team" name={`team_${index + 1}`} onChange={onSelectTeam} allSelect={item} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-end">
            <Button
              onClick={onAddMatch}
              disabled={!allTeam1.length || !allTeam2.length}
              className="btn-theme border-0 label theme-bg2 text-white f-12"
            >
              Thêm trận đấu
            </Button>
          </div>
        </Card>
      </Form>
      <AddImageToMatch allBattles={teamInBattleOptions} round_id={roundId} />
      <Card title="Danh sách các trận đấu">
        <ListMatch
          teamInBattleOptions={teamInBattleOptions}
          allMatch={teamInBattle}
          typeId={typeId}
          addBannerToMatchOrRound={addBannerToMatchOrRound}
          editBannersOfMatchOrRound={editBannersOfMatchOrRound}
        />
      </Card>
    </>
  );
};

CampaignBattle.propTypes = {
  getType: func,
  getRoundOfType: func,
  getTeamNotJoin: func,
  getTeamInRound: func,
  addTeamToAnyRound: func,
  editBannersOfMatchOrRound: func,
  addBannerToMatchOrRound: func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getType,
      getRoundOfType,
      getTeamNotJoin,
      getTeamInRound,
      addTeamToAnyRound,
      editBannersOfMatchOrRound,
      addBannerToMatchOrRound
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(memo(CampaignBattle));
