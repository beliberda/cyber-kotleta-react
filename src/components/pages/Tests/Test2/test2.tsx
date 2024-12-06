import { useEffect, useState } from "react";
import s from "./style.module.css";

import ArrowIcon from "@/assets/icons/ArrowIcon";
import arrowLeft from "@assets/icons/arrow-left.svg";
import arrowRight from "@assets/icons/arrow-right.svg";

import { random } from "@/components/shared/utils/random";
import {
  ButtonDefault,
  ButtonIcon,
} from "@/components/shared/UI/Buttons.tsx/buttons";

const randomColors = [
  "red",
  "green",
  "yellow",
  "blue",
  "purple",
  "black",
  "orange",
  "gray",
] as const;
const degrees = [0, 90, 180, -180, -90];
function Test2() {
  const [level, setLevel] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [testData, setTestData] = useState({ color: "black", degrees: 0 });

  const changeLevel = (direction: number) => {
    if (level + direction < 0 || level + direction > 10) return;
    setLevel(level + direction);
  };

  useEffect(() => {
    const testInterval = setInterval(() => {
      setTestData({
        color: randomColors[random(0, randomColors.length)],
        degrees: degrees[random(0, degrees.length)],
      });
    }, 1000 - level * 50);

    if (!isStart) {
      clearInterval(testInterval);
    }
    return () => {
      clearInterval(testInterval);
    };
  }, [isStart, level]);

  return (
    <>
      <main className={s.main + " container"}>
        <h1 style={{ textAlign: "center" }}>Тест на многозадачность</h1>
        <div className={s["test-block"]}>
          <ArrowIcon degrees={testData.degrees} />
          <div
            className={s["color-block"]}
            style={{ background: testData.color }}
          ></div>
        </div>

        <ButtonDefault
          handlClick={() => {
            setIsStart(!isStart);
          }}
        >
          {isStart ? "Stop test" : "Start test"}
        </ButtonDefault>
        <div className={s.level}>
          <ButtonIcon
            handlClick={() => {
              changeLevel(-1);
            }}
            icon={arrowLeft}
          />
          {level}
          <ButtonIcon
            handlClick={() => {
              changeLevel(1);
            }}
            icon={arrowRight}
          />
        </div>
      </main>
    </>
  );
}

export default Test2;
