import React, { useEffect, useState } from 'react';
import { array, func, object } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';

import { rendeTableHeader } from 'utils/renderUltil';
import ConfirmModal from 'components/ConfirmModal';
import ToolTipCustom from 'components/ToolTipCustom';
import { deleteBannerType, putBannerType } from 'store/ads/actions';
import { formatDate } from 'utils/helper';
import { useSelector, shallowEqual } from 'react-redux';
import { DELETE_BANNER_TYPE_SUCCESS, PUT_BANNER_TYPE_SUCCESS } from 'store/ads/constant';
import AddType from '../AddType';
import { toast } from 'react-toastify';

const ListAdsType = ({ allAdsType }) => {
  const headerField = ['No.', 'Tên thể loại', 'Ngày tạo', 'Trạng thái', 'Thao tác'];
  const [isShowRemove, toggleRemoveModal, closeRemove] = useModal(false);
  const [isShow, toggleAdd, closeAdd] = useModal(false);
  const filterStatus = useSelector(store => store.ads.status, shallowEqual);
  const [removeId, setRemoveId] = useState('');
  const [status, setStatus] = useState(false);
  const [dataType, setDataType] = useState({});
  const [deleteBannerTypeAction, putBannerTypeAction] = useActions([deleteBannerType, putBannerType], null);

  const onRemoveLocationType = item => {
    setRemoveId(item._id);
    setStatus(item.delete);
    toggleRemoveModal();
  };

  useEffect(() => {
    if (filterStatus === DELETE_BANNER_TYPE_SUCCESS) {
      closeRemove();
      toast.success('Thành công !');
      setRemoveId('');
    }
    if (filterStatus === PUT_BANNER_TYPE_SUCCESS) {
      toast.success('Cập nhật thành công !');
      closeAdd();
    }
  }, [filterStatus]);

  const onEditLocationType = item => {
    setDataType(item);
    toggleAdd();
  };

  const deleteLocationType = () => {
    deleteBannerTypeAction({ id_banner: removeId });
  };

  const renderTableBody = data => {
    const result = data.length
      ? data.map((item, index) => {
          return (
            <tr key={index}>
              <td className="align-middle" scope="row">
                {index + 1}
              </td>
              <td className="align-middle">{item.name}</td>
              <td className="align-middle">{formatDate(item.createdAt)}</td>
              <td className="align-middle">
                <span className={`badge ${item.delete ? 'badge-danger' : 'badge-primary'} `}>
                  {item.delete ? 'deleted' : 'active'}
                </span>
              </td>
              {item.name === 'Tất cả' ? null : (
                <td className="d-flex align-items-center">
                  <ToolTipCustom content={`${item.delete ? 'Khôi phục' : 'Xóa loại quảng cáo'}`}>
                    <Button
                      variant={`${item.delete ? 'primary' : 'danger'}`}
                      onClick={() => onRemoveLocationType(item)}
                      className="rounded-circle p-2 d-flex justify-content-center align-items-center m-0"
                    >
                      <i className={`feather mr-0 ${item.delete ? 'icon-repeat' : 'icon-trash-2'} `} />
                    </Button>
                  </ToolTipCustom>
                  <ToolTipCustom content={`${item.delete ? 'Không thể chỉnh sửa' : 'Sửa loại quảng cáo'}`}>
                    <Button
                      variant={'warning'}
                      disabled={item.delete}
                      onClick={() => onEditLocationType(item)}
                      className="rounded-circle p-2 ml-2 d-flex justify-content-center align-items-center m-0"
                    >
                      <i className="feather mr-0 icon-edit" />
                    </Button>
                  </ToolTipCustom>
                </td>
              )}
            </tr>
          );
        })
      : null;

    return <tbody>{result}</tbody>;
  };

  const handlePutBannerType = data => {
    putBannerTypeAction({ id_banner: dataType._id, name: data });
    closeAdd();
  };

  return (
    <>
      <Table striped responsive hover>
        {rendeTableHeader(headerField)}
        {renderTableBody(allAdsType)}
      </Table>
      <ConfirmModal
        content={`${!status ? 'Bạn có muốn xóa loại quảng cáo này' : 'Bạn có muốn khôi phục loại quảng cáo này'}`}
        onSelect={() => deleteLocationType()}
        show={isShowRemove}
        border="none"
        onHide={closeRemove}
      />
      <AddType show={isShow} isEdit={true} closeAdd={closeAdd} onSubmit={handlePutBannerType} dataType={dataType} />
    </>
  );
};

ListAdsType.propTypes = {
  allAdsType: array
};

export default React.memo(ListAdsType);
