import {
  ADD_TYPE_SUCCESS,
  ADD_TYPE_PROGRESS,
  ADD_TYPE_FAILED,
  GET_TYPE_SUCCESS,
  GET_TYPE_PROGRESS,
  GET_TYPE_FAILED,
  GET_TEAM_VOTE_ROUND_32_SUCCESS,
  GET_TEAM_VOTE_ROUND_32_FAILED,
  GET_TEAM_VOTE_ROUND_32_PROGRESS,
  TEAM_NOT_JOIN_SUCCESS,
  TEAM_NOT_JOIN_FAILED,
  TEAM_NOT_JOIN_PROGRESS,
  ROUND_OF_TYPE_SUCCESS,
  ROUND_OF_TYPE_FAILED,
  ROUND_OF_TYPE_PROGRESS,
  ADD_TEAM_WINNER_ROUND_32_SUCCESS,
  ADD_TEAM_WINNER_ROUND_32_FAILED,
  ADD_TEAM_WINNER_ROUND_32_PROGRESS,
  UPDATE_ROUND_TIME_SUCCESS,
  UPDATE_ROUND_TIME_FAILED,
  UPDATE_ROUND_TIME_PROGRESS,
  UPDATE_STATUS_ROUND_SUCCESS,
  UPDATE_STATUS_ROUND_FAILED,
  UPDATE_STATUS_ROUND_PROGRESS,
  ADD_AVATAR_TEAM_SUCCESS,
  ADD_AVATAR_TEAM_FAILED,
  ADD_AVATAR_TEAM_PROGRESS,
  ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS,
  ADD_BANNER_TO_MATCH_OR_ROUND_FAILED,
  ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_FAILED,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_PROGRESS,
  ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_SUCCESS,
  ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_FAILED,
  ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_PROGRESS
} from './constant';

const initialState = {
  isOpen: false,
  isLoading: false,
  status: '',
  allTeams: [],
  teamsNextRound: [],
  types: [],
  roundOfType: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TYPE_PROGRESS:
    case GET_TEAM_VOTE_ROUND_32_PROGRESS:
    case TEAM_NOT_JOIN_PROGRESS:
    case ROUND_OF_TYPE_PROGRESS:
    case ADD_TEAM_WINNER_ROUND_32_PROGRESS:
    case ADD_TYPE_PROGRESS:
    case UPDATE_ROUND_TIME_PROGRESS:
    case UPDATE_STATUS_ROUND_PROGRESS:
    case ADD_AVATAR_TEAM_PROGRESS:
    case ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS:
    case EDIT_BANNERS_OF_MATCH_OR_ROUND_PROGRESS:
    case ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_PROGRESS:
      return {
        ...state,
        status: action.type,
        isLoading: true
      };
    case GET_TYPE_FAILED:
    case GET_TEAM_VOTE_ROUND_32_FAILED:
    case TEAM_NOT_JOIN_FAILED:
    case ADD_TEAM_WINNER_ROUND_32_FAILED:
    case ROUND_OF_TYPE_FAILED:
    case ADD_TYPE_FAILED:
    case UPDATE_ROUND_TIME_FAILED:
    case UPDATE_STATUS_ROUND_FAILED:
    case ADD_AVATAR_TEAM_FAILED:
    case ADD_BANNER_TO_MATCH_OR_ROUND_FAILED:
    case EDIT_BANNERS_OF_MATCH_OR_ROUND_FAILED:
    case ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_FAILED:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        error: action.error
      };
    case GET_TYPE_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        types: action.data
      };
    case ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS:
    case EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false
      };
    case ADD_TYPE_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        types: [...state.types, action.data]
      };
    case GET_TEAM_VOTE_ROUND_32_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allTeams: action.data
      };
    case TEAM_NOT_JOIN_SUCCESS:
      return {
        ...state,
        status: action.type,
        isLoading: false,
        teamsNextRound: action.data
      };
    case ROUND_OF_TYPE_SUCCESS: {
      const roundOfType = action.data.map(element => {
        return {
          ...element,
          label: element.title,
          value: element._id
        };
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        roundOfType
      };
    }
    case ADD_AVATAR_TEAM_SUCCESS: {
      const allTeams = [...state.allTeams].map(item => {
        if (item.team._id === (action.data && action.data.team)) {
          return {
            ...item,
            team: {
              ...item.team,
              school: {
                ...item.team.school,
                avatar: action.data && action.data.avatar
              }
            }
          };
        }
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allTeams
      };
    }
    case ADD_TEAM_WINNER_ROUND_32_SUCCESS: {
      const allTeams = [...state.allTeams].map(item => {
        if (item.team._id === (action.data && action.data.team)) return { ...item, check: !item.check };
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        allTeams
      };
    }
    case UPDATE_ROUND_TIME_SUCCESS: {
      const updateIndex = [...state.roundOfType].findIndex(item => item._id === (action.data && action.data._id));
      const roundOfType = [...state.roundOfType].map((item, index) => {
        if (index === updateIndex) return action.data;
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        roundOfType
      };
    }
    case UPDATE_STATUS_ROUND_SUCCESS: {
      const updateIndex = [...state.roundOfType].findIndex(item => item._id === (action.data && action.data.round_id));
      return {
        ...state,
        status: action.type,
        isLoading: false,
        roundOfType: [
          ...state.roundOfType.slice(0, updateIndex),
          {
            ...state.roundOfType[updateIndex],
            status: action.data && action.data.status
          },
          ...state.roundOfType.slice(updateIndex + 1)
        ]
      };
    }
    case ADD_AVATAR_RULE_REWARD_FOR_CAMPAIGN_TYPE_SUCCESS: {
      const types = [...state.types].map(item => {
        if (item._id === (action.data && action.data._id)) {
          return action.data;
        }
        return item;
      });
      return {
        ...state,
        status: action.type,
        isLoading: false,
        types
      };
    }
    default:
      return state;
  }
};
export default reducer;
