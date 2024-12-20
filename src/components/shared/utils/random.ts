const random = (min: number = 0, max: number = 100) => {
  const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
};
const randomArray = (min: number = 0, max: number = 100, n: number) => {
  let array = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    array.push(random(min, max));
    sum += array[i];
  }
  return { array, sum };
};
export { random, randomArray };
