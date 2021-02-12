export const getLastSunday = (d: Date) => {
  var t = new Date(d);
  t.setDate(t.getDate() - t.getDay());
  return t;
};

export const getWeekStart = (d: Date) => {
  var first = d.getDate() - d.getDay();
  return new Date(d.setDate(first));
};

export const getWeekEnd = (d: Date) => {
  var first = d.getDate() - d.getDay();
  var last = first + 6;
  return new Date(d.setDate(last));
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
    week.push(new Date(lastSunday));
    lastSunday.setDate(lastSunday.getDate() + 1);
  }
  return week;
};

export const getUTCDate = (d: Date | string) => {
  const u = new Date(d);
  return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
};
