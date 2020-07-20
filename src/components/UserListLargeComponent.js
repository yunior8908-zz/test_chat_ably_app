import React from 'react';
import {
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  List,
  ListItem,
  IconButton,
  Divider
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Close } from '@material-ui/icons';
import UserBadgeComponent from './UserBadgeComponet';

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
