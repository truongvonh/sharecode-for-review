import React, { useEffect, useState } from 'react';
import { Table, FormCheck, Button } from 'react-bootstrap';
import useModal from 'hooks/useModal';
import { useActions } from 'hooks/useActions';
import moment from 'moment';

import { rendeTableHeader } from 'utils/renderUltil';
import ButtonWithToolTip from 'components/ButtonWithToolTip';
import ToolTipCustom from 'components/ToolTipCustom';
import { array, bool, number } from 'prop-types';
import ConfirmModal from 'components/ConfirmModal';
import ImageWithFallback from '../../../components/ImageWithFallback';
import AdsActionModal from '../AdsActionModal';
import './style.scss';
import { deleteBannerAds, setHotNew } from 'store/ads/actions';
import { DELETE_BANNER_ADS_SUCCESS } from 'store/ads/constant';
import { BANNER_CONSTANT } from 'constant';
import { truncateText } from 'utils/helper';

const headerField = [
  'No.',
  'Tên đơn vị',
  'Liên kết',
  'Ngày bắt đầu',
  'Ngày kết thúc',
  'Chi tiết',
  'Hình ảnh',
  'Thể loại',
  'Hot news',
  'Trạng thái',
  'Thao tác'
];
const ListAds = ({ allAds, adsStatus, indexNumber, allBannerType }) => {
  const [confirmMdStatus, toggleMdConfirm, closeMdConfirm] = useModal(false);
  const [editMdStatus, toggleEditMd, closeMdEdit] = useModal(false);
  const [adsItem, setAdsItem] = useState({});
  const [deleteBannerAdsAction, setHotNewAction] = useActions([deleteBannerAds, setHotNew], null);
  const [status, setStatus] = useState(false);

  const onSelectItem = (item, cb) => {
    setAdsItem(item);
    cb();
  };

  const onDeleteItem = (item, cb) => {
    setAdsItem(item);
    setStatus(item.delete);
    cb();
  };
  //
  const onClearItem = cb => {
    setAdsItem({});
    cb();
  };

  const onSubmit = () => {
    deleteBannerAdsAction({ id: adsItem._id });
  };

  const onToggleHotNews = (e, item) => {
    setHotNewAction({ id: item._id });
  };

  useEffect(() => {
    if (adsStatus === DELETE_BANNER_ADS_SUCCESS) onClearItem(closeMdConfirm);
  }, [adsStatus]);

  const renderScreenPosition = item => {
    const itemPosition = BANNER_CONSTANT.POSITION.find(el => el.value === item.position);
    const itemScreen = BANNER_CONSTANT.SCREEN.find(s => s.value === item.screen);
    return (
      <ul className="m-0 p-0">
        <li>Vị trí : {itemPosition.label}</li>
        <li>Màn hình : {itemScreen.label}</li>
      </ul>
    );
  };

  const renderTableBody = allAds => {
    const result = allAds.length
      ? allAds.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">{indexNumber + index + 1}</th>
              <td>{item.title}</td>
              <td>
                <a href={item.link} className="text-primary">
                  <u>{truncateText(item.link, 20)}</u>
                </a>
              </td>
              <td>{moment(item.timeStart).format('MM/DD/YYYY hh:mm:ss a')}</td>
              <td>{moment(item.timeEnd).format('MM/DD/YYYY hh:mm:ss a')}</td>
              <td>{renderScreenPosition(item)}</td>
              <td className="p-3">
                <ImageWithFallback
                  src={item.photos.length && item.photos[0].origin}
                  className="img-thumbnail rounded affiliate-image"
                />
              </td>
              <td className="align-middle">
                <span className={'badge badge-primary'}>{item.idTypeBanner.name}</span>
              </td>
              <td className="px-3">
                <FormCheck custom type="switch">
                  <FormCheck.Input isValid checked={item.hotNew} />
                  <FormCheck.Label />
                  <FormCheck.Label onClick={e => onToggleHotNews(e, item)} />
                </FormCheck>
              </td>
              <td className="align-middle">
                <span className={`badge ${item.delete ? 'badge-danger' : 'badge-primary'} `}>
                  {item.delete ? 'deleted' : 'active'}
                </span>
              </td>
              <td className="px-0">
                <div className="d-flex">
                  <div className="mr-4">
                    <ButtonWithToolTip
                      content="Sửa liên kết"
                      disabled={item.delete}
                      variant="success"
                      onClick={() => onSelectItem(item, toggleEditMd)}
                      icons="icon-edit"
                    />
                  </div>
                  <ToolTipCustom content={`${item.delete ? 'Khôi phục' : 'Xóa thể loại'}`}>
                    <Button
                      variant={`${item.delete ? 'primary' : 'danger'}`}
                      onClick={() => onDeleteItem(item, toggleMdConfirm)}
                      className="rounded-circle p-2 d-flex justify-content-center align-items-center m-0"
                    >
                      <i className={`feather mr-0 ${item.delete ? 'icon-repeat' : 'icon-trash-2'} `} />
                    </Button>
                  </ToolTipCustom>
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
        {renderTableBody(allAds)}
      </Table>
      <ConfirmModal
        onHide={closeMdConfirm}
        content={`${!status ? 'Bạn có muốn xóa quảng cáo này' : 'Bạn có muốn khôi phục quảng cáo này'}`}
        onSelect={onSubmit}
        show={confirmMdStatus}
      />
      <AdsActionModal
        onHide={() => onClearItem(closeMdEdit)}
        show={editMdStatus}
        adsStatus={adsStatus}
        adsItem={adsItem}
        allBannerType={allBannerType}
      />
    </>
  );
};

ListAds.propTypes = {
  allAds: array,
  adsStatus: bool,
  indexNumber: number,
  allBannerType: array
};

export default React.memo(ListAds);
