import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import BaseModal from 'components/BaseModal';
import ModalActions from 'components/ModalActions';
import DropZoneFile from 'components/DropZoneFile';
import { checkUpload } from 'utils/helper';
import { COMMON_ENDPOINT } from 'api/constant';
import { func, object, string } from 'prop-types';

const ActionTypeModal = ({ typeScreen, onHide, campaignTypeItem, addAvatarRuleRewardForCampaignType, ...props }) => {
  const isEdit = campaignTypeItem && Object.values(campaignTypeItem).length;
  const [formValue, setFormValue] = useState({
    name: '',
    avatar: [],
    rule: [],
    reward: [],
    cover: []
  });
  const [loading, setLoading] = useState(false);
  const [delete_photos, setDeletePhotos] = useState({
    delete_photos_avatar: false,
    delete_photos_rule: false,
    delete_photos_reward: false,
    delete_photos_cover: false
  });

  const { name, avatar, rule, reward, cover } = formValue;
  const formField = [
    {
      value: name,
      name: 'name',
      label: 'Tên cuộc thi'
    }
  ];

  const onClearForm = cb => {
    cb();
  };

  const onChangeForm = e => {
    const { name } = e.target;
    setFormValue({
      ...formValue,
      [name]: e.target.value
    });
  };

  const onChangeFile = (file, name) => {
    setFormValue({
      ...formValue,
      [name]: file
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      let avatarUpload = avatar,
        ruleUpload = rule,
        rewardUpload = reward,
        coverUpload = cover;

      if (avatar.length) {
        if (checkUpload(avatar)) avatarUpload = await COMMON_ENDPOINT.UPLOAD_PHOTOS(avatar, 'CAMPAIGN');
        else if (delete_photos.delete_photos_avatar) avatarUpload = [];
        else {
          delete avatarUpload[0].preview;
          delete avatarUpload[0].type;
        }
      }

      if (rule.length) {
        if (checkUpload(rule)) ruleUpload = await COMMON_ENDPOINT.UPLOAD_PHOTOS(rule, 'CAMPAIGN');
        else if (delete_photos.delete_photos_rule) ruleUpload = [];
        else {
          delete ruleUpload[0].preview;
          delete ruleUpload[0].type;
        }
      }
      if (reward.length) {
        if (checkUpload(reward)) rewardUpload = await COMMON_ENDPOINT.UPLOAD_PHOTOS(reward, 'CAMPAIGN');
        else if (delete_photos.delete_photos_reward) rewardUpload = [];
        else {
          delete rewardUpload[0].preview;
          delete rewardUpload[0].type;
        }
      }
      if (cover.length) {
        if (checkUpload(cover)) coverUpload = await COMMON_ENDPOINT.UPLOAD_PHOTOS(cover, 'CAMPAIGN');
        else if (delete_photos.delete_photos_cover) coverUpload = [];
        else {
          delete coverUpload[0].preview;
          delete coverUpload[0].type;
        }
      }

      let payload = {
        name
      };
      if (typeScreen === 'mobile') {
        payload = {
          ...payload,
          avatar: avatarUpload,
          rule: ruleUpload,
          reward: rewardUpload,
          cover: coverUpload
        };
      } else {
        payload = {
          ...payload,
          avatarWeb: avatarUpload,
          ruleWeb: ruleUpload,
          rewardWeb: rewardUpload,
          coverWeb: coverUpload
        };
      }

      addAvatarRuleRewardForCampaignType({
        ...payload,
        type_id: campaignTypeItem._id
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setLoading(false);
  };

  const onRemoveFile = removeFile => {
    switch (removeFile.type) {
      case 'avatar': {
        setDeletePhotos({ ...delete_photos, delete_photos_avatar: true });
        break;
      }
      case 'rule': {
        setDeletePhotos({ ...delete_photos, delete_photos_rule: true });
        break;
      }
      case 'reward': {
        setDeletePhotos({ ...delete_photos, delete_photos_reward: true });
        break;
      }
      case 'cover': {
        setDeletePhotos({ ...delete_photos, delete_photos_cover: true });
        break;
      }
    }
  };

  useEffect(() => {
    if (campaignTypeItem) {
      if (typeScreen === 'mobile') {
        setFormValue({
          ...formValue,
          name: campaignTypeItem.name,
          avatar:
            campaignTypeItem.avatar && campaignTypeItem.avatar.length
              ? campaignTypeItem.avatar.map(item => ({ ...item, preview: item.origin, type: 'avatar' }))
              : [],
          rule:
            campaignTypeItem.rule && campaignTypeItem.rule.length
              ? campaignTypeItem.rule.map(item => ({ ...item, preview: item.origin, type: 'rule' }))
              : [],
          reward:
            campaignTypeItem.reward && campaignTypeItem.reward.length
              ? campaignTypeItem.reward.map(item => ({ ...item, preview: item.origin, type: 'reward' }))
              : [],
          cover:
            campaignTypeItem.cover && campaignTypeItem.cover.length
              ? campaignTypeItem.cover.map(item => ({ ...item, preview: item.origin, type: 'cover' }))
              : []
        });
      } else {
        setFormValue({
          ...formValue,
          name: campaignTypeItem.name,
          avatar:
            campaignTypeItem.avatarWeb && campaignTypeItem.avatarWeb.length
              ? campaignTypeItem.avatarWeb.map(item => ({ ...item, preview: item.origin, type: 'avatar' }))
              : [],
          rule:
            campaignTypeItem.ruleWeb && campaignTypeItem.ruleWeb.length
              ? campaignTypeItem.ruleWeb.map(item => ({ ...item, preview: item.origin, type: 'rule' }))
              : [],
          reward:
            campaignTypeItem.rewardWeb && campaignTypeItem.rewardWeb.length
              ? campaignTypeItem.rewardWeb.map(item => ({ ...item, preview: item.origin, type: 'reward' }))
              : [],
          cover:
            campaignTypeItem.coverWeb && campaignTypeItem.coverWeb.length
              ? campaignTypeItem.coverWeb.map(item => ({ ...item, preview: item.origin, type: 'cover' }))
              : []
        });
      }
    }
  }, [campaignTypeItem, typeScreen]);

  const renderForm = () => {
    return (
      <Form>
        {formField.map(item => (
          <>
            <Form.Label>{item.label}</Form.Label>
            <Form.Control type="text" value={item.value} name={item.name} className="mb-4" onChange={onChangeForm} />
          </>
        ))}
        <Form.Label>Avatar</Form.Label>
        <DropZoneFile images={avatar} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file, 'avatar')} />
        <Form.Label>Thể lệ</Form.Label>
        <DropZoneFile images={rule} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file, 'rule')} />
        <Form.Label>Giải thưởng</Form.Label>
        <DropZoneFile images={reward} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file, 'reward')} />
        <Form.Label>Cover</Form.Label>
        <DropZoneFile images={cover} onRemoveFile={onRemoveFile} onChangFile={file => onChangeFile(file, 'cover')} />
      </Form>
    );
  };

  return (
    <BaseModal
      onHide={onHide}
      title={`${isEdit ? 'Cập nhật thể loại cuộc thi' : 'Thêm mới thể loại cuộc thi'}`}
      borderNone
      {...props}
      actions={
        <ModalActions onHide={() => onClearForm(onHide)} isLoading={loading} disabledOk={!name} onOk={onSubmit} />
      }
    >
      {renderForm()}
    </BaseModal>
  );
};

ActionTypeModal.propTypes = {
  onHide: func,
  campaignTypeItem: object,
  campaignTypeItemStatus: string,
  typeScreen: string,
  addAvatarRuleRewardForCampaignType: func
};

export default React.memo(ActionTypeModal);
