export const timeString = (time: number) => {
  const day = Math.trunc(time / 86400000);
  time -= day * 86400000;
  const hour = Math.trunc(time / 3600000);
  time -= hour * 3600000;
  const min = Math.trunc(time / 60000);
  time -= min * 60000;
  const sec = Math.trunc(time / 1000);
  time -= sec * 1000;

  return `${day}:${hour < 10 ? "0" : ""}${hour}:${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec}`;
};