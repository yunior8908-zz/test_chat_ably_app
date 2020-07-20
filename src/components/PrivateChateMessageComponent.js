import React, { memo, useState, useEffect, useRef, useCallback, forwardRef } from 'react';
import {
  Card,
  CardHeader,
  styled,
  IconButton,
  makeStyles,
  Divider,
  CardContent,
  List,
  ListItem,
  CardActions,
  Box,
  Typography,
  RootRef
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import clsx from 'clsx';
import moment from 'moment';
import InputSendComponent from './InputSendComponent';
import getCommonRoomName from '../helper/utils';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    height: '100%'
  },
  listRoot: {
    flex: 1,
    overflowY: 'auto'
  },
  titleText: {
    fontWeight: 700,
    fontSize: 24,
    color: '#666',
    textTransform: 'uppercase',
    clear: 'both'
  },
  listItemRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '1px solid #ccc',
    borderRadius: 4,
    width: '50%',
    backgroundColor: '#ccc',
    marginBottom: 10,
    '& span': {
      marginTop: 5,
      marginLeft: 'auto'
    }
  },
  selfMessage: {
    marginRight: 'auto'
  },
  notSelfMessage: {
    marginLeft: 'auto',
    backgroundColor: '#666',
    color: '#ccc'
  }
});

const CloseButtonIcon = styled(IconButton)({
  clear: 'both',
  float: 'right',
  padding: 0
});

function PrivateListMessages({ channel, me }, contentRef) {
  const [historyMessages, setHistoryMessages] = useState([]);
  const classes = useStyles();

  const scrollToBottom = useCallback(() => {
    if (contentRef.current) {
      const { scrollHeight } = contentRef.current;
      const height = contentRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      contentRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [contentRef]);

  useEffect(() => {
    scrollToBottom();
  }, [historyMessages, scrollToBottom]);

  useEffect(() => {
    if (channel) {
      channel.attach();
      // channel.once('attached', () => {
      channel.history((_, page) => {
        const sortedMesages = page.items.sort((a, b) => a.timestamp - b.timestamp);
        setHistoryMessages(sortedMesages);
        channel.subscribe('chat', message => {
          setHistoryMessages(prevList => [...prevList, message]);
        });
      });
      // });
    }
  }, [channel]);

  return (
    <List>
      {historyMessages.map(message => {
        const date = moment(message.timestamp);
        return (
          <ListItem
            className={clsx(
              classes.listItemRoot,
              me === message.clientId ? classes.selfMessage : classes.notSelfMessage
            )}
            key={message.id}
          >
            <Typography>{message.data}</Typography>
            <span>
              {moment().format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
                ? date.format('hh:mm A')
                : date.format('YYYY-MM-DD hh:mm A')}
            </span>
          </ListItem>
        );
      })}
    </List>
  );
}

const PrivateListMessagesComponent = forwardRef(PrivateListMessages);

function PrivateChateMessageComponent({ onClose, ablyIntance, room }) {
  const channelName = getCommonRoomName(ablyIntance?.auth.clientId, room?.clientId);
  const channel = ablyIntance?.channels?.get(channelName) || null;
  const classes = useStyles();
  const contentRef = useRef();

  return (
    <>
      {room && (
        <Card className={classes.root} component={Box} marginRight={1}>
          <CardHeader
            title={
              <>
                <Typography component="label" className={classes.titleText}>
                  {room.clientId}
                </Typography>
                <CloseButtonIcon onClick={onClose}>
                  <Close />
                </CloseButtonIcon>
              </>
            }
          />
          <Divider />
          <RootRef rootRef={contentRef}>
            <CardContent className={classes.listRoot}>
              <PrivateListMessagesComponent ref={contentRef} channel={channel} me={ablyIntance.auth.clientId} />
            </CardContent>
          </RootRef>
          <CardActions>
            <InputSendComponent ablyIntance={ablyIntance} channelName={channelName} event="chat" />
          </CardActions>
        </Card>
      )}
    </>
  );
}

export default memo(PrivateChateMessageComponent);
