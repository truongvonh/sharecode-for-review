import React from 'react';
import Link from 'next/link';
import SvgIcons from 'components/SvgIcons';
import { Tooltip } from 'reactstrap';
import { string, number } from 'prop-types';
import './style.scss';
import { NAVIGATE_URL } from 'constants/url';

const ALL_PATH = ['ic_menu', 'ic_account', 'ic_newfeed', 'ic_rank', 'ic_setting'];
const ALL_LINKS = ['#', '#', NAVIGATE_URL.NEWS_PAGE, NAVIGATE_URL.RANK_PAGE, '#'];
const ALL_CONTENTS = ['Menu', 'Profile', 'Bảng tin', 'Xếp hang', 'Cài đặt'];

const MenuTooltipItem = ({ item, index }) => {

  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <li className="w-100">
      <Link href={ALL_LINKS[index]}>
        <a className="d-block p-3 text-center"
           id={`tooltip-for-${index}`}>
          <SvgIcons fileName={item} />
        </a>
      </Link>
      <Tooltip placement="right"
               isOpen={tooltipOpen}
               target={`tooltip-for-${index}`}
               toggle={toggle}>
        {ALL_CONTENTS[index]}
      </Tooltip>
    </li>
  );
};

MenuTooltipItem.propTypes = {
  item: string,
  index: number
};

const MainSidebar = () => {

  return (
    <div className='main-sidebar bg-light shadow-lg'>
      <ul className="p-0 m-0 d-flex align-items-center flex-lg-column justify-content-between">
        { ALL_PATH.map((item, index) => <MenuTooltipItem  key={index}
                                                                              index={index}
                                                                              item={item}/>) }
      </ul>
    </div>
  );
};

export default React.memo(MainSidebar);
