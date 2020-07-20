import { makeStyles, Drawer, IconButton } from '@material-ui/core';
import React from 'react';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPrivateRoomAction, deleteUserBadgeAction } from '../redux/actions/ablyAction';
import UserListLargeComponent from './UserListLargeComponent';

const useStyles = makeStyles({
  menuRoot: {
    right: 0,
    top: 0,
    border: '1px solid #ccc',
    borderRadius: 4
  },
  drawer: {
    width: 240
  },
  drawerPaper: {
    width: 300
  }
});

function IconMenuComponent({ clientID }) {
  const source = useSelector(state => state.userList.filter(member => member.clientId !== clientID));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const onClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = user => {
    handleClose();
    dispatch(setPrivateRoomAction(user));
    dispatch(deleteUserBadgeAction(user.clientId));
  };

  const onClickUser = el => {
    handleClose();
    handleClick(el);
  };

  return (
    <>
      {source.length ? (
        <IconButton size="small" color="inherit" className={classes.menuRoot} onClick={onClick}>
          <MenuIcon />
        </IconButton>
      ) : null}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <UserListLargeComponent userList={source} handleClick={onClickUser} closeButton handleClose={handleClose} />
      </Drawer>
    </>
  );
}

export default IconMenuComponent;
