import { useState, useEffect, useRef } from "react";

interface UseCountdownTimer {
  timeLeft: number; // Оставшееся время в миллисекундах
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

function useCountdownTimer(
  durationMs: number,
  onComplete: () => void
): UseCountdownTimer {
  const [timeLeft, setTimeLeft] = useState<number>(durationMs);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number | null>(null);

  // Функция для запуска таймера
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      endTimeRef.current = Date.now() + timeLeft;

      timerRef.current = setInterval(() => {
        const remaining = (endTimeRef.current ?? Date.now()) - Date.now();
        if (remaining <= 0) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          setIsRunning(false);
          setTimeLeft(0);
          onComplete(); // Вызываем функцию по завершению
        } else {
          setTimeLeft(remaining);
        }
      }, 100);
    }
  };

  // Функция для паузы таймера
  const pause = () => {
    if (isRunning) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      setIsRunning(false);
      endTimeRef.current = null;
    }
  };

  // Функция для сброса таймера
  const reset = () => {
    clearInterval(timerRef.current as NodeJS.Timeout);
    setTimeLeft(durationMs);
    setIsRunning(false);
    endTimeRef.current = null;
  };

  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, []);

  return { timeLeft, isRunning, start, pause, reset };
}

export default useCountdownTimer;
