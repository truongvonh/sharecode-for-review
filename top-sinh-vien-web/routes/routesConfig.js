const routes = require('next-routes');

module.exports = routes()
  .add('/', 'news')
  .add('/news-detail/:id/:type', 'newsDetail')

  .add('/detail-school-review/:id/:type', 'detailSchoolReview')
  .add('/detail-location-review/:id/:type', 'detailLocationReview')

  .add('/university-overview', 'university-overview/OverviewPage')
  .add('/university-overview/image', 'university-overview/ImagePage')
  .add('/university-overview/location', 'university-overview/LocationPage')
  .add('/university-overview/review', 'university-overview/ReviewPage')
  .add('/university-overview/follow', 'university-overview/FollowPage')

  // .add('/result', 'result')
  .add('/result/university', 'result/ResultUniversity')
  .add('/result/location', 'result/ResultLocation')
  .add('/result/member', 'result/ResultMember')
  .add('/result/poster', 'result/ResultPoster')

  // group all routes
  .add('/group/:type', 'GroupDetail')

  .add('/detail-review/:review_id', 'ReviewDetail')

  // location detail page
  .add('/location/:location_id', 'LocationDetail')

  // all campaign routes
  .add('/newscompetition/:status', 'newscompetition')
  .add('/camapaign/kick-start/:type_id/:round_id', 'campaignKickStart')
  .add('/camapaign/knock-out/:type_id/:round_id', 'campaignKnockOut')

  // detail match
  .add('/camapaign/match/:match_id', 'competitionDetail')
  .add('/school/:school_id', 'SchoolDetail')

  //profile user routes
  .add('/profile-user/time-line/:user_id', 'profile-user/time-line')
  .add('/profile-user/follow-you/:user_id', 'profile-user/follow-you')
  .add('/profile-user/you-follow/:user_id', 'profile-user/you-follow')
  .add('/profile-user/follow-school/:user_id', 'profile-user/follow-school')
  .add('/profile-user/edit-profile/:user_id', 'profile-user/edit-profile')
  .add('/profile-user/album-user/:user_id', 'profile-user/album-user')

  .add('/result?keyword=keyword', 'result')
  .add('/result/:search_type(location|location_review|user|school)/:keyword', 'result/ResultType')

  //profile university routes
  .add('/profile-university/review/:university_id', 'profile-university/review')
  .add('/profile-university/over-view/:university_id', 'profile-university/over-view')
  .add('/profile-university/review-location/:university_id', 'profile-university/review-location')
  .add('/profile-university/album-school/:university_id', 'profile-university/album-school')
  .add('/profile-university/student-follow/:university_id', 'profile-university/student-follow')
  .add('/review-detail/:university_id/:review_id', 'profile-university/review-detail')
  .add('/newscompetition/:status', 'newscompetition')

  .add('/location-map/:university_id', 'location-map')
  .add('/place/:university_id', 'place')
  .add('/location-detail-page/:location_id', 'location-detail-page')
  .add('/location-map-detail/:location_id', 'location-map-detail')
  .add('/album-location/:location_id', 'album-location')

  .add('/review-detail/:university_id/:review_id', 'profile-university/review-detail');
