export function strToTime(str) {
  const date = new Date(str);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);


  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
