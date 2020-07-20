import React, { useEffect } from 'react';
import { Grid, useTheme, useMediaQuery } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPrivateRoomAction,
  deleteMemberAction,
  setMemberAction,
  deleteUserBadgeAction
} from '../redux/actions/ablyAction';
import UserListLargeComponent from './UserListLargeComponent';

function SwitchListUserResponsive({ userList, handleClick }) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!match && (
        <Grid item xs={3}>
          <UserListLargeComponent userList={userList} handleClick={handleClick} />
        </Grid>
      )}
    </>
  );
}

function ListUserOnlineComponent() {
  const ablyIntance = useSelector(state => state.ablyIntance);
  const clientID = ablyIntance?.auth.clientId;
  const userList = useSelector(state => state.userList.filter(member => member.clientId !== clientID));
  const dispatch = useDispatch();

  useEffect(() => {
    const generalChannel = ablyIntance?.channels.get('general');
    if (generalChannel) {
      generalChannel.presence.get((err, members) => {
        if (err) {
          throw new Error('Error on get Users online');
        }
        members.forEach(element => {
          if (clientID !== element.clientId) {
            dispatch(setMemberAction(element));
          }
        });
      });

      generalChannel.presence.subscribe(member => {
        if (member.action === 'leave') {
          dispatch(deleteMemberAction(member));
        } else if (clientID !== member.clientId) {
          dispatch(setMemberAction(member));
        }
      });
    }
  }, [ablyIntance, clientID, dispatch]);

  const handleClick = user => {
    dispatch(setPrivateRoomAction(user));
    dispatch(deleteUserBadgeAction(user.clientId));
  };

  return <SwitchListUserResponsive userList={userList} handleClick={handleClick} />;
}

export default ListUserOnlineComponent;
