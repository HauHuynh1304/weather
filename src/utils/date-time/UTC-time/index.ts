// COVER INTERNATIONAL TIME TO LOCAL TIME
// PRAM {EX: UTC = +25200 in second}
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
  var getDate = getNewDateObjectForCity(timeOffsetInMilliseconds);
  var months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  var year = getDate.getFullYear();
  var month = months[getDate.getMonth()];
  var date = getDate.getDate();
  var time = date + '-' + month + '-' + year;
  return time;
};

export const getLocalTime = (timeOffsetInMilliseconds: number) => {
  // return time as a string
  let getDate = getNewDateObjectForCity(timeOffsetInMilliseconds);
  var hours = getDate.getHours();
  var minutes = getDate.getMinutes();
  var time = hours + ':' + minutes;
  return time;
};

//Param: UNIX_timestamp (Ex: 1630864800)
//Return 6-09-2021
export const dateConverter = (UNIX_timestamp: number) => {
  var getDate = new Date(UNIX_timestamp * 1000);
  var months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  var year = getDate.getFullYear();
  var month = months[getDate.getMonth()];
  var date = getDate.getDate();
  var time = date + '-' + month + '-' + year;
  return time;
};

//Param: UNIX_timestamp (Ex: 1630864800)
//Return 6-09-2021
export const timeConverter = (UNIX_timestamp: number) => {
  var getDate = new Date(UNIX_timestamp * 1000);
  var hours = getDate.getHours();
  var minutes = getDate.getMinutes();
  var time = hours + ':' + minutes;
  return time;
};
