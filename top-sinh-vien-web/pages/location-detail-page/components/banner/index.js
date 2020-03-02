import React from 'react';
import './banner.scss';
import SvgIcons from 'components/SvgIcons';
import { object } from 'prop-types';
import { getNestedObjectSafe } from 'utils/helper';
import StarRating from 'components/StarRating';
import Link from 'next/link';
import { NAVIGATE_URL } from 'constants/url';

const bannerLocation = item => {
  return (
    <div
      className="col-12 wrapper-banner-location container "
      style={{
        background: `url(${getNestedObjectSafe(item, ['avatar', 0, 'origin'])}) center center no-repeat`,
        backgroundSize: 'cover'
      }}
    >
      <div className=" justify-content-center banner-content">
        <div className="pt-xl-5 pb-xl-5 text-center ">
          <Link href={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(getNestedObjectSafe(item, ['id']))}>
            <a>
              <div className="fz-30 font-weight-bold text-white ">{item && item.item}</div>
              <div className="pt-3 fz-18 font-weight-bold text-white ">Địa chỉ: {item && item.address}</div>
            </a>
          </Link>
          <div className="d-flex justify-content-center ">
            <div className="pt-5">
              <img src="/static/img/Group%201050.png" />
              <div className="pt-3">
                <div className="font-weight-bold text-white fz-14">Giờ mở cửa:</div>
                <div className="font-weight-bold text-white fz-14">00:00 - 22:00</div>
              </div>
            </div>
            <div className="place-rank-star overviews justify-content-center p-3">
              <SvgIcons fileName="ic_overview" width={18} noHover height={18} />
              <p className="pl-2 graduate-result fz-18 text-white font-weight-bold ">
                {item.school && item.school.length ? item.school.map(item => item && item.schoolCode).join('/') : ''}
              </p>
            </div>
            <div className="pt-5">
              <img src="/static/img/Group%201051.png" />
              <div className="d-flex pt-2">
                <div className="font-weight-bold text-white fz-16">{item && item.score}/5.0</div>
                <div className="font-weight-bold text-white fz-14 pl-1 pt-1">{(item && item.total) || 0} review</div>
              </div>
              <div>
                <StarRating val={Math.ceil(getNestedObjectSafe(item, ['avgRating']))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default bannerLocation;

bannerLocation.PropTypes = {
  item: object
};
