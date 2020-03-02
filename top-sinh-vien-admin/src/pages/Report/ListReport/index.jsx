import React, { useEffect, useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import { rendeTableHeader } from 'utils/renderUltil';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import { array, bool, number } from 'prop-types';
import ConfirmModal from 'components/ConfirmModal';
import { _renderTitle, truncateText } from 'utils/helper';
import ImageWithFallback from '../../../components/ImageWithFallback';
import './style.scss';
import { blockReport } from '../../../store/report/actions';
import { useSelector, shallowEqual } from 'react-redux';
import { BLOCK_REPORT_SUCCESS } from '../../../store/report/constant';

const headerField = [
  'No.',
  'Người báo cáo',
  'Nội dung bài viết bị báo cáo',
  'Hình ảnh',
  'Trạng thái',
  'Loại vi phạm',
  'Tiêu đề',
  'Nội dung',
  'Thao tác'
];
const ListReport = ({ allReports, actionStatus, indexNumber }) => {
  const [confirmMdStatus, toggleMdConfirm, closeMdConfirm] = useModal(false);
  const [reportItem, setReportItem] = useState({});
  const blockReportAction = useActions(blockReport, null);
  const reportStatus = useSelector(store => store.report.status, shallowEqual);

  const onSelectItem = (item, cb) => {
    setReportItem(item);
    cb();
  };
  //
  const onClearItem = cb => {
    setReportItem({});
    cb();
  };

  const onSubmit = () => {
    blockReportAction({ id: reportItem._id });
  };
  //

  const renderType = onModel => {
    let result = null;
    switch (onModel) {
      case 'LocationReview':
        result = 'Đánh giá địa điểm';
        break;
      case 'SchoolReview':
        result = 'Đánh giá trường học';
        break;
      case 'GroupPost':
        result = 'Bài viết nhóm';
        break;
      case 'Users':
        result = 'User';
        break;
      case 'Comment':
        result = 'Bình luận';
        break;
      case 'CampaignComment':
        result = 'Bình luận campaign';
        break;
    }
    return result;
  };

  useEffect(() => {
    if (reportStatus === BLOCK_REPORT_SUCCESS) onClearItem(closeMdConfirm);
  }, [reportStatus]);

  const renderTableBody = allReport => {
    const result = allReport.length
      ? allReport.map((item, index) => (
        <tr key={index}>
          <th scope="row">{indexNumber + index + 1}</th>
          <td>{item.user && `${item.user.profile.firstName} ${item.user.profile.lastName}`}</td>
          <td>{item.document && truncateText(item.document.content)}</td>
          <td className="p-3">
            <ImageWithFallback
              src={item.photos && item.photos.length && item.photos[0].origin}
              className="img-thumbnail rounded report-image"
            />
          </td>
          <td>
            <Badge variant={item.document && item.document.delete ? 'danger' : 'success'}>
              {item.document && item.document.delete ? "Đã xóa" : 'Đang hoạt động'}
            </Badge>
          </td>
          <td>{renderType(item.onModel)}</td>
          <td>{_renderTitle(item.title)}</td>
          <td>{_renderTitle(item.reason)}</td>
          <td className="px-0">
            <ButtonWithToolTip
              content="Khoá đối tượng "
              variant="danger"
              disabled={actionStatus}
              onClick={() => onSelectItem(item, toggleMdConfirm)}
              icons="icon-lock"
            />
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
        {renderTableBody(allReports)}
      </Table>
      <ConfirmModal
        onHide={closeMdConfirm}
        content="Bạn có muốn khoá đối tượng này không?"
        onSelect={onSubmit}
        show={confirmMdStatus}
      />
    </>
  );
};

ListReport.propTypes = {
  allReports: array,
  actionStatus: bool,
  indexNumber: number
};

export default React.memo(ListReport);
