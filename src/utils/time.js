export function strToTime(str) {
  const date = new Date(str);


  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);


  const formattedDate = `${hours}:${minutes}`;
  return formattedDate;
}
