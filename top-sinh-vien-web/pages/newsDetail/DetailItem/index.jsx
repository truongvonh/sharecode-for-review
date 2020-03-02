import { ALL_NEWS_FEED_TYPE, GROUP_TYPE } from 'constants/common';
import { Link } from 'routes/routesConfig';
import { NAVIGATE_URL } from 'constants/url';
import { checkDetailProperty, checkLinkProperty, getFromNow, getNestedObjectSafe } from 'utils/helper';
import ImageWithFallback from 'components/ImageWithFallback';
import i18n from 'locales/i18n';
import StarRating from 'components/StarRating';
import ImagesWithLightBox from 'components/ImagesWithLightBox';
import VoteAction from 'components/VoteAction';
import { element, object, string } from 'prop-types';
import React from 'react';
import Linkify from 'react-linkify';
import './style.scss';
import { Button } from 'reactstrap';

const DetailItem = ({ detailData, user, type, allComment, commentComponents = null, ...onVoteDocument }) => {
  const isTypeGroup = type === ALL_NEWS_FEED_TYPE.POST_GROUP || type === ALL_NEWS_FEED_TYPE.PUT_GROUP;

  const isTypeSchool = type === ALL_NEWS_FEED_TYPE.UPDATE_REVIEW_SCHOOL || type === ALL_NEWS_FEED_TYPE.REVIEW_SCHOOL;

  const converMoney = value => {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  };

  return (
    <div className="bg-white detail-newfeed detail-item-wrapper rounded p-3">
      <header className="user-wrapper d-flex align-items-center border-bottom pb-3 mb-2">
        <div className="avatar flex-shrink-0">
          <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(detailData, ['user', '_id']))}>
            <a className="d-block">
              <ImageWithFallback
                src={getNestedObjectSafe(detailData, ['user', 'profile', 'avatar', 0, 'thumb'])}
                alt={getNestedObjectSafe(detailData, ['user', 'profile', 'fullName'])}
              />
            </a>
          </Link>
        </div>
        <div className="user-info ml-2">
          <div className="d-flex align-items-center">
            <Link route={NAVIGATE_URL.USER_PROFILE_PAGE.URL(getNestedObjectSafe(detailData, ['user', '_id']))}>
              <a className="mb-0 fz-14 font-weight-bold color-font cursor-pointer">
                {getNestedObjectSafe(detailData, ['user', 'profile', 'fullName'])}
              </a>
            </Link>
            {getNestedObjectSafe(detailData, ['user', 'badge']) &&
              getNestedObjectSafe(detailData, ['user', 'badge']).length > 0 &&
              getNestedObjectSafe(detailData, ['user', 'badge']).map((badge, index) => (
                <div className="badge-icon ml-1 all-badge" key={index}>
                  <ImageWithFallback
                    src={getNestedObjectSafe(badge, ['photos', 0, 'thumb'])}
                    alt={getNestedObjectSafe(badge, ['name'])}
                  />
                </div>
              ))}
          </div>
          {!isTypeGroup && (
            <Link
              route={`/${checkLinkProperty(type)}/${getNestedObjectSafe(detailData, [
                checkDetailProperty(type),
                '_id'
              ])}`}
            >
              <a>
                <p className="mb-0 fz-14 color-link">
                  {getNestedObjectSafe(detailData, [checkDetailProperty(type), 'name'])}
                </p>
              </a>
            </Link>
          )}
          <p className="mb-0 fz-12 text-secondary">{getFromNow(getNestedObjectSafe(detailData, ['updatedAt']))}</p>
        </div>
        {!isTypeGroup && detailData && detailData.rating && (
          <p className="ml-auto mb-0 color-orange font-weight-bold fz-16">
            {`${getNestedObjectSafe(detailData, ['rating'])}/5.0`}
          </p>
        )}
      </header>
      <body className="border-bottom mb-3">
        {isTypeSchool && (
          <ul className="school-rating pl-0 mb-3 pb-3">
            {(getNestedObjectSafe(detailData, ['ratings']) || []).length > 0 &&
              getNestedObjectSafe(detailData, ['ratings']).map((rating, index) => (
                <li className="row py-2" key={index}>
                  <div className="col-12 col-sm-6">
                    <p className="mb-0 color-font font-weight-bold fz-14">
                      {i18n.t(`type_school_rating.${getNestedObjectSafe(rating, ['type', 'name'])}`)}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6 d-flex align-items-center justify-content-sm-end">
                    <div className="rating-icon">
                      <StarRating val={rating.rating} />
                    </div>
                    <p className="rating-point rounded-circle bg-main text-white font-weight-bold fz-16 px-1 mb-0">
                      {rating.rating}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        )}
        <div className="content mb-3">
          <p className="text-secondary fz-14">
            <Linkify target="_blank"> {detailData.content}</Linkify>
          </p>
          {getNestedObjectSafe(detailData, ['groupType']) === GROUP_TYPE.TENANT &&
            getNestedObjectSafe(detailData, ['host']) === true && (
              <div className="pt-2">
                <Button className="fz-12 font-weight-bold btn-rented">{i18n.t('tenant.rent')}</Button>
                {
                  <Button color="success" className="fz-12 font-weight-bold ml-2">
                    {getNestedObjectSafe(detailData, ['occupation']) === 'PENDING'
                      ? i18n.t('tenant.finish')
                      : i18n.t('tenant.unfinished')}
                  </Button>
                }
              </div>
            )}
          {getNestedObjectSafe(detailData, ['groupType']) === GROUP_TYPE.TENANT &&
            getNestedObjectSafe(detailData, ['host']) === false && (
              <div className="pt-2">
                <Button className="fz-12 font-weight-bold btn-lease">{i18n.t('tenant.tenant')}</Button>
                {
                  <Button className="fz-12 font-weight-bold ml-2 btn-occupation">
                    {getNestedObjectSafe(detailData, ['occupation']) === 'PENDING'
                      ? i18n.t('tenant.finish')
                      : i18n.t('tenant.unfinished')}
                  </Button>
                }
              </div>
            )}
          {getNestedObjectSafe(detailData, ['groupType']) === GROUP_TYPE.TRADING && (
            <p className="font-weight-bold fz-14 color-orange pt-2 mb-0">
              Giá: {converMoney(getNestedObjectSafe(detailData, ['price']))}
            </p>
          )}
          <div className="d-flex pt-2">
            {(getNestedObjectSafe(detailData, ['groupTags']) || []).length > 0 &&
              getNestedObjectSafe(detailData, ['groupTags']).map((item, index) => (
                <p key={index} className="fz-14 font-weight-bold color-link pr-2 mb-0">
                  #{getNestedObjectSafe(item, ['tag'])}
                </p>
              ))}
          </div>
        </div>
        {Array.isArray(detailData.photos) && detailData.photos.length > 0 && (
          <ImagesWithLightBox images={detailData.photos} />
        )}
        <VoteAction objItem={detailData} user={user} {...onVoteDocument} />
        <div className="pb-3">{commentComponents}</div>
      </body>
      <footer>{allComment}</footer>
    </div>
  );
};

DetailItem.propTypes = {
  detailData: object,
  user: object,
  type: string,
  allComment: element,
  commentComponents: element
};

export default React.memo(DetailItem);
