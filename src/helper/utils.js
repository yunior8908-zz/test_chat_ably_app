const getCommonRoomName = (...arrayNames) =>
  arrayNames.sort((a, b) => (a === b ? 0 : (a < b && -1) || (a > b && 1))).join('-');

export default getCommonRoomName;
