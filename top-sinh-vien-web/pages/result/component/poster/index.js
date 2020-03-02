import React from 'react';
import { array, string } from 'prop-types';
import ImageWithFallback from 'components/ImageWithFallback';
import SvgIcons from 'components/SvgIcons';
import Link from 'next/link';
import { getFromNow, getNestedObjectSafe } from 'utils/helper';

import './poster.scss';
import { NAVIGATE_URL } from 'constants/url';

const Poster = ({ avatar, fullName, rating, name, content, photos, createdAt, id, }) => {
  return (
    <div className=" col-lg-12 px-2">
      <div className="wrapper-poster p-3 bg-white d-flex flex-column flex-md-row mb-4 w-100  shadow">
        <Link href={`/poster/${id}`}>
          <a>
            <div className="flex-shrink-0">
              {/*<ImageWithFallback  src={ photos && photos.length ? photos[0].thumb : true}*/}
              <ImageWithFallback  src={getNestedObjectSafe(photos, [0, 'thumb'])}
                                  alt="img-avatar"
                                  className="image-poster p-0" />
            </div>
          </a>
        </Link>
        <div className="pl-md-3 mt-4 mt-md-0 w-100 d-flex flex-column">
          <div className="d-flex">
            <div className="avatar-item-poster ">
              <ImageWithFallback src={getNestedObjectSafe(avatar,[0,'thumb'])}
                                alt="img-avatar"
                                className="rounded-circle image-item-name" />
            </div>
            <div className="w-100">
              <Link href={NAVIGATE_URL.REVIEW_DETAIL_PAGE.URL(id)}>
                <a>
                  <h6 className="item-name-poster font-weight-bold ">{fullName}
                    <img src="/static/img/icon-friends.svg/" alt='img-icon'/>
                    <span className="rank-poster font-weight-bold">{rating}/5.0</span>
                  </h6>
                </a>
              </Link>
              <div className="d-flex">
                <p className="text-poster-item font-weight-bold">{getFromNow(createdAt)}</p>
                <Link href={NAVIGATE_URL.REVIEW_DETAIL_PAGE.URL(id)} >
                  <a className='pl-2'>
                    <span className="text-poster font-weight-bold">{name}</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <p className="text-poster-item font-weight-normal">
              {content}
            </p>
          </div>
          <div className="icon-poster mt-auto d-flex justify-content-between">
            <div className="d-flex">
              <SvgIcons fileName="ic_like" />
              <p className="mb-0 ml-2">lượt thích</p>
            </div>
            <div className="d-flex ml-3">
              <SvgIcons fileName="ic_coment" />
              <p className="mb-0 ml-2">bình luận</p>
            </div>
            <div className="d-flex ml-3">
              <SvgIcons fileName="ic_share" />
              <p className="mb-0 ml-2">share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Poster.propTypes = {
  fullName: string,
  avatar: array,
  name: string,
  rating: string,
  content: string,
  photos: array,
  createdAt: string,
  id: string,
};

export default Poster;
