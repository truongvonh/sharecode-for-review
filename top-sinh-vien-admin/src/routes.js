import React from 'react';
import { ALL_PERMISSIONS } from 'constant';

const DashboardDefault = React.lazy(() => import('./Demo/Dashboard/Default'));
const School = React.lazy(() => import('./pages/School/index'));
const Location = React.lazy(() => import('./pages/Location/index'));
const LocationType = React.lazy(() => import('./pages/LocationType/index'));
const LocationReview = React.lazy(() => import('./pages/LocationReview/index'));
const Campaign = React.lazy(() => import('./pages/Campaign/index'));
const CampaignBattle = React.lazy(() => import('./pages/CampaignBattle/index'));
const CampaignType = React.lazy(() => import('./pages/CampaignType/index'));
const CampaignRound = React.lazy(() => import('./pages/CampaignRound/index'));
const Role = React.lazy(() => import('./pages/Role/index'));
const User = React.lazy(() => import('./pages/User/index'));
const Report = React.lazy(() => import('./pages/Report/index'));
const SendNotification = React.lazy(() => import('./pages/SendNotification/index'));
const Affiliate = React.lazy(() => import('./pages/Affiliate/index'));
const DashBoard = React.lazy(() => import('./pages/Dashboard/index'));
const Badge = React.lazy(() => import('./pages/Badge/index'));
const Ads = React.lazy(() => import('./pages/Ads/index'));
const SignIn = React.lazy(() => import('./pages/Authentication/SignIn'));
const SchoolReview = React.lazy(() => import('./pages/SchoolReview/index'));
const AdsType = React.lazy(() => import('./pages/AdsType/index'));

const routes = [
  {
    path: '/dashboard',
    exact: true,
    component: DashBoard
  },
  {
    path: '/school',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_SCHOOL,
    component: School
  },
  {
    path: '/school-review',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_SCHOOL,
    component: SchoolReview
  },
  {
    path: '/user-role',
    exact: false,
    authorization: ALL_PERMISSIONS.MANAGE_USER,
    component: Role
  },
  {
    path: '/user',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_USER,
    component: User
  },
  {
    path: '/campaign',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_CAMPAIGN,
    component: Campaign
  },
  {
    path: '/campaign-battle',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_CAMPAIGN,
    component: CampaignBattle
  },
  {
    path: '/campaign-type',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_CAMPAIGN,
    component: CampaignType
  },
  {
    path: '/campaign-round',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_CAMPAIGN,
    component: CampaignRound
  },
  {
    path: '/location',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: Location
  },
  {
    path: '/location-type',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: LocationType
  },
  {
    path: '/location-review',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: LocationReview
  },
  {
    path: '/report',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: Report
  },
  {
    path: '/report/:id',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: Report
  },
  {
    path: '/affiliate',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: Affiliate
  },
  {
    path: '/badge',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: Badge
  },
  {
    path: '/send-notification',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: SendNotification
  },
  {
    path: '/ads',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: Ads
  },
  {
    path: '/ads-type',
    exact: true,
    authorization: ALL_PERMISSIONS.MANAGE_ALL,
    component: AdsType
  },
  {
    path: '/auth/signin',
    exact: false,
    component: SignIn
  }
];

export default routes;
