import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Seoul");

export const getDateStr = (date: Date = new Date()): string => {
  return dayjs(date).format("M월 D일");
};

export const getISODateStr = (date: Date = new Date()): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getYesterday = (): Date => {
  return dayjs().subtract(1, "day").toDate();
};

export const isWeekend = (date: Date = new Date()): boolean => {
  const day = dayjs(date).day();
  return day === 0 || day === 6;
};

export const getLastWorkday = (): Date => {
  let date = dayjs();
  do {
    date = date.subtract(1, "day");
  } while (isWeekend(date.toDate()));
  return date.toDate();
};
