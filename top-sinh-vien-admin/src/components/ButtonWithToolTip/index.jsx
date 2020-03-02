import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import ToolTipCustom from './../ToolTipCustom';
import { func, string, bool } from 'prop-types';

const ButtonWithToolTip = ({
  classes = 'rounded-circle p-2 ml-2 d-flex justify-content-center align-items-center m-0',
  content,
  onClick,
  variant = 'primary',
  icons,
  disabled = false,
  ...props
}) => (
  <ToolTipCustom content={content}>
    <Button variant={variant} onClick={onClick} className={classes} disabled={disabled} {...props}>
      <i className={`feather mr-0 ${icons}`} />
    </Button>
  </ToolTipCustom>
);

ButtonWithToolTip.propTypes = {
  classes: string,
  content: string,
  onClick: func,
  variant: string,
  icons: string,
  disabled: bool
};

export default memo(ButtonWithToolTip);
