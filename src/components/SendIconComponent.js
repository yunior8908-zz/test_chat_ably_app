import React from 'react';
import { InputAdornment, makeStyles, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles({
  sendIcon: {
    cursor: 'pointer'
  }
});

function SendIconComponent({ onClick, text }) {
  const classes = useStyles();

  return (
    <>
      {text ? (
        <InputAdornment className={classes.sendIcon}>
          <IconButton onClick={onClick}>
            <SendIcon fontSize="large" color="primary" />
          </IconButton>
        </InputAdornment>
      ) : null}
    </>
  );
}

export default SendIconComponent;
