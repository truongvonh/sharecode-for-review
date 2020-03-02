import React from 'react';
import { useActions } from 'hooks/useActions';
import { closeLoading, openLoading } from 'redux/common/actions';
import { toast } from 'react-toastify';
import i18n from 'locales/i18n';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { getNestedObjectSafe } from 'utils/helper';

const INIT_PAGINATION = {
  page: 1,
  limit: 12
};

const handlerMatchRound32 = (matchOfRound32, type_id) => {
  const [matchOfRound32Data, setMatchOfRound32Data] = React.useState({ result: [] });
  const [isLoadMoreTeam, setLoadMoreTeam] = React.useState(true);
  const [teamPagination, setPaginationTeam] = React.useState(INIT_PAGINATION);
  const [openLoadingAction, closeLoadingAction] = useActions([ openLoading, closeLoading ], null);

  const onVoteTeam = async (team_id) => {
    try {
      await CAMPAIGN_ENDPOINT.VOTE_TEAM({
        round_id: getNestedObjectSafe(matchOfRound32, ['round', '_id']),
        team: team_id
      });
      const updateResult = [...matchOfRound32Data.result];
      const updateTeamIndex = updateResult.findIndex(item => item.team._id === team_id);
      updateResult[updateTeamIndex] = {
        ...updateResult[updateTeamIndex],
        vote: updateResult[updateTeamIndex].vote + 1,
        user_vote: true
      };

      setMatchOfRound32Data({
        ...matchOfRound32Data,
        result: updateResult
      });
    } catch (e) {
      toast.error(i18n.t(`campaign_message.${e}`));
    }
  };

  const onLoadMore = async ({ page = INIT_PAGINATION.page, limit = INIT_PAGINATION.limit }) => {
    try {
      const { result } = await CAMPAIGN_ENDPOINT.LIST_MATCH_BY_ROUND({
        type_id,
        round_id: getNestedObjectSafe(matchOfRound32Data, ['round', '_id']),
        page,
        limit
      });

      setMatchOfRound32Data({
        ...matchOfRound32Data,
        result: [ ...matchOfRound32Data.result, ...result ]
      });
      setPaginationTeam({ ...teamPagination, page: teamPagination.page + 1 });
      if (result.length < INIT_PAGINATION.limit) setLoadMoreTeam(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onCheckBottom = React.useCallback( async (page) => {
    if (isLoadMoreTeam && matchOfRound32Data) {
      await onLoadMore({ page: teamPagination.page });
    }
  }, [teamPagination, matchOfRound32Data, isLoadMoreTeam]);

  React.useEffect(() => {
    openLoadingAction();
    setMatchOfRound32Data(matchOfRound32);

    setTimeout(() => { closeLoadingAction(); }, 800);
  }, [matchOfRound32]);

  return {
    onVoteTeam,
    isLoadMoreTeam,
    onCheckBottom,
    matchOfRound32Data
  };
};

export default handlerMatchRound32;
