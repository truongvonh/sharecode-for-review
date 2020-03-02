import React, { memo } from 'react';
import { array, func } from 'prop-types';
import { Table } from 'react-bootstrap';
import { rendeTableHeader } from '../../../../utils/renderUltil';
import { formatAMPM } from '../../../../utils/helper';
import ButtonWithToolTip from '../../../../components/ButtonWithToolTip';

const headerField = ['No.', 'Vòng đấu', 'TG bắt đầu', 'TG kết thúc', 'Trạng thái', 'Thao tác'];
const typeScreen = {
  MOBILE: 'MOBILE',
  WEBSITE: 'WEBSITE'
};

const AllRounds = ({ allRounds, onEditRound, onGetRoundBanner }) => {
  const renderTeamsTableBody = teams => {
    const result = teams.length
      ? teams.map((item, index) => {
          const startTime = new Date(item.startTime);
          const endTime = new Date(item.endTime);
          const renderStartTime = item.startTime && startTime.toLocaleDateString() + ' ' + ' ' + formatAMPM(startTime);
          const renderEndTime = item.endTime && endTime.toLocaleDateString() + ' ' + ' ' + formatAMPM(endTime);
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.title}</td>
              <td>{renderStartTime}</td>
              <td>{renderEndTime}</td>
              <td>{item.status}</td>
              <td className="d-flex">
                <ButtonWithToolTip
                  onClick={() => onEditRound(item)}
                  content={'Edit this round'}
                  classes="mr-2 p-2"
                  icons="icon-edit"
                />
                <ButtonWithToolTip
                  onClick={() => onGetRoundBanner(item, typeScreen.MOBILE)}
                  variant="success"
                  classes="flex-shrink-0 p-2"
                  content="Edit this banners of round for mobile"
                  icons="icon-image"
                />
                <ButtonWithToolTip
                  onClick={() => onGetRoundBanner(item, typeScreen.WEBSITE)}
                  variant="info"
                  classes="flex-shrink-0 p-2"
                  content="Edit this banners of round for website"
                  icons="icon-image"
                />
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
        {renderTeamsTableBody(allRounds)}
      </Table>
    </>
  );
};

AllRounds.propTypes = {
  allRounds: array,
  onGoToNextRound: func,
  onGetRoundBanner: func,
  onEditRound: func
};

export default memo(AllRounds);
