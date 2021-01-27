export const getLastSunday = (d: Date) => {
  var t = new Date(d);
  t.setDate(t.getDate() - t.getDay());
  return t;
};

export const getWeekNumber = (d: Date) => {
  var yearStart = +new Date(d.getFullYear(), 0, 1);
  var day = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var dayOfYear = (day - yearStart + 1) / 86400000;
  return Math.ceil(dayOfYear / 7).toString();
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
