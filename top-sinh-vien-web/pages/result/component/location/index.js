import React, { useState } from 'react';
import { array, string } from 'prop-types';
import ImageWithFallback from 'components/ImageWithFallback';
import { Tooltip } from 'reactstrap';
import Link from 'next/link';
import SvgIcons from 'components/SvgIcons';

import './location.scss';
import { getNestedObjectSafe } from 'utils/helper';
import { NAVIGATE_URL } from 'constants/url';

const Location = ({ avatar, name, address, rating, school, score, index, id, }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [tooltipOpenUniversity, setTooltipOpenUniversity] = useState(false);
  const toggleUniversity = () => setTooltipOpenUniversity(!tooltipOpenUniversity);
  return (
    <div className="col-md-6 col-xl-3 mb-3 px-2 mx-md-0 " >
      <div className="wrapper-item-card-place d-flex p-3 shadow" >
        <div className=" place-image  flex-shrink-0 ">
          <Link href={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(id)}>
            <a>
              <ImageWithFallback
                src={getNestedObjectSafe(avatar, [0, 'thumb'])}
                alt="img-avatar"
                className="place-image rounded-circle "
              />
            </a>
          </Link>
        </div>
        <div className="place-item col-8 ">
          <div>
            <div>
              <Link href={NAVIGATE_URL.LOCATION_DETAIL_PAGE.URL(id)} >
                <a>
                  <h4 className="place-name font-weight-bold fz-14 text-truncate" id={'DisabledAutoHideExample' + index}>{name}</h4>
                  <Tooltip placement="top" isOpen={tooltipOpen} target={'DisabledAutoHideExample' + index} toggle={toggle}>
                    {name}
                  </Tooltip>
                </a>
              </Link>
            </div>
            <div>
              <p className="small  text-secondary place-address text-truncate text-secondary fz-12" id={'Tooltip-university-' + index}>Địa chỉ: {address}</p>
              <Tooltip
                placement="top"
                isOpen={tooltipOpenUniversity}
                target={'Tooltip-university-' + index}
                toggle={toggleUniversity}
              >
                {address}
              </Tooltip>
            </div>
          </div>
          <div className="place-rank-star">
            <SvgIcons fileName='ic_rating_full'
              width={15}
              noHover
              height={15} />
            <p className="total-rating font-weight-bold">{rating}/5.0</p>
            <p className="total-user-rating ">{`( ${score || 0} )`}</p>
          </div>
          <div className="place-rank-star overviews">
            <SvgIcons fileName="ic_overview"
              width={15}
              noHover
              height={10} />
            <p className="graduate-result fz-12 font-weight-bold text-truncate">{school && school.length ? school.map(item => item && item.schoolCode).join('/') : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Location.propTypes = {
  avatar: array,
  name: string,
  address: string,
  rating: string,
  school: string,
  schoolCode: string,
  score: string,
  id: string,
  index : string,
};

export default Location;
