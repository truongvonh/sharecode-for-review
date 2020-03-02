import React, { useEffect, useState } from 'react';
import { rendeTableHeader } from 'utils/renderUltil';
import { Table, Badge } from 'react-bootstrap';
import { formatDate } from 'utils/helper';
import useModal from 'hooks/useModal';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import ConfirmModal from 'components/ConfirmModal';
import { useActions } from 'hooks/useActions';
import { removeSchoolReview } from 'store/schoolReview/actions';
import { detailSchoolReview } from 'store/schoolReview/actions';
import { REMOVE_SCHOOL_REVIEW_SUCCESS } from 'store/schoolReview/constant';
import { _renderTitle } from '../../../utils/helper';
import ReviewActionModal from '../ReviewActionModal';

const headerField = ['No.', 'Nội dung', 'Xếp hạng đánh giá', 'Trường', 'Ngày tạo', 'Người đánh giá', 'Thao tác'];
const ListSchoolReview = ({ reviewStatus, allSchoolReview, schoolReviewStatus, indexNumber }) => {
  const [deleteSchoolReview, getDetailSchoolReview] = useActions([removeSchoolReview, detailSchoolReview], null);

  const [schoolReview, setSchoolReview] = useState();
  const [confirmMdStatus, toggleMdConfirm, closeMdConfirm] = useModal(false);
  const [actionReviewMd, toggleReviewMd, closeReviewMd] = useModal(false);

  const confirmDelete = (item, cb) => {
    setSchoolReview(item);
    cb();
  };

  const onClearItem = cb => {
    setSchoolReview({});
    cb();
  };

  const onViewReview = async (item, cb) => {
    getDetailSchoolReview({ id: item._id });
    cb();
  };

  useEffect(() => {
    if (schoolReviewStatus === REMOVE_SCHOOL_REVIEW_SUCCESS) {
      onClearItem(closeMdConfirm);
    }
  }, [schoolReviewStatus]);

  const renderRating = data => {
    return (
      data.length &&
      data.map((item, index) => {
        return (
          <>
            <Badge key={index} variant="success" className="mr-2 mb-1">
              {item.type.name}: {item.rating} <i className={'feather mr-0 icon-star'} />
            </Badge>
          </>
        );
      })
    );
  };

  const renderSchoolReview = allSchoolReview => {
    const result = allSchoolReview.length
      ? allSchoolReview.map((e, index) => {
          return (
            <tr key={index}>
              <th scope="row">{indexNumber + index + 1}</th>
              <td className="px-0">{_renderTitle(e.content)}</td>
              <td className="d-flex flex-wrap">{renderRating(e.rating)}</td>
              <td className="px-0">{e.school && e.school.name}</td>
              <td className="px-0">{formatDate(e.createdAt)}</td>
              <td className="px-0">{e.user.fullName}</td>
              <td className="px-0">
                <div className="d-flex justify-content-around">
                  <ButtonWithToolTip
                    content="Chi tiết đánh giá"
                    icons="icon-eye"
                    onClick={() => onViewReview(e, toggleReviewMd)}
                  />
                  <ButtonWithToolTip
                    content="Xoá r"
                    icons="icon-trash-2"
                    variant="danger"
                    onClick={() => confirmDelete(e, toggleMdConfirm)}
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
        {renderSchoolReview(allSchoolReview)}
      </Table>
      <ConfirmModal
        onHide={closeMdConfirm}
        content="Bạn có muốn xoá không?"
        show={confirmMdStatus}
        onSelect={() => deleteSchoolReview({ id: schoolReview._id })}
      />
      <ReviewActionModal show={actionReviewMd} reviewStatus={reviewStatus} onHide={closeReviewMd} />
    </>
  );
};

export default React.memo(ListSchoolReview);
