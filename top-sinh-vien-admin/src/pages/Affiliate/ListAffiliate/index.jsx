import React, { useState } from 'react';
import { Table, FormCheck, Badge } from 'react-bootstrap';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import { rendeTableHeader } from 'utils/renderUltil';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import { array, number } from 'prop-types';
import ConfirmModal from 'components/ConfirmModal';
import { truncateText } from 'utils/helper';
import ImageWithFallback from '../../../components/ImageWithFallback';
import { deleteAffiliate, toggleAffiliateVisible } from '../../../store/affiliate/actions';
import ActionAffiliateModal from '../AffiliateActionModal';
import './style.scss';

const headerField = ['No.', 'Tên đơn vị', 'Liên kết', 'Trạng thái', 'Hình ảnh', 'Bật/Tắt hiển thị', 'Thao tác'];
const ListAffiliate = ({ allAffiliate, indexNumber }) => {
  const [confirmMdStatus, toggleMdConfirm, closeMdConfirm] = useModal(false);
  const [editMdStatus, toggleEditMd, closeMdEdit] = useModal(false);
  const [affiliateItem, setAffiliateItem] = useState({});
  const [deleteAffiliateAction, toggleAffiliateVisibleAction] = useActions(
    [deleteAffiliate, toggleAffiliateVisible],
    null
  );

  const onSelectItem = (item, cb) => {
    setAffiliateItem(item);
    cb();
  };
  //
  const onClearItem = cb => {
    setAffiliateItem({});
    cb();
  };

  const onSubmit = () => {
    deleteAffiliateAction({ id: affiliateItem._id });
    toggleMdConfirm();
  };

  const onToggleVisible = (e, item) => {
    toggleAffiliateVisibleAction({ id: item._id });
  };

  const renderTableBody = allReport => {
    const result = allReport.length
      ? allReport.map((item, index) => (
          <tr key={index}>
            <th scope="row">{indexNumber + index + 1}</th>
            <td>{item.name}</td>
            <td>
              <a href={item.link} className="text-primary">
                <u>{truncateText(item.link, 20)}</u>
              </a>
            </td>
            <td>
              <Badge variant={!item.delete ? 'success' : 'danger'}>{!item.delete ? 'Đang hoạt động' : 'Bị xóa'}</Badge>
            </td>
            <td className="p-3">
              <ImageWithFallback
                src={!!item.photos[0] && item.photos[0].origin}
                className="img-thumbnail rounded affiliate-image"
              />
            </td>
            <td className="px-3">
              <FormCheck custom type="switch">
                <FormCheck.Input isValid checked={item.status} />
                <FormCheck.Label />
                <FormCheck.Label onClick={e => onToggleVisible(e, item)} />
              </FormCheck>
            </td>
            <td className="px-0">
              <div className="d-flex">
                <div className="mr-4">
                  <ButtonWithToolTip
                    content="Sửa liên kết"
                    variant="success"
                    onClick={() => onSelectItem(item, toggleEditMd)}
                    icons="icon-edit"
                    disabled={item.delete}
                  />
                </div>
                <ButtonWithToolTip
                  content={!item.delete ? 'Xoá' : 'Phục hồi'}
                  variant={!item.delete ? 'danger' : 'info'}
                  onClick={() => onSelectItem(item, toggleMdConfirm)}
                  icons={!item.delete ? 'icon-trash-2' : 'icon-repeat'}
                />
              </div>
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
        {renderTableBody(allAffiliate)}
      </Table>
      <ConfirmModal
        onHide={closeMdConfirm}
        content="Bạn có muốn xoá liên kết này không?"
        onSelect={onSubmit}
        show={confirmMdStatus}
      />
      <ActionAffiliateModal onHide={() => onClearItem(closeMdEdit)} show={editMdStatus} affiliateItem={affiliateItem} />
    </>
  );
};

ListAffiliate.propTypes = {
  allAffiliate: array,
  indexNumber: number
};

export default React.memo(ListAffiliate);
