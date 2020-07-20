import React, { useState } from 'react';
import { makeStyles, FormControl, TextField, Box } from '@material-ui/core';
import SendIconComponent from './SendIconComponent';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function InputSendComponent({ ablyIntance, channelName, event = 'notifications' }) {
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const handleInputChange = ev => {
    setMessage(ev.target.value);
  };

  const handleSend = () => {
    if (message) {
      if (ablyIntance) {
        const channel = ablyIntance.channels.get(channelName);
        channel.publish(event, message, err => {
          if (err) {
            throw new Error(err.message);
          }
        });
        setMessage('');
      }
    }
  };

  const handleEnterPressed = e => {
    if (e.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <Box width="100%">
      <FormControl className={classes.formControl} size="medium">
        <TextField
          variant="outlined"
          size="medium"
          label="write a text to send"
          value={message}
          onChange={handleInputChange}
          placeholder="write a text to send"
          onKeyDown={handleEnterPressed}
          InputProps={{
            endAdornment: <SendIconComponent onClick={handleSend} text={message} />
          }}
        />
      </FormControl>
    </Box>
  );
}

export default InputSendComponent;
