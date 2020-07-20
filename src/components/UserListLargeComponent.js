import React, { useEffect } from 'react';
import {
  ListItemAvatar,
  ListItemText,
  Badge,
  makeStyles,
  Paper,
  List,
  ListItem,
  IconButton,
  Divider
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import MailIcon from '@material-ui/icons/Mail';
import { Close } from '@material-ui/icons';
import getCommonRoomName from '../helper/utils';
import { setUserBadgeAction } from '../redux/actions/ablyAction';

const useStyles = makeStyles({
  itemList: {
    cursor: 'pointer'
  },
  headerDrawer: {
    display: 'flex',
    textAlign: 'start',
    '& > span': {
      padding: 20,
      alignSelf: 'center',
      flex: 1
    }
  }
});

function UserBadgeComponent({ user, userList }) {
  const dispatch = useDispatch();
  const ablyIntance = useSelector(state => state.ablyIntance);
  const userBadgeList = useSelector(state => state.userBadgeList);

  useEffect(() => {
    if (ablyIntance) {
      userList.forEach(element => {
        const chName = getCommonRoomName(ablyIntance?.auth.clientId, element.clientId);
        const channel = ablyIntance?.channels.get(chName);
        channel.attach();
        channel.once('attached', () => {
          channel.subscribe('chat', msg => {
            dispatch(setUserBadgeAction(msg.clientId));
          });
        });
      });
    }
  }, [ablyIntance, userList, dispatch]);

  return (
    <>
      {userBadgeList.some(badge => badge === user.clientId) ? (
        <Badge color="error" variant="dot">
          <MailIcon />
        </Badge>
      ) : null}
    </>
  );
}

function UserListLargeComponent({ userList, handleClick, closeButton = false, handleClose }) {
  const classes = useStyles();

  return (
    <Paper
      variant="outlined"
      square
      style={{
        height: '100%'
      }}
    >
      <div className={classes.headerDrawer}>
        <span>Users</span>
        {closeButton && (
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        )}
      </div>
      <Divider />
      <List>
        {userList.map(user => (
          <ListItem
            divider
            key={user.connectionId}
            component="span"
            onClick={() => handleClick(user)}
            className={classes.itemList}
          >
            <ListItemAvatar>
              <AccountCircleIcon />
            </ListItemAvatar>
            <ListItemText primary={user.clientId} />
            <ListItemText primary={<UserBadgeComponent userList={userList} user={user} />} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default UserListLargeComponent;
