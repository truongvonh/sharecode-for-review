import React from 'react';
import { Picker } from 'emoji-mart';
import { func } from 'prop-types';

const PickEmoji = ({ addEmoji, ...props }) => {
  return (
    <div className="emoji-picker position-absolute">
      <Picker  darkMode={false}
               onSelect={addEmoji}
               emojiTooltip
               emojiSize={20}
               autoFocus={true}
               { ...props } />
    </div>
  );
};

PickEmoji.propTypes = {
  addEmoji: func
};

export default React.memo(PickEmoji);
