import React from 'react';
import Head from 'components/common/head';
import { ConsumerProfileSchool } from 'layout/ProfileUniversityWrapper';
import { SCHOOL_ENDPOINT, VOTE_ENDPOINT } from 'constants/endpoints';
import { checkVoteType, getNestedObjectSafe } from 'utils/helper';
import { shallowEqual, useSelector } from 'react-redux';
import SchoolOverviewItem from '../components/school-overview-item';
import { OVERVIEW_SCHOOL_TYPE } from 'constants/common';
import UserFollowSchoolItem from '../components/user-follow-school-item';
import DataFound from 'components/dataFound';

const ReviewSchool = ({ university_id, schoolAbout, onClickStatus }) => {
  const [overviewSchool, setOverviewSchool] = React.useState([]);
  const [reviewSchool, setReviewSchool] = React.useState([]);
  const [reviewLocation, setReviewLocation] = React.useState([]);
  const [userFollowSchool, setUserFollowSchool] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useSelector(store => store.auth.user, shallowEqual);

  const getOverviewSchool = async ({ id: id }) => {
    try {
      const result = await SCHOOL_ENDPOINT.OVERVIEW_SCHOOL({ id: id });
      setOverviewSchool(result);
      setReviewSchool(getNestedObjectSafe(result, ['review_school']));
      setReviewLocation(getNestedObjectSafe(result, ['location_review_near_school']));
      setUserFollowSchool(getNestedObjectSafe(result, ['user_follow_school']));
      if (result) setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getOverviewSchool({ id: university_id });
  }, [university_id]);

  const onVoteDocument = async (type, document) => {
    try {
      if (!user) toggleLoginMdAction();
      else {
        const data = await VOTE_ENDPOINT.VOTE({ vote_type: checkVoteType(type), document });
        if (data) {
          if (type === OVERVIEW_SCHOOL_TYPE.REVIEW_SCHOOL) {
            const updateResult = [...reviewSchool];
            const updateIndex = reviewSchool.findIndex(
              review => getNestedObjectSafe(review, ['impactObj', 'linkDetailPost']) === document
            );
            updateResult[updateIndex].voted = !updateResult[updateIndex].voted;
            updateResult[updateIndex].totalVote = updateResult[updateIndex].voted
              ? updateResult[updateIndex].totalVote + 1
              : updateResult[updateIndex].totalVote - 1;
            setReviewSchool(updateResult);
          }
          if (type === OVERVIEW_SCHOOL_TYPE.REVIEW_LOCATION) {
            const updateResult = [...reviewLocation];
            const updateIndex = reviewLocation.findIndex(
              review => getNestedObjectSafe(review, ['impactObj', 'linkDetailPost']) === document
            );
            updateResult[updateIndex].voted = !updateResult[updateIndex].voted;
            updateResult[updateIndex].totalVote = updateResult[updateIndex].voted
              ? updateResult[updateIndex].totalVote + 1
              : updateResult[updateIndex].totalVote - 1;
            setReviewLocation(updateResult);
          }
        }
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const flowIdSuccess = id_flow => {
    const newUserFollowSchool = [...userFollowSchool];
    newUserFollowSchool.filter(item => {
      if (item.user._id == id_flow) {
        item.follow = !item.follow;
      }
      return item;
    });
    setUserFollowSchool(newUserFollowSchool);
  };

  return (
    <>
      <Head ogImage="/static/img/img_logo.png" title="Tổng quan trường học" />
      <div>
        {reviewSchool && reviewSchool.length > 0 && (
          <SchoolOverviewItem
            overviewSchool={reviewSchool}
            onVoteDocument={onVoteDocument}
            schoolAbout={schoolAbout}
            user={user}
            type={OVERVIEW_SCHOOL_TYPE.REVIEW_SCHOOL}
            university_id={university_id}
            onClickStatus={onClickStatus}
          />
        )}
        {reviewLocation && reviewLocation.length > 0 && (
          <SchoolOverviewItem
            overviewSchool={reviewLocation}
            onVoteDocument={onVoteDocument}
            schoolAbout={schoolAbout}
            user={user}
            type={OVERVIEW_SCHOOL_TYPE.REVIEW_LOCATION}
            university_id={university_id}
            onClickStatus={onClickStatus}
          />
        )}
        {userFollowSchool && userFollowSchool.length > 0 && (
          <UserFollowSchoolItem
            UserFollowSchool={userFollowSchool}
            schoolAbout={schoolAbout}
            user={user}
            flowIdSuccess={flowIdSuccess}
            university_id={university_id}
            onClickStatus={onClickStatus}
          />
        )}
        {isLoading &&
          userFollowSchool &&
          userFollowSchool.length === 0 &&
          reviewLocation &&
          reviewLocation.length === 0 &&
          reviewSchool &&
          reviewSchool.length === 0 && <DataFound />}
      </div>
    </>
  );
};

const WrapperReview = () => {
  return (
    <ConsumerProfileSchool>
      {context => (
        <React.Fragment>
          <ReviewSchool
            university_id={context.university_id}
            schoolAbout={context.schoolAbout}
            onClickStatus={context.onClickStatus}
          />
        </React.Fragment>
      )}
    </ConsumerProfileSchool>
  );
};

export default WrapperReview;
