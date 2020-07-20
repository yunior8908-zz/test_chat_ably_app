import { createStore, combineReducers } from 'redux';
import { AblyIntanceReducer, PrivatChatRoomReducer, UserListReducer, UserBadgeReducer } from './reducers/ablyReducers';

const reducers = combineReducers({
  ablyIntance: AblyIntanceReducer,
  privateChatRoom: PrivatChatRoomReducer,
  userList: UserListReducer,
  userBadgeList: UserBadgeReducer
});

const store = createStore(reducers);

export default store;
