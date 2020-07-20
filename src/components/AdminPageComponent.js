import React, { useEffect } from 'react';
import { Realtime } from 'ably';
import { makeStyles, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ABLY_API_KEY from '../config';

import ListNotificatonsComponent from './ListNotificationsComponent';
import InputSendComponent from './InputSendComponent';
import { setAblyIntanceAction } from '../redux/actions/ablyAction';

const ably = new Realtime({ key: ABLY_API_KEY, clientId: 'admin' });
const channelName = 'general';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '99vh',
    opacity: 1
  }
});

function AdminPageComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(setAblyIntanceAction(ably));
  }, [dispatch]);

  useEffect(() => {
    ably.connection.on('connected', () => {
      const generalChannel = ably.channels.get(channelName);
      generalChannel.presence.enterClient(ably.clientId);
    });

    return () => {
      ably.close();
    };
  }, []);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <ListNotificatonsComponent ablyIntance={ably} channelName={channelName} />
      <InputSendComponent ablyIntance={ably} channelName={channelName} />
    </Container>
  );
}

export default AdminPageComponent;
