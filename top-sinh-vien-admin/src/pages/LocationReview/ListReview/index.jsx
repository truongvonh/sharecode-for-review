import React, { useEffect, useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { rendeTableHeader } from 'utils/renderUltil';
import { formatDate } from 'utils/helper';
import useModal from 'hooks/useModal';
import ConfirmModal from 'components/ConfirmModal';
import { useActions } from 'hooks/useActions';
import { _renderTitle } from '../../../utils/helper';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import { DELETE_LOCATION_REVIEW_SUCCESS } from 'store/locationReview/constant';
import { getLocationReview, deleteLocationReview } from 'store/locationReview/actions';
import ReviewActionModal from '../ReviewActionModal';

const headerField = ['No.', 'Nội dung', 'Xếp hạng đánh giá', 'Địa điểm', 'Ngày tạo', 'Người đánh giá', 'Thao tác'];

const ListLocationReview = ({ locationReviewStatus, allLocationReview, indexNumber }) => {
  const [removeLocationReview, getItemLocationReview] = useActions([deleteLocationReview, getLocationReview], null);
  const [confirmDeleteMd, toggleDeleteMd, closeDeleteMd] = useModal(false);
  const [actionReviewMd, toggleReviewMd, closeReviewMd] = useModal(false);
  const [locationReview, setLocationReview] = useState();

  const handleDelete = (item, cb) => {
    setLocationReview(item);
    cb();
  };

  const handleView = (item, cb) => {
    getItemLocationReview({ id: item._id });
    cb();
  };

  const onClearItem = cb => {
    setLocationReview({});
    cb();
  };

  const renderRating = data => {
    return (
      <>
        <Badge key={data} variant="primary" className="mr-2 mb-1">
          {data} <i className={'feather mr-0 icon-star'} />
        </Badge>
      </>
    );
  };

  useEffect(() => {
    if (locationReviewStatus === DELETE_LOCATION_REVIEW_SUCCESS) {
      onClearItem(closeDeleteMd);
    }
  }, [locationReviewStatus]);

  const renderLocationReview = allLocationReview => {
    const result = allLocationReview.length
      ? allLocationReview.map((e, index) => {
          const fullName = e.user && e.user.profile.firstName + ' ' + e.user.profile.lastName;
          return (
            <tr key={index}>
              <th scope="row">{indexNumber + index + 1}</th>
              <td className="px-0">{e.content && _renderTitle(e.content)}</td>
              <td className="d-flex flex-wrap">{e.rating && renderRating(e.rating)}</td>
              <td className="px-0">{e.location && e.location.name}</td>
              <td className="px-0">{e.createdAt && formatDate(e.createdAt)}</td>
              <td className="px-0">{fullName}</td>
              <td className="px-0">
                <div className="d-flex justify-content-around">
                  <ButtonWithToolTip
                    content="Chi tiết đánh giá"
                    icons="icon-eye"
                    onClick={() => handleView(e, toggleReviewMd)}
                  />
                  <ButtonWithToolTip
                    content="Xoá đánh giá"
                    icons="icon-trash-2"
                    variant="danger"
                    onClick={() => handleDelete(e, toggleDeleteMd)}
                  />
                </div>
              </td>
            </tr>
          );
        })
      : null;
    return <tbody>{result}</tbody>;
  };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderLocationReview(allLocationReview)}
      </Table>
      <ConfirmModal
        onHide={closeDeleteMd}
        content="Bạn có muốn xoá không?"
        show={confirmDeleteMd}
        onSelect={() => removeLocationReview({ id: locationReview._id })}
      />
      <ReviewActionModal show={actionReviewMd} onHide={closeReviewMd} />
    </>
  );
};

export default React.memo(ListLocationReview);
