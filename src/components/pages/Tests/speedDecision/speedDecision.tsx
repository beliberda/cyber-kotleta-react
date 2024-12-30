import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { random } from "@/components/shared/utils/random";
import UserStore from "@/components/store/UserStore";
// Функция для генерации случайного уравнения
const generateEquation = (): string => {
  const a = random(1, 20);
  const b = a - random(1, a - 1);
  const operation = Math.random() < 0.5 ? "+" : "-"; // случайное сложение или умножение
  let equation = "";

  if (operation === "+") {
    equation = `${a} + x = ${a + b}`;
  } else {
    equation = `${a} - x = ${a - b}`;
  }

  return equation;
};

const SpeedDecision: React.FC = () => {
  const [equation, setEquation] = useState<string>("");
  const [timer, setTimer] = useState<number>(10);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [xValue, setXValue] = useState<number | null>(null);

  // Функция для вычисления x из уравнения
  const calculateX = (equation: string): number => {
    const parts = equation.split(" ");
    const a = parseInt(parts[0]);
    const b = parseInt(parts[4]);
    const operation = parts[1];
    if (operation === "+") {
      return b - a;
    }
    if (operation === "-") {
      return a - b;
    }
    return NaN;
  };

  // Функция для проверки правильности ответа
  const checkAnswer = (isEven: boolean) => {
    if (xValue === null) {
      stopTest();
      return;
    }
    const isXEven = xValue % 2 === 0;
    setRound((prev) => prev + 1);
    if (isEven && isXEven) {
      setIsCorrect(true);
      generateNewRound();
      return;
    }
    if (!isEven && !isXEven) {
      setIsCorrect(true);
      generateNewRound();
      return;
    }

    setIsCorrect(false);
    setTimeout(() => {
      stopTest();
    }, 4000);
    setIsTestActive(false);
  };

  // Функция для старта теста
  const startTest = () => {
    UserStore.setIsOpenSidebar(false);
    setIsTestActive(true);
    setRound(1);
    setTimer(10);
    setIsCorrect(null);
    generateNewRound();
  };

  // Функция для остановки теста
  const stopTest = () => {
    setIsTestActive(false);
    setIsCorrect(null);
    UserStore.addRatingTest(round, 1);
  };

  // Генерация нового раунда
  const generateNewRound = () => {
    const newEquation = generateEquation();

    setEquation(newEquation);
    setXValue(calculateX(newEquation));
    setIsCorrect(null);
    setTimer(Math.max(10 - Math.floor(0.1 * 5 * round), 1));
  };

  // Таймер для раундов
  useEffect(() => {
    if (!isTestActive || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);
    if (round === 10) {
      stopTest();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTestActive, timer, round]);

  // Обработчик нажатий клавиш
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTestActive) return;

      if (event.key === "ArrowLeft") {
        checkAnswer(true); // Нажатие стрелки влево - четный
        return;
      }
      if (event.key === "ArrowRight") {
        checkAnswer(false); // Нажатие стрелки вправо - нечетный
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTestActive, xValue]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Скорость принятия решений</h1>

      <div className={styles.buttons}>
        <button
          onClick={startTest}
          disabled={isTestActive}
          className={styles.button}
        >
          Старт
        </button>
        <button
          onClick={stopTest}
          disabled={!isTestActive}
          className={styles.button}
        >
          Стоп
        </button>
      </div>

      {isTestActive && (
        <div>
          <p className={styles.round}>Раунд {round}</p>
          <p className={styles.timer}>Осталось времени: {timer} секунд</p>
          <div className={styles.equation}>{equation}</div>
        </div>
      )}

      {isTestActive && (
        <div className={styles.arrowButtons}>
          <button
            onClick={() => checkAnswer(true)}
            className={styles.arrowButton}
          >
            ⬅️ Четный
          </button>
          <button
            onClick={() => checkAnswer(false)}
            className={styles.arrowButton}
          >
            ➡️ Нечетный
          </button>
        </div>
      )}

      {isCorrect !== null && (
        <div className={styles.result}>
          <p>{isCorrect ? "Correct" : "Wrong"}</p>
        </div>
      )}

      {!isTestActive && (
        <div className={styles.finalResult}>
          <p>Тест завершен.Правильных ответов: {round}</p>
        </div>
      )}
    </div>
  );
};

export default SpeedDecision;
