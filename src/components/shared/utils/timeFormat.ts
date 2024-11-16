function timeFormat(ms: number): string {
  let sec = Math.floor(ms / 1000) + 1;
  let min = Math.floor(sec / 60);
  if (sec > 0 && min === 0) {
    return `${sec}:${sec * 1000 - ms} seconds`;
  }
  if (min > 0) {
    return `${min}:${min * 60 - sec}:${
      min * 60 - sec - (sec * 1000 - ms)
    } minutes`;
  } else return `${min}:${min * 60 - sec} seconds`;
}

export default timeFormat;
