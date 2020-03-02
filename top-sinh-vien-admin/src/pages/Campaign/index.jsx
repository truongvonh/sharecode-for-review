import React, { memo, useEffect, useState, useMemo } from 'react';
import { func, object } from 'prop-types';
import Aux from '../../hoc/_Aux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import Card from '../../App/components/MainCard';
import { connect } from 'react-redux';
import SelectBox from '../../components/SelectBox';
import {
  addTeam,
  getType,
  getTeamVoteRound32,
  addTeamWinnerRound32,
  getRoundOfType,
  getTeamNotJoin,
  addAvatarTeam
} from '../../store/campaign/actions';
import AllTeams from './Components/AllTeams';
import { useSelector } from 'react-redux';
import { ADD_TEAM_PROGRESS } from '../../store/campaign/constant';
import { nextRoundOfTypeSelector } from '../../selector/campaignSelector';

const Campaign = ({
  addTeam,
  isAuthenticated,
  getType,
  getTeamVoteRound32,
  getRoundOfType,
  getTeamNotJoin,
  addAvatarTeam,
  addTeamWinnerRound32
}) => {
  const isLoading = useSelector(store => store.campaign.isLoading);
  const types = useSelector(store => store.campaign.types);
  const status = useSelector(store => store.campaign.status);
  const roundOfType = useSelector(store => store.campaign.roundOfType);
  const nextRound = useSelector(nextRoundOfTypeSelector);
  const allTeams = useSelector(store => store.campaign.allTeams);

  const [type, setType] = useState(null);

  useEffect(() => {
    getType();
  }, [isAuthenticated]);

  useEffect(() => {
    if (types.length) {
      const type_id = types[0]._id;
      setType(type_id);
      getTeamVoteRound32({ type_id });
      getRoundOfType({ type_id });
    }
  }, [types.length]);

  useEffect(() => {
    if (roundOfType.length) getTeamNotJoin({ round_id: nextRound });
  }, [types, roundOfType]);

  const onAddTeam = () => addTeam({ filter: 'auto' });

  const onSelectType = e => {
    const type_id = e.target.value;
    setType(type_id || type);
    getTeamVoteRound32({ type_id });
    getRoundOfType({ type_id });
  };

  const onGoToNextRound = ({ team, check }) => addTeamWinnerRound32({ type_id: type, team, check });

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="All team">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="col-12 col-md-4 col-xl-3">
                <h5 className="font-weight-bold">Chọn thể loại:</h5>
                <SelectBox className="w-100" onChange={onSelectType} allSelect={types} />
              </div>
              {/* <Button 
                onClick={onAddTeam}
                color="primary" 
                variant="primary"
                disabled={isLoading}
              >
                { isLoading && status === ADD_TEAM_PROGRESS ? 
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> : <i className="feather icon-plus" />
                }
                Add all team
              </Button> */}
            </div>
            <div className="mt-3">
              <AllTeams
                onGoToNextRound={onGoToNextRound}
                teams={allTeams}
                addAvatarTeam={addAvatarTeam}
                type_id={type}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

Campaign.propTypes = {
  isAuthenticated: object,
  addTeam: func,
  getRoundOfType: func,
  getTeamNotJoin: func,
  getType: func,
  getTeamVoteRound32: func,
  addTeamWinnerRound32: func,
  addAvatarTeam: func
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTeam,
      addAvatarTeam,
      getType,
      getTeamVoteRound32,
      addTeamWinnerRound32,
      getRoundOfType,
      getTeamNotJoin
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(memo(Campaign));
