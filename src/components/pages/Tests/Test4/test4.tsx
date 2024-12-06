import { FunctionComponent, useEffect, useRef, useState } from "react";
import s from "./style.module.css";
import {
  ButtonDefault,
  ButtonIcon,
} from "@/components/shared/UI/Buttons.tsx/buttons";
import { random } from "@/components/shared/utils/random";

import { infoMass, randomCircle } from "@/components/pages/Tests/utils";
import ArrowIcon from "@/assets/icons/ArrowIcon";
interface Test4Props {}

const Test4: FunctionComponent<Test4Props> = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isStandByShow, setIsStandByShow] = useState<boolean>(false);
  const [level, setLevel] = useState(1);
  const [difficult, setDifficult] = useState(1);
  const handleStart = () => {
    setIsStart(!isStart);
  };

  const test_wrapper_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const testTimer = setTimeout(() => {
      setIsStart(false);
    }, 10000);

    const standByTimeout = setTimeout(() => {
      setIsStandByShow(true);
      setTimeout(() => {
        setIsStandByShow(false);
      }, 1000);
    }, random(2000, 5000));

    if (!isStart) {
      clearTimeout(testTimer);
      clearTimeout(standByTimeout);
    }

    return () => {
      clearTimeout(testTimer);
      clearTimeout(standByTimeout);
    };
  }, [isStart]);

  return (
    <>
      <main className={s.main}>
        <h1 style={{ textAlign: "center" }}>
          Работа под высокой когнитивной нагрузкой
        </h1>
        <div ref={test_wrapper_ref} className={s["test-container"]}>
          {isStart ? (
            <div className={s["test-wrapper"]}>
              {infoMass.map((item) => {
                return (
                  <div key={item.title} className={s["test-row"]}>
                    {randomCircle(
                      random(difficult + 2, difficult + 3),
                      test_wrapper_ref.current?.offsetWidth,
                      140
                    ).map((circle, i) => {
                      return (
                        <div
                          className={s.circle}
                          style={{
                            background: circle.color,
                            position: "absolute",
                            top: circle.y,
                            left: circle.x,
                            width: circle.radius,
                            height: circle.radius,
                          }}
                          key={i}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={s.info}>
              {infoMass.map((item, index) => (
                <div key={index} className={s.row}>
                  <div
                    className={s.circle}
                    style={{ backgroundColor: item.color }}
                  ></div>
                  {item.title}
                </div>
              ))}
            </div>
          )}
          {isStart && isStandByShow && (
            <div className={s["stand-by"]}>
              <p>STAND BY</p>
            </div>
          )}
        </div>
        <div className={s["arrow-wrapper"]}>
          <ButtonIcon styles={{ padding: 3, width: 60, height: 80 }}>
            <ArrowIcon degrees={-90} />
          </ButtonIcon>
          <ButtonIcon styles={{ padding: 3, width: 60, height: 80 }}>
            <ArrowIcon />
          </ButtonIcon>
          <ButtonIcon styles={{ padding: 3, width: 60, height: 80 }}>
            <ArrowIcon degrees={90} />
          </ButtonIcon>
        </div>
        <ButtonDefault handlClick={handleStart}>
          {isStart ? "Stop" : "Start"}
        </ButtonDefault>
      </main>
    </>
  );
};

export default Test4;
