import React from 'react';
import useModal from 'hooks/useModal';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { getNestedObjectSafe } from 'utils/helper';
import { ALL_NAME_ROUNDS } from 'constants/common';

const useHandlerRound = (type_id) => {
  const [detailType, setDetailType] = React.useState({});
  const [displayImage, setDisplayImage] = React.useState('');
  const [isShowImage, toggleImage, closeImage] = useModal(false);
  const [round32, setRound32] = React.useState({});

  const getDetailType = async () => {
    try {
      const allType = await CAMPAIGN_ENDPOINT.LIST_CAMPAIGN({ status: '' });
      const detailType = allType.find(type => type._id === type_id);
      setDetailType(detailType);
    } catch (e) {
      console.log(e);
    }
  };

  const getRound32Detail = async () => {
    try {
      const allRound = await CAMPAIGN_ENDPOINT.GET_ALL_ROUND_OF_TYPE({ type_id });
      setRound32(allRound.find(round => round.name_round === ALL_NAME_ROUNDS.ROUND_32));
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    setTimeout(async () => {
      await Promise.all([
        getRound32Detail(),
        getDetailType()
      ]);
    }, 100);

  }, [type_id]);

  const toggleWithSelectImage = (typeImage) => {
    setDisplayImage(getNestedObjectSafe(detailType, [typeImage, 0, 'origin']));
    toggleImage();
  };

  return {
    displayImage,
    isShowImage,
    closeImage,
    detailType,
    round32,

    toggleImage,
    toggleWithSelectImage
  };
};

export default useHandlerRound;
