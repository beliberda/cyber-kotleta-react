import { ICircleItem } from "@/components/pages/Tests/Test4/interfaces";
import { random } from "@/components/shared/utils/random";

const infoMass = [
  {
    color: "red",
    title: "Вниз",
    degrees: 180,
  },
  {
    color: "green",
    title: "Влево",
    degrees: -90,
  },
  {
    color: "blue",
    title: "Вправо",
    degrees: 90,
  },
] as const;

function detectCollision(sq1: ICircleItem, sq2: ICircleItem) {
  // вычисляем границы квадратов
  const sq1_left = sq1.x;
  const sq1_right = sq1.x + sq1.radius;
  const sq1_top = sq1.y;
  const sq1_bottom = sq1.y + sq1.radius;

  const sq2_left = sq2.x;
  const sq2_right = sq2.x + sq2.radius;
  const sq2_top = sq2.y;
  const sq2_bottom = sq2.y + sq2.radius;

  // проверяем, пересекаются ли границы квадратов по осям X и Y
  const x_collide = sq1_right >= sq2_left && sq1_left <= sq2_right;
  const y_collide = sq1_bottom >= sq2_top && sq1_top <= sq2_bottom;

  // если пересекаются, проверяем наличие пересечения сторон
  if (x_collide && y_collide) {
    const top_collision = sq1_bottom >= sq2_top && sq1_top <= sq2_top;
    const bottom_collision = sq1_top <= sq2_bottom && sq1_bottom >= sq2_bottom;
    const left_collision = sq1_right >= sq2_left && sq1_left <= sq2_left;
    const right_collision = sq1_left <= sq2_right && sq1_right >= sq2_right;
    return (
      top_collision || bottom_collision || left_collision || right_collision
    );
  }

  return false;
}
function checkCoordinates(
  circle: ICircleItem[],
  width: number,
  height: number,
  radiusNew: number
) {
  let x1: number = random(20, width);
  let y1: number = random(20, height);
  let counter = 0;

  while (
    circle.find((item) =>
      detectCollision(item, {
        x: x1,
        y: y1,
        radius: radiusNew,
        color: "red",
      })
    )
  ) {
    x1 = random(20, width);
    y1 = random(20, height);
    counter++;
    if (counter % 100 === 0) {
      radiusNew = random(20, radiusNew - 10);
      console.log("Уменьшаем радиус до", radiusNew);
    }
    // if (counter > 10000) {
    //   console.log(x1, y1);

    //   return { x1, y1, radiusNew };
    // }
  }
  return { x1, y1, radiusNew };
}
function randomCircle(n: number, width: number = 200, height: number = 200) {
  console.log("Random Circle ");

  const circles: ICircleItem[] = [];
  let correctCircle = new Object();
  width -= 40;
  height -= 80;

  for (let i = 0; i < n; i++) {
    const radius = random(40, 120);
    const { x1, y1, radiusNew } = checkCoordinates(
      circles,
      width,
      height,
      radius
    );
    let newColor = infoMass[random(0, infoMass.length - 1)].color;
    // TODO сделать инкрементацию цветов с проверкой и возвращать с самым большим количеством
    // if (correctCircle.hasOwnProperty(newColor)) {
    //   correctCircle[newColor] += 1;
    // } else {
    //   correctCircle[newColor] = 1;
    // }
    // console.log(correctCircle);

    circles.push({
      x: x1,
      y: y1,
      radius: radiusNew,
      color: newColor,
    });
  }

  return circles;
}
export { checkCoordinates, randomCircle, infoMass };
