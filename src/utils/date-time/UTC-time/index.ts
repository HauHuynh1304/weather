const getNewDateObjectForCity = (timeOffsetInMilliseconds: number) => {
  // return new Date(new Date().getTime() - number / 60).toTimeString();
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  return new Date(utc + (3600000 * timeOffsetInMilliseconds) / 3600);
};

export const getLocalDate = (timeOffsetInMilliseconds: number) => {
  // return date as a string
  return getNewDateObjectForCity(timeOffsetInMilliseconds).toLocaleDateString();
};

export const getLocalTime = (timeOffsetInMilliseconds: number) => {
  // return time as a string
  return getNewDateObjectForCity(timeOffsetInMilliseconds).toLocaleTimeString();
};

export const getLocalDateTime = (timeOffsetInMilliseconds: number) => {
  // return date time as a string
  return getNewDateObjectForCity(timeOffsetInMilliseconds).toTimeString();
};
