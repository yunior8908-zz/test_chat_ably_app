export const AblyIntanceReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ABLY_INTANCE':
      return action.ablyIntance;
    default:
      return state;
  }
};

export const PrivatChatRoomReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_PRIVATE_ROOM':
      return action.room;
    default:
      return state;
  }
};

export const UserListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEMBER_TO_LIST': {
      const list = state.some(member => member.clientId === action.member.clientId)
        ? state.map(member => (member.clientId === action.member.clientId ? action.member : member))
        : [...state, action.member];
      return list;
    }
    case 'DELETE_MEMBER_TO_LIST':
      return state.filter(element => element.clientId !== action.member.clientId);
    default:
      return state;
  }
};

export const UserBadgeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BADGE_TO_USER': {
      return Array.from(new Set([...state, action.clientId]));
    }
    case 'DELETE_BADGE_TO_USER':
      return state.filter(badge => badge !== action.clientId);
    default:
      return state;
  }
};
