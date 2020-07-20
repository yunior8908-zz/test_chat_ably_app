import React, { useEffect, memo } from 'react';
import { Grid, Typography, Divider, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PrivateChateMessageComponent from './PrivateChateMessageComponent';
import ListNotificatonsComponent from './ListNotificationsComponent';
import { setAblyIntanceAction } from '../redux/actions/ablyAction';

function PanelChatComponent({ handleClose }) {
  const dispatch = useDispatch();
  const ablyIntance = useSelector(state => state.ablyIntance);
  const privateChatRoom = useSelector(state => state.privateChatRoom);

  useEffect(() => {
    let generalChannel;
    if (ablyIntance) {
      generalChannel = ablyIntance?.channels.get('general');
      generalChannel.presence.enterClient(ablyIntance?.auth.clientId);
    }

    return () => {
      if (ablyIntance && generalChannel) {
        generalChannel.presence.leave(ablyIntance?.auth.clientId);
        ablyIntance.close();
        dispatch(setAblyIntanceAction(null));
      }
    };
  }, [ablyIntance, dispatch]);

  return (
    <Grid
      container
      style={{
        height: '100%'
      }}
    >
      <Grid
        item
        xs={12}
        sm={7}
        style={{
          height: '100%'
        }}
      >
        <PrivateChateMessageComponent ablyIntance={ablyIntance} room={privateChatRoom} onClose={handleClose} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        style={{
          backgroundColor: 'white',
          borderLeft: 'solid 1px #ccc'
        }}
      >
        <Box padding={2} alignItems="center" textAlign="center">
          <Typography variant="h6">System messages</Typography>
        </Box>
        <Divider />
        <ListNotificatonsComponent ablyIntance={ablyIntance} channelName="general" />
      </Grid>
    </Grid>
  );
}

export default memo(PanelChatComponent);
