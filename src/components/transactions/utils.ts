export const getLastSunday = (d: Date) => {
  var t = new Date(d);
  t.setDate(t.getDate() - t.getDay());
  return t;
};

export const getWeekByDate = (d: Date) => {
  var lastSunday = getLastSunday(d);
  const week = [];
  for (let i = 0; i < 7; i++) {
    var weekDay = new Date();
    weekDay.setDate(lastSunday.getDate() + i);
    week.push(weekDay);
  }
  return week;
};
