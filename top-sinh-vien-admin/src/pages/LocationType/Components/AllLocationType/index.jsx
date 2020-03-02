import React, { useState, memo, useEffect } from 'react';
import { array, func } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import './style.scss';
import useModal from '../../../../hooks/useModal';
import ConfirmModal from '../../../../components/ConfirmModal';
import ToolTipCustom from '../../../../components/ToolTipCustom';
import { useSelector, shallowEqual } from 'react-redux';
import { DELETE_LOCATION_TYPE_SUCCESS } from '../../../../store/location/constant';
import { formatDate } from '../../../../utils/helper';
import { rendeTableHeader } from '../../../../utils/renderUltil';

const headerField = ['No.', 'Tên thể loại', 'Ngày tạo', 'Trạng thái', 'Thao tác'];

const AllLocationType = ({ allTypes, deleteLocationType, onEditLocationType }) => {
  const filterStatus = useSelector(store => store.location.status, shallowEqual);
  const [removeId, setRemoveId] = useState('');
  const [status, setStatus] = useState(false);
  const [isShowRemove, toggleRemoveModal, closeRemove] = useModal(false);

  useEffect(() => {
    if (filterStatus === DELETE_LOCATION_TYPE_SUCCESS) {
      closeRemove();
      setRemoveId('');
    }
  }, [filterStatus]);

  const onRemoveLocationType = (id, status) => {
    setRemoveId(id);
    setStatus(status);
    toggleRemoveModal();
  };

  const renderAllLocation = locations => {
    const result = locations.length
      ? locations.map((item, index) => {
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
            {
              item.name === 'Tất cả' ? null : <td className="d-flex align-items-center">
                <ToolTipCustom content={`${item.delete ? 'Restore location type' : 'Remove location type'}`}>
                  <Button
                    variant={`${item.delete ? 'primary' : 'danger'}`}
                    onClick={() => onRemoveLocationType(item._id, item.delete)}
                    className="rounded-circle p-2 d-flex justify-content-center align-items-center m-0"
                  >
                    <i className={`feather mr-0 ${item.delete ? 'icon-repeat' : 'icon-trash-2'} `} />
                  </Button>
                </ToolTipCustom>
                <ToolTipCustom content={`${item.delete ? 'Can not edit location type' : 'Edit location type'}`}>
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
            }
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
        {renderAllLocation(allTypes)}
      </Table>
      <ConfirmModal
        content={`${
          status ? 'Are you sure to restore this location type' : 'Are you sure to remove this location type'
          }`}
        onSelect={() => deleteLocationType({ id: removeId })}
        show={isShowRemove}
        border="none"
        onHide={closeRemove}
      />
    </>
  );
};

AllLocationType.propTypes = {
  allTypes: array,
  deleteLocationType: func,
  onEditLocationType: func
};

export default memo(AllLocationType);
