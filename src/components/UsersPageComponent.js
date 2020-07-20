import React, { useEffect, useState } from 'react';
import { FormControl, TextField, Button, makeStyles, Grid } from '@material-ui/core';
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
    setName('');
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.FormControl}>
                <TextField
                  size="medium"
                  variant="standard"
                  label="Name"
                  placeholder="user name"
                  name={name}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth color="primary" variant="contained" onClick={handleClick}>
                register
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}

export default UsersPageComponent;
