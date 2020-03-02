import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Aux from '../../hoc/_Aux';
import CardView from '../../components/Dashboard/CardView';
import './style.scss';
import { getStatistical } from '../../store/Dashboard/actions';
import { useActions } from '../../hooks/useActions';
import { useSelector, shallowEqual } from 'react-redux';
import StatisticalChart from './Chart';
import FilterMember from './FilterMember';

const DashBoard = () => {
  const getStatisticalAction = useActions(getStatistical, null);
  const allStatistical = useSelector(store => store.statistical.allStatistical, shallowEqual);

  useEffect(() => {
    getStatisticalAction();
  }, []);

  const titles = [
    'Tổng user',
    'Tổng user đang hoạt động',
    'Tổng user bị khóa',
    'Tổng user chưa kích hoạt',
    'Tổng user thường xuyên hoạt động',
    'Địa điểm đánh giá',
    'Địa điểm đánh giá đã xóa',
    'Trường học đánh giá',
    'Trường học đánh giá đã xóa',
    'Tổng admin kích hoạt',
    'Tổng admin đã khóa',
    'Bài viết góc mua bán',
    'Bài viết trai xinh gái đẹp',
    'Bài viết Funny',
    'Bài viết góc tìm trọ',
    'Bài viết tin tức'
  ];
  const properties = [
    'totalUser',
    'userActive',
    'userBlocked',
    'userInActive',
    'activeUserRegularly',
    'locationReview',
    'locationReviewDelete',
    'schoolReview',
    'schoolReviewDelete',
    'adminActive',
    'adminBlocked',
    'tenantGroup',
    'beautyGroup',
    'entertainmentGroup',
    'tradingGroup',
    'newsGroup'
  ];
  const icons = [
    'user',
    'user-check',
    'user-x',
    'user-minus',
    'activity',
    'map-pin',
    'x-circle',
    'award',
    'x-square',
    'user-check',
    'user-x',
    'briefcase',
    'heart',
    'music',
    'home',
    'file-text'
  ];

  const userData = allStatistical && [
    allStatistical.totalUser,
    allStatistical.userActive,
    allStatistical.userInActive,
    allStatistical.userBlocked,
    allStatistical.activeUserRegularly
  ];
  const userLabel = [
    'Tổng user',
    'Tổng user đang hoạt động',
    'Tổng user bị khóa',
    'Tổng user chưa kích hoạt',
    'Tổng user thường xuyên hoạt động'
  ];
  const userName = 'Thống kê thành viên';

  const locationData = allStatistical && [allStatistical.locationReview, allStatistical.locationReviewDelete];
  const labelLocation = ['Địa điểm đánh giá', 'Địa điểm đánh giá đã xóa'];
  const nameLocation = 'Thống kê địa điểm';

  const schoolData = allStatistical && [allStatistical.schoolReview, allStatistical.schoolReviewDelete];
  const schoolLabel = ['Trường học đánh giá', 'Trường học đánh giá đã xóa'];
  const locationName = 'Thống kê trường học';

  const adminData = allStatistical && [allStatistical.adminActive, allStatistical.adminBlocked];
  const adminLabel = allStatistical && ['Tổng admin kích hoạt', 'Tổng admin đã khóa'];
  const adminName = 'Thống kê admin';

  const groupData = allStatistical && [
    allStatistical.tenantGroup,
    allStatistical.beautyGroup,
    allStatistical.entertainmentGroup,
    allStatistical.tradingGroup,
    allStatistical.newsGroup
  ];

  const groupLabel = [
    'Bài viết góc mua bán',
    'Bài viết trai xinh gái đẹp',
    'Bài viết Funny',
    'Bài viết góc tìm trọ',
    'Bài viết tin tức'
  ];
  const groupName = 'Thống kê group';

  return (
    <>
      <Aux>
        <h3> Thống kê số liệu</h3>
        <Row className="align-items-stretch">
          {titles.map((item, index) => (
            <Col sm={6} md={3} key={index} className="h-100">
              <CardView
                title={titles[index]}
                total={allStatistical && allStatistical[properties[index]]}
                icon={icons[index]}
              />
            </Col>
          ))}
        </Row>
        <Row className="align-items-stretch">
          {allStatistical &&
            allStatistical.role.map((item, index) => (
              <Col sm={6} md={4} key={index} className="h-100">
                <CardView
                  title={'Quyền: ' + item.name.toLowerCase()}
                  total={allStatistical && item.total}
                  icon={'cpu'}
                />
              </Col>
            ))}
        </Row>
        <h3>Thống kê biểu đồ</h3>
        <Row>
          <Col>
            <StatisticalChart data={userData} label={userLabel} name={userName} />
          </Col>
        </Row>
        <Row>
          <Col>
            <StatisticalChart data={locationData} label={labelLocation} name={nameLocation} />
          </Col>
        </Row>
        <Row>
          <Col>
            <StatisticalChart data={schoolData} label={schoolLabel} name={locationName} />
          </Col>
        </Row>
        <Row>
          <Col>
            <StatisticalChart data={adminData} label={adminLabel} name={adminName} />
          </Col>
        </Row>
        <Row>
          <Col>
            <StatisticalChart data={groupData} label={groupLabel} name={groupName} />
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: '10px' }}>
            <FilterMember />
          </Col>
        </Row>
      </Aux>
    </>
  );
};

export default React.memo(DashBoard);
