import React, { memo, useEffect, useMemo, useState } from 'react';
import ModalActions from 'components/ModalActions';
import BaseModal from 'components/BaseModal';
import { array, func, object, string } from 'prop-types';
import SelectSearchBox from 'components/SelectSearchBox';
import DropZoneFile from 'components/DropZoneFile';
import useUploadFile from 'hooks/useUploadFile';
import { ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS, ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS } from 'store/campaign/constant';

const CampaignBannersModal = ({
  bannerDetail,
  addBannerToMatchOrRound,
  editBannersOfMatchOrRound,
  status,
  type_apply,
  onHide,
  options,
  typeId,
  ...props
}) => {
  const [items, setItemsApply] = useState([]);

  const [filesTop, onUploadTopFiles, topFilesLoading, onClearTopFiles] = useUploadFile([], 'CAMPAIGN');
  const [filesBottom, onUploadBottomFiles, bottomFilesLoading, onClearBottomFiles] = useUploadFile([], 'CAMPAIGN');
  const isEdit = Object.values(bannerDetail).length;
  const onChangeValue = items => setItemsApply(items);

  useEffect(() => {
    if (status === ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS) {
      setItemsApply([]);
      onHide();
    }
  }, [status]);

  const getBannerPosition = index => {
    const item = bannerDetail.banners && bannerDetail.banners.length ? [bannerDetail.banners[index]] : [];

    return item.map(el => {
      const preview = el.url.length ? el.url[0].origin : [];
      return { ...el, preview };
    });
  };

  const topImages = useMemo(() => getBannerPosition(0), [bannerDetail]);
  const bottomImages = useMemo(() => getBannerPosition(1), [bannerDetail]);

  const onHideModal = () => {
    onClearTopFiles();
    onClearBottomFiles();
    onHide();
  };

  const onSubmit = () => {
    const banners = [
      { url: isEdit && !filesTop.length ? topImages[0].url : filesTop, position: 'TOP' },
      {
        url: isEdit && !filesBottom.length ? bottomImages[0].url : filesBottom,
        position: 'BOTTOM'
      }
    ];
    const items_apply = items.map(item => item.value);
    if (isEdit) editBannersOfMatchOrRound({ banners, items_id: bannerDetail._id });
    else addBannerToMatchOrRound({ banners, items_apply, type_id: typeId, type_apply });
  };

  return (
    <BaseModal
      {...props}
      title={`
        ${isEdit ? 'Edit campaign banner' : 'Add campaign banners'}`}
      borderNone={true}
      onHide={onHideModal}
      actions={
        <ModalActions
          onOk={onSubmit}
          isLoading={status === ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS}
          disabledOk={!filesTop.length && !filesBottom.length}
          onHide={onHideModal}
        />
      }
    >
      <label className="form-label font-weight-bold">All round apply</label>
      {!isEdit && (
        <SelectSearchBox
          isMulti
          isAnimatate
          keyLabel="title"
          value={items}
          options={options}
          onChange={onChangeValue}
          closeMenuOnSelect={false}
        />
      )}

      <label className="form-label font-weight-bold my-2">Banner position top</label>
      <DropZoneFile images={topImages} onChangFile={onUploadTopFiles} />
      <label className="form-label font-weight-bold my-2">Banner position Bottom</label>
      <DropZoneFile images={bottomImages} onChangFile={onUploadBottomFiles} />
    </BaseModal>
  );
};

CampaignBannersModal.propTypes = {
  onHide: func,
  addBannerToMatchOrRound: func,
  editBannersOfMatchOrRound: func,
  options: array,
  value: array,
  onChange: func,
  typeId: string,
  items_id: string,
  type_apply: string,
  status: string,
  bannerDetail: object
};

export default memo(CampaignBannersModal);
