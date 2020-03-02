import React, { useState, useEffect, memo } from 'react';
import { array, func, string, number } from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import ToolTipCustom from 'components/ToolTipCustom';
import './style.scss';
import ConfirmModal from '../../../Campaign/Components/ConfirmModal';
import { REMOVE_SCHOOL_SUCCESS, ADD_ADS_SCHOOL_SUCCESS } from '../../../../store/school/constant';
import { toast } from 'react-toastify';
import { useActions } from 'hooks/useActions';
import { addAdsSchool } from 'store/school/actions';
import EditSchoolDialog from './../EditSchoolDialog/index';
import ImageWithFallback from '../../../../components/ImageWithFallback';

const headerField = ['No.', 'Tên', 'Ảnh bìa', 'Địa chỉ', 'Mã trường', 'Thao tác'];

const rendeTableHeader = headerField => {
  const result = headerField.length
    ? headerField.map((item, index) => {
        return (
          <th key={index} className="border-top-0">
            {item}
          </th>
        );
      })
    : null;

  return (
    <thead>
      <tr>{result}</tr>
    </thead>
  );
};

const AllSchools = ({ status, schools, addTeam, indexNumber, removeSchool }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [school_id, setSchoolId] = useState(null);
  const [school, setSchool] = useState(null);

  const [editSchoolModal, setEditSchoolModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const addAdsSchoolAction = useActions(addAdsSchool, null);

  const onOpenEditModal = item => {
    setEditSchoolModal(true);
    setEditItem(item);
  };

  const onCloseEditModal = () => {
    setEditSchoolModal(false);
    setEditItem(null);
  };

  const onCloseModal = () => {
    setConfirmModal(false);
    setSchoolId(null);
    setSchool(null);
  };

  useEffect(() => {
    if (status === REMOVE_SCHOOL_SUCCESS) onCloseModal();
    if (status === ADD_ADS_SCHOOL_SUCCESS) {
      toast.success('Thành công !');
      onCloseModal();
    }
  }, [status]);

  const handleConfirmModal = school => {
    if (!school.check) {
      setConfirmModal(!confirmModal);
      setSchoolId(school._id);
    } else return toast.warn('Không thể xóa trường');
  };

  const handleConfirmAdsModal = school => {
    setSchool(school);
    setConfirmModal(!confirmModal);
  };

  const onRemoveSchool = () => removeSchool(school_id);

  const renderSchoolsTableBody = schools => {
    const result = schools.length
      ? schools.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">{indexNumber + index + 1}</th>
              <td>{item.name}</td>
              <td>
                <ImageWithFallback
                  className="rounded-circle circle-image-avatar"
                  src={item.cover && item.cover.length && item.cover[0].origin}
                />
              </td>
              <td>{item.address}</td>
              <td>{item.schoolCode}</td>
              <td className="action-area">
                <Button
                  className="rounded p-1 d-flex justify-content-center align-items-center"
                  variant="outline-info"
                  onClick={() => onOpenEditModal(item)}
                >
                  <i className="feather mr-0 icon-edit text-primary" />
                </Button>
                <Button
                  className="rounded-circle p-1 d-flex justify-content-center align-items-center"
                  variant="danger"
                  disabled={item.check}
                  onClick={() => handleConfirmModal(item)}
                >
                  <i className="feather mr-0 icon-trash-2" />
                </Button>
                <ToolTipCustom content={`${item.ads ? 'Xoá quảng cáo' : 'Đặt quảng cáo'}`}>
                  <Button
                    disabled={item.delete}
                    onClick={() => handleConfirmAdsModal(item)}
                    className={`${
                      item.ads ? 'btn-theme' : 'theme-bg2'
                    } rounded-circle p-2 d-flex justify-content-center align-items-center ml-2 mb-0 border-0`}
                  >
                    <i className={`${item.ads ? 'feather mr-0 icon-delete' : 'feather mr-0 icon-star'}`} />
                  </Button>
                </ToolTipCustom>
                {item.check ? (
                  <Button variant="secondary" className="p-1" disabled>
                    In team
                  </Button>
                ) : (
                  <Button onClick={() => addTeam(item._id)} className="p-1" variant="warning">
                    Add team
                  </Button>
                )}
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
        {renderSchoolsTableBody(schools)}
      </Table>
      <ConfirmModal
        content="Bạn có muốn xóa trường này ?"
        show={confirmModal}
        onSelect={onRemoveSchool}
        onHide={onCloseModal}
      />
      <ConfirmModal
        content={
          !!school && !!school.ads
            ? 'Bạn có muốn xoá quảng cáo trường này không ?'
            : 'Bạn có muốn đặt quảng cáo trường này không ?'
        }
        show={confirmModal}
        onSelect={() => addAdsSchoolAction({ id_school: school._id })}
        onHide={onCloseModal}
      />
      <EditSchoolDialog show={editSchoolModal} school={editItem} onHide={onCloseEditModal} />
    </>
  );
};

AllSchools.propTypes = {
  schools: array,
  status: string,
  addTeam: func,
  removeSchool: func,
  indexNumber: number
};

export default memo(AllSchools);
