import React from 'react';
import { string } from 'prop-types';

import useModal from 'hooks/useModal';

import './style.scss';
import Linkify from 'react-linkify';

const ReadMoreText = ({ text, limit = 100 }) => {
  const [isReadMore, toggleReadMore] = useModal(false);
  if (text.length > limit) {
    return (
      <div className="wrapper-read-more">
        <Linkify target="_blank">
          <span>{text.slice(0, limit)}</span>
        </Linkify>
        {!isReadMore && <span>...</span>}
        {isReadMore && <Linkify target="_blank">{text.slice(limit, text.length)} </Linkify>}
        {!isReadMore && (
          <span className="show-more-button ml-2" onClick={toggleReadMore}>
            Read More
          </span>
        )}
      </div>
    );
  } else
    return (
      <>
        <Linkify target="_blank">{text}</Linkify>
      </>
    );
};

ReadMoreText.propTypes = {
  text: string
};

export default React.memo(ReadMoreText);
