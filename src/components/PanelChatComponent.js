import React, { useEffect, memo } from 'react';
import { Grid, Typography, Divider, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PrivateChateMessageComponent from './PrivateChateMessageComponent';
import ListNotificatonsComponent from './ListNotificationsComponent';

function PanelChatComponent({ handleClose }) {
  const ablyIntance = useSelector(state => state.ablyIntance);
  const privateChatRoom = useSelector(state => state.privateChatRoom);

  useEffect(() => {
    if (ablyIntance) {
      const generalChannel = ablyIntance?.channels.get('general');
      ablyIntance.connection.on('connected', () => {
        generalChannel.presence.enterClient(ablyIntance?.auth.clientId);
      });
    }
  }, [ablyIntance]);

  return (
    <Grid
      container
      style={{
        height: '100%'
      }}
    >
      <Grid item xs={12} sm={7}>
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
