export const getLastSunday = (d: Date) => {
  const t = new Date(d);
  t.setDate(t.getDate() - t.getDay());
  return t;
};

export const getWeekStart = (d: Date) => {
  const first = d.getDate() - d.getDay();
  return new Date(d.setDate(first));
};

export const getWeekEnd = (d: Date) => {
  const first = d.getDate() - d.getDay();
  const last = first + 6;
  return new Date(d.setDate(last));
};

export const getWeekNumber = (d: Date) => {
  const yearStart = +new Date(d.getFullYear(), 0, 1);
  const day = +new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dayOfYear = (day - yearStart + 1) / 86400000;
  return Math.ceil(dayOfYear / 7).toString();
};

export const getWeekByDate = (d: Date) => {
  const lastSunday = getLastSunday(d);
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
