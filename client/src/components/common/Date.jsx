// 오늘 날짜 형식 변환
function dateFormat(date) {
  let formattedDate = date.toISOString();
  return formattedDate.slice(0, 10);
}
let today = dateFormat(new Date());

export default today;
