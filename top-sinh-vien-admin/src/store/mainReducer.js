import { combineReducers } from 'redux';
import commonReducer from './common/reducer';
import schoolReducer from './school/reducer';
import authReducer from './auth/reducer';
import campaignReducer from './campaign/reducer';
import campaignBattleReducer from './campaignBattle/reducer';
import locationReducer from './location/reducer';
import userReducer from './user/reducer';
import notificationReducer from './notification/reducer';
import reportReducer from './report/reducer';
import affiliateReducer from './affiliate/reducer';
import statisticalReducer from './Dashboard/reducer';
import badgeReducer from './badge/reducer';
import adsReducer from './ads/reducer';
import { connectRouter } from 'connected-react-router';
import schoolReviewReducer from './schoolReview/reducer';
import locationReviewReducer from './locationReview/reducer';

export default history =>
  combineReducers({
    common: commonReducer,
    school: schoolReducer,
    auth: authReducer,
    campaign: campaignReducer,
    campaignBattle: campaignBattleReducer,
    location: locationReducer,
    locationReview: locationReviewReducer,
    user: userReducer,
    notification: notificationReducer,
    affiliate: affiliateReducer,
    report: reportReducer,
    statistical: statisticalReducer,
    badge: badgeReducer,
    ads: adsReducer,
    schoolReview: schoolReviewReducer,
    router: connectRouter(history)
  });
