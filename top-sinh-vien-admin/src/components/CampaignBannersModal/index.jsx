import React, { memo, useEffect, useMemo, useState } from 'react';
import ModalActions from 'components/ModalActions';
import BaseModal from 'components/BaseModal';
import { array, func, object, string } from 'prop-types';
import SelectSearchBox from 'components/SelectSearchBox';
import DropZoneFile from 'components/DropZoneFile';
import {
  ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS,
  ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS,
  EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS
} from 'store/campaign/constant';
import { useSelector, shallowEqual } from 'react-redux';
import { EDIT_BANNERS_OF_MATCH_OR_ROUND_PROGRESS } from '../../store/campaign/constant';
import { checkUpload } from '../../utils/helper';
import { COMMON_ENDPOINT } from '../../api/constant';
import { toast } from 'react-toastify';

const CampaignBannersModal = ({
  typeScreen,
  bannerDetail,
  addBannerToMatchOrRound,
  editBannersOfMatchOrRound,
  type_apply,
  onHide,
  options,
  typeId,
  ...props
}) => {
  const [items, setItemsApply] = useState([]);
  const [link, setLink] = useState({
    topLink: '',
    bottomLink: ''
  });

  const [file, setFile] = useState({
    topFile: [],
    bottomFile: []
  });

  const [loading, setLoading] = useState(false);

  const { topLink, bottomLink } = link;
  const { topFile, bottomFile } = file;
  const addBannerStatus = useSelector(store => store.campaign.status, shallowEqual);

  /* Type Screen */
  const typeScreenOption = [
    {
      label: 'MOBILE',
      value: 'MOBILE'
    },
    {
      label: 'WEBSITE',
      value: 'WEBSITE'
    }
  ];
  const [itemsTypeScreen, setItemsTypeScreen] = useState();
  const onChangeValueTypeScreen = items => setItemsTypeScreen(items);
  /**/

  const isEdit = Object.values(bannerDetail).length;
  const onChangeValue = items => setItemsApply(items);

  const onHideModal = () => {
    onHide();
    setItemsApply([]);
    setItemsTypeScreen('');
    setLink({
      topLink: '',
      bottomLink: ''
    });
    setFile({
      topFile: [],
      bottomFile: []
    });
  };

  useEffect(() => {
    if (
      addBannerStatus === ADD_BANNER_TO_MATCH_OR_ROUND_SUCCESS ||
      addBannerStatus === EDIT_BANNERS_OF_MATCH_OR_ROUND_SUCCESS
    ) {
      toast.success('Cập nhật banner thành công !');
      onHideModal();
    }
  }, [addBannerStatus]);

  useEffect(() => {
    if (isEdit) {
      setItemsTypeScreen({ label: typeScreen, value: typeScreen });
      if (typeScreen === 'MOBILE') {
        if (!bannerDetail.banners || bannerDetail.banners.length === 0) return;
        setLink({
          bottomLink: bannerDetail.banners && bannerDetail.banners[1].link,
          topLink: bannerDetail.banners && bannerDetail.banners[0].link
        });

        setFile({
          topFile:
            bannerDetail.banners &&
            bannerDetail.banners[0].url.length &&
            bannerDetail.banners[0].url.map(item => ({ ...item, preview: item.origin, type: 'topFile' })),

          bottomFile:
            bannerDetail.banners &&
            bannerDetail.banners[1].url.length &&
            bannerDetail.banners[1].url.map(item => ({ ...item, preview: item.origin, type: 'bottomFile' }))
        });
      } else if (typeScreen === 'WEBSITE') {
        if (!bannerDetail.bannersWeb || bannerDetail.bannersWeb.length === 0) return;
        setLink({
          bottomLink: bannerDetail.bannersWeb && bannerDetail.bannersWeb[1].link,
          topLink: bannerDetail.bannersWeb && bannerDetail.bannersWeb[0].link
        });

        setFile({
          topFile:
            bannerDetail.bannersWeb &&
            bannerDetail.bannersWeb[0].url.length &&
            bannerDetail.bannersWeb[0].url.map(item => ({ ...item, preview: item.origin, type: 'topFile' })),

          bottomFile:
            bannerDetail.bannersWeb &&
            bannerDetail.bannersWeb[1].url.length &&
            bannerDetail.bannersWeb[1].url.map(item => ({ ...item, preview: item.origin, type: 'bottomFile' }))
        });
      }
    }
  }, [bannerDetail]);

  const onChangeTextLink = e => {
    const name = e.target.name;
    const value = e && e.target.value;
    setLink(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onChangeFile = (data, position) => {
    setFile({
      ...file,
      [position]: data
    });
  };

  const onRemoveFile = removeFile => {
    switch (removeFile.type) {
      case 'topFile': {
        setFile({ topFile: [], bottomFile });
        break;
      }
      case 'bottomFile': {
        setFile({ topFile, bottomFile: [] });
        break;
      }
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    let topUrl = [];
    let bottomUrl = [];

    try {
      if (topFile.length) {
        topUrl = checkUpload(topFile) ? await COMMON_ENDPOINT.UPLOAD_PHOTOS(topFile, 'CAMPAIGN') : topFile;
      }

      if (bottomFile.length)
        bottomUrl = checkUpload(bottomFile) ? await COMMON_ENDPOINT.UPLOAD_PHOTOS(bottomFile, 'CAMPAIGN') : bottomFile;
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }

    const bannersItem = [
      {
        url: topUrl,
        position: 'TOP',
        link: topLink
      },
      {
        url: bottomUrl,
        position: 'BOTTOM',
        link: bottomLink
      }
    ];

    let banners;

    if (itemsTypeScreen.value === 'MOBILE') {
      banners = { banners: bannersItem };
    } else {
      banners = { bannersWeb: bannersItem };
    }

    const items_apply = items.map(item => item.value);
    if (isEdit)
      editBannersOfMatchOrRound({ ...banners, items_id: bannerDetail._id, typeScreen: itemsTypeScreen.value });
    else
      addBannerToMatchOrRound({
        ...banners,
        items_apply,
        type_id: typeId,
        type_apply,
        typeScreen: itemsTypeScreen.value
      });

    setLoading(false);
  };

  const checkLoadingButton =
    addBannerStatus === ADD_BANNER_TO_MATCH_OR_ROUND_PROGRESS ||
    addBannerStatus === EDIT_BANNERS_OF_MATCH_OR_ROUND_PROGRESS;

  return (
    <BaseModal
      {...props}
      title={`
        ${isEdit ? 'Edit campaign banner' : 'Add campaign banners'}`}
      borderNone={true}
      onHide={onHideModal}
      actions={<ModalActions onOk={onSubmit} isLoading={loading} onHide={onHideModal} disabledOk={!itemsTypeScreen} />}
    >
      {!isEdit && (
        <>
          {type_apply === 'MATCH_BANNER' ? (
            <label className="form-label font-weight-bold"> All match apply </label>
          ) : (
            <label className="form-label font-weight-bold">All round apply </label>
          )}
          <SelectSearchBox
            isMulti
            isAnimatate
            keyLabel="title"
            value={items}
            options={options}
            onChange={onChangeValue}
            closeMenuOnSelect={false}
          />
          <label className="form-label font-weight-bold mt-2">Type Screen</label>
          <SelectSearchBox
            isMulti={false}
            isAnimatate
            keyLabel="typeScreen"
            value={itemsTypeScreen}
            options={typeScreenOption}
            onChange={onChangeValueTypeScreen}
            closeMenuOnSelect={false}
          />
        </>
      )}

      <label className="form-label font-weight-bold my-2">Banner position top</label>

      <DropZoneFile images={topFile} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file, 'topFile')} />
      <label className="form-label font-weight-bold my-2">Link for top banners</label>

      <input className="form-control" name="topLink" value={topLink} onChange={onChangeTextLink} />
      <label className="form-label font-weight-bold my-2">Banner position Bottom</label>
      <DropZoneFile
        images={bottomFile}
        onRemoveFile={onRemoveFile}
        onChangFile={file => onChangeFile(file, 'bottomFile')}
      />
      <label className="form-label font-weight-bold my-2">Link for bottom banners</label>
      <input className="form-control" name="bottomLink" value={bottomLink} onChange={onChangeTextLink} />
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
  bannerDetail: object,
  typeScreen: string
};

export default memo(CampaignBannersModal);
