const random = (min: number = 0, max: number = 100) => {
  const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
};
export { random };
