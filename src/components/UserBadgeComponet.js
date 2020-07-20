import React, { useEffect } from 'react';
import { Badge } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { useDispatch, useSelector } from 'react-redux';
import { setUserBadgeAction } from '../redux/actions/ablyAction';
import getCommonRoomName from '../helper/utils';

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

export default UserBadgeComponent;
