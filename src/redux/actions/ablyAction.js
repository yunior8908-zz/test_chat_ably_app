export const setAblyIntanceAction = ablyIntance => ({
  type: 'SET_ABLY_INTANCE',
  ablyIntance
});

export const setPrivateRoomAction = room => ({
  type: 'SET_PRIVATE_ROOM',
  room
});

export const setMemberAction = member => ({
  type: 'SET_MEMBER_TO_LIST',
  member
});

export const deleteMemberAction = member => ({
  type: 'DELETE_MEMBER_TO_LIST',
  member
});

export const setUserBadgeAction = clientId => {
  return {
    type: 'SET_BADGE_TO_USER',
    clientId
  };
};

export const deleteUserBadgeAction = clientId => ({
  type: 'DELETE_BADGE_TO_USER',
  clientId
});
