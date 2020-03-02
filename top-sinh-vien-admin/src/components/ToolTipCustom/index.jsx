import React, { memo } from 'react';
import { element, string } from 'prop-types';
import { 
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';

const ToolTipCustom = ({ children, content, placement = 'top' }) => (
  <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={
        <Tooltip id={`tooltip-${placement}`}>
          {content}
        </Tooltip>
      }
    >
    {children}
  </OverlayTrigger>
);

ToolTipCustom.propTypes = {
  children: element,
  content: string, 
  placement: string

};

export default memo(ToolTipCustom);
