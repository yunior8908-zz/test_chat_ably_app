import React, { useEffect, useState } from 'react';
import { FormControl, TextField, Button, makeStyles } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Realtime } from 'ably';
import PanelChatComponent from './PanelChatComponent';
import ABLY_API_KEY from '../config';
import { setPrivateRoomAction, setAblyIntanceAction } from '../redux/actions/ablyAction';

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: '25% auto',
    border: 'solid 1px #ccc',
    padding: 40
  },
  FormControl: {
    width: '100%'
  }
});

function UsersPageComponent() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { search, pathname } = useLocation();
  const history = useHistory();
  const urlParams = new URLSearchParams(search);
  const classes = useStyles();

  const handleClose = () => {
    dispatch(setPrivateRoomAction(null));
  };

  useEffect(() => {
    if (urlParams.get('name') && !name) {
      setName(urlParams.get('name'));
      const ably = new Realtime({ key: ABLY_API_KEY, clientId: urlParams.get('name') });
      dispatch(setAblyIntanceAction(ably));
    }
  }, [name, search, urlParams, dispatch]);

  const handleChange = ev => {
    setName(ev.target.value);
  };

  const handleClick = () => {
    urlParams.set('name', name);
    history.push({
      pathname,
      search: urlParams.toString()
    });
  };

  return (
    <>
      {urlParams.get('name') ? (
        <PanelChatComponent handleClose={handleClose} />
      ) : (
        <div className={classes.root}>
          <FormControl className={classes.FormControl}>
            <TextField
              size="medium"
              variant="standard"
              label="Name"
              placeholder="user name"
              name={name}
              onChange={handleChange}
            />
            <Button color="primary" variant="contained" onClick={handleClick}>
              register
            </Button>
          </FormControl>
        </div>
      )}
    </>
  );
}

export default UsersPageComponent;
