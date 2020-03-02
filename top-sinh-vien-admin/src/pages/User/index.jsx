import React, { useEffect, useState } from 'react';
import Aux from 'hoc/_Aux';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Card from 'App/components/MainCard';
import UcFirst from 'App/components/UcFirst';
import { shallowEqual, useSelector } from 'react-redux';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';
import ListUser from './ListUser';

import { getAllRole, searchUser } from '../../store/user/actions';
import Pagination from 'components/Pagination';
import UserActionModal from './UserActionModal';
import { getAllSchool } from '../../store/school/actions';
import SelectSearchBox from '../../components/SelectSearchBox';

const User = () => {
  const [getAllUserAction, getAllRoleAction, searchUserAction, getAllSchoolAction] = useActions(
    [searchUser, getAllRole, searchUser, getAllSchool],
    null
  );

  const allUsers = useSelector(store => store.user.allUsers, shallowEqual);
  const userStatus = useSelector(store => store.user.status, shallowEqual);
  const allRoles = useSelector(store => store.user.allRoles, shallowEqual);
  const totalUsers = useSelector(store => store.user.total, shallowEqual);
  const allSchool = useSelector(store => store.school.schools, shallowEqual);
  const [addUserStatus, toggleAddUser, closeAddUser] = useModal(false);
  const [key_search, setKeySearch] = useState('');
  const [school, setSchool] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });
  const { page, limit } = pagination;
  const schoolOptions = React.useMemo(
    () =>
      allSchool.length
        ? allSchool.map(item => ({
            ...item,
            fullName: `${item.name} - (${item.schoolCode})`,
            value: item._id,
            label: `${item.name} - (${item.schoolCode})`
          }))
        : [],
    [allSchool.length]
  );
  const indexNumber = (page - 1) * limit;

  const onChangeSearchForm = e => {
    const value = e.target.value;
    setKeySearch(value);

    // if (!value) getAllUserAction({ page: 1, limit });
  };

  const onSubmitSearchForm = () => {
    const notInitPage = page !== 1;
    if (notInitPage) {
      setPagination({
        ...pagination,
        page: 1
      });
    }

    searchUserAction({
      page: notInitPage ? 1 : page,
      key_search,
      limit,
      id_school: school
    });
  };

  const onPaginate = value => {
    const { selected } = value;
    const page = selected + 1;

    setPagination({
      ...pagination,
      page
    });

    searchUserAction({
      page,
      key_search,
      limit,
      id_school: school
    });
    // if (!key_search) getAllUserAction({ page, limit });
    // else searchUserAction({ page, key_search, limit });
  };

  const onGetSchool = data => {
    setSchool(data ? data.value : '');
  };

  const keyPressed = event => {
    const enterKey = event.key === 'Enter';

    if (enterKey) {
      event.preventDefault();
      onSubmitSearchForm();
    }
  };

  useEffect(() => {
    getAllUserAction({ page, limit });
    getAllRoleAction({});
    getAllSchoolAction({});
  }, []);

  return (
    <Aux>
      <Row>
        <Col>
          <Card title="Thêm user">
            <div className="d-flex justify-content-start align-items-center">
              <Button className="border-0 theme-bg1 btn-theme" onClick={toggleAddUser}>
                <UcFirst text="Thêm user" />
              </Button>
            </div>
          </Card>
          <Card title="Tất cả user">
            <div className="row mb-4">
              <div className="col-12 col-xl-7">
                <Form className={'mb-0 d-flex align-items-center '}>
                  <Form.Control
                    type="text"
                    name="key_search"
                    className="bg-white"
                    placeholder="Tìm kiếm theo tên user, số điện thoại hoặc email ..."
                    onKeyPress={keyPressed}
                    onChange={onChangeSearchForm}
                    value={key_search}
                  />
                </Form>
              </div>
              <div className="col-12 col-xl-3">
                <SelectSearchBox
                  isMulti={false}
                  options={schoolOptions}
                  // value={school}
                  placeholder="Tìm kiếm trường"
                  classes="flex-shrink-0"
                  onChange={onGetSchool}
                  keyLabel="fullName"
                />
              </div>
              <div className="col-12 col-xl-2">
                <Button color="primary" className="ml-3 flex-shrink-0" onClick={() => onSubmitSearchForm()}>
                  Tìm kiếm
                </Button>
              </div>
            </div>
            <ListUser allUsers={allUsers} allRoles={allRoles} indexNumber={indexNumber} userStatus={userStatus} />
            <div className="d-flex justify-content-center">
              <Pagination total={totalUsers} forcePage={page - 1} onPageChange={onPaginate} perpage={limit} />
            </div>
          </Card>
        </Col>
      </Row>
      <UserActionModal show={addUserStatus} userStatus={userStatus} onHide={closeAddUser} />
    </Aux>
  );
};

export default React.memo(User);
