import { createSelector } from 'reselect';

const ROUND_32 = 'ROUND_32';

export const nextRoundOfTypeSelector = createSelector(
  state => state.campaign.roundOfType,
  roundOfType => {
    for (let i = 0; i < roundOfType.length; i++) {
      if (roundOfType[i].name_round === ROUND_32) return roundOfType[i+1]._id;
    }
  }
);

export const qualifyRoundSelector = createSelector(
  state => state.campaign.roundOfType,
  roundOfType => roundOfType.filter(item => item.name_round !== ROUND_32)
);

const allTeamSelector = state => state.campaign.allTeams;
const teamsNextRoundSelector = state => state.campaign.teamsNextRound;
export const teamJoinAndNotJoinSelector = createSelector(
  [allTeamSelector, teamsNextRoundSelector],
  (allTeams, teamsNextRound) => {
    if (Array.isArray(teamsNextRound) && !teamsNextRound.length) return allTeams.map(item => ({
      ...item,
      inNextRound: false
    }));

    const allIds = teamsNextRound.map(team => team._id);
    const result = []; 
    allTeams.forEach(item => {
      if (allIds.includes(item.team._id)) result.push({ ...item, inNextRound: true });
      else result.push({ ...item, inNextRound: false });
    });
    return result;
  }
);

export const teamNotInBattleSelector = createSelector(
  store => store.campaign.teamsNextRound,
  store => store.campaignBattle.teamInBattle,
  (teamNotInBattle, teamInBattle) => {
    if (!teamInBattle.length) return teamNotInBattle;

    const allIdsTeamInBattle = teamInBattle.map(item => ([item.team_1 && item.team_1._id, item.team_2 && item.team_2._id])).flat();
    const result = [];
    teamNotInBattle.forEach(item => {
      if (!allIdsTeamInBattle.includes(item._id)) result.push(item);
    });
    return result;
  }
);