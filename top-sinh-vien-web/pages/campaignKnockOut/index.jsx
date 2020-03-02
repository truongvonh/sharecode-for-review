import React from 'react';
import Head from 'components/common/head';
import { string } from 'prop-types';
import { CAMPAIGN_ENDPOINT } from 'constants/endpoints';
import { ALL_NAME_ROUNDS } from 'constants/common';
import './style.scss';
import { Animated } from 'react-animated-css';
import RoundItem from 'pages/campaignKnockOut/RoundItem';
import { useActions } from 'hooks/useActions';
import { closeLoading, openLoading } from 'redux/common/actions';

const campaignKnockOut  = ({ type_id, round_id }) => {

  const [allRound, setAllRoundData] = React.useState([]);
  const [openLoadingAction, closeLoadingAction] = useActions([
    openLoading,
    closeLoading
  ], null);

  const getAllRoundOfType = async () => {
    openLoadingAction();
    try {
      const allRound = await CAMPAIGN_ENDPOINT.GET_ALL_ROUND_OF_TYPE({ type_id });
      if (allRound.length) {
        setAllRoundData(allRound.filter(round => round.name_round !== ALL_NAME_ROUNDS.ROUND_32));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => { closeLoadingAction(); }, 1000);
    }
  };

  React.useEffect(() => {
    setTimeout(async () =>{
      await getAllRoundOfType();
    }, 200);
  }, [type_id]);

  return (
    <>
      <Head title="Chi tiết các cuộc thi trong vòng đấu loại trực tiếp" />
      { allRound.length > 0 && allRound.map((round, index) => (
        <Animated key={index}
                  animationInDelay={300 * index}
                  animationIn="fadeIn"
                  animationInDuration={500}
                  isVisible={true} >
          <RoundItem roundData={round}
                     type_id={type_id} />
        </Animated>
      ))}
    </>
  );
};

campaignKnockOut.getInitialProps = (res) => {
  const { type_id, round_id } = res.query;
  return {
    type_id,
    round_id
  };
};

campaignKnockOut.propTypes = {
  type_id: string,
  round_id: string
};

export default campaignKnockOut;
