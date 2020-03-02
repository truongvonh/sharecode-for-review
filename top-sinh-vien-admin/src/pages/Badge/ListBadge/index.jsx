import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import useModal from 'hooks/useModal';

import { rendeTableHeader } from 'utils/renderUltil';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import { array, bool, number } from 'prop-types';
import ImageWithFallback from '../../../components/ImageWithFallback';
import BadgeActionModal from '../BadgeActionModal';
import './style.scss';

const headerField = ['No.', 'Tên danh hiệu', 'Hình ảnh', 'Điểm', 'Tiêu chí', 'Thao tác'];
const ListBadge = ({ allBadge, badgeStatus }) => {

  const [editBadgeMd, toggleEditMd, closeMdEdit] = useModal(false);
  const [badgeItem, setBadgeItem] = useState({});

  const onSelectItem = (item, cb) => {
    setBadgeItem(item);
    cb();
  };

  const onClearItem = (cb) => {
    setBadgeItem({});
    cb();
  };
  
  const renderCriteria = (item) => {
    if (item.criteria && typeof item.criteria === 'object') {
      const result = Object.entries(item.criteria).map(item => {
        const label = (item[0] === 'commentCount') ? 
          'Tổng số bình luận' :
          'Số ngày đạt danh hiệu';
        return (
          <>
            <li className="d-flex">
              <p className="mb-0 font-weight-bold mr-2">{label}</p>
              <p className="mb-0 font-weight-bold">{item[1]}</p>
            </li>
          </>
        );
      });
      
      return (
        <ul className="pl-0 m-0">{result}</ul>
      );
    }
    return 'Không có tiêu chí';
  };

  const renderTableBody = allBadge => {
      const result = allBadge.length
        ? allBadge.map((item, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td>
              <ImageWithFallback src={item.photos[0].origin}
                                 className="img-thumbnail rounded affiliate-image"/>
            </td>
            <td className="p-3">{item.point}</td>
            <td className="px-3">{renderCriteria(item)}</td>
            <td className="px-0">
              <ButtonWithToolTip  content="Cập nhật huy hiệu"
                                  variant="success"
                                  onClick={() => onSelectItem(item, toggleEditMd)}
                                  icons="icon-edit" />
            </td>
          </tr>
        ))
        : null;
      return <tbody>{result}</tbody>;
    };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderTableBody(allBadge)}
      </Table>
      <BadgeActionModal onHide={() => onClearItem(closeMdEdit)}
                        show={editBadgeMd}
                        badgeItem={badgeItem} />
    </>
  );
};

ListBadge.propTypes = {
  allBadge: array,
  indexNumber: number
};

export default React.memo(ListBadge);