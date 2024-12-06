import { useState, useEffect, useRef } from "react";

interface TimerReturn {
  milliseconds: number;
  seconds: number;
  minutes: number;
  reset: () => void;
  stop: () => void;
  zero: () => void;
}

function useTimer(condition: boolean = true): TimerReturn {
  const [time, setTime] = useState<number>(0); // Время в миллисекундах
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (condition) {
      startTimeRef.current = Date.now() - time; // Учитываем уже прошедшее время
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current !== null) {
          const elapsed = Date.now() - startTimeRef.current;
          setTime(elapsed);
        }
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [condition]);

  const reset = () => {
    setTime(0);
    startTimeRef.current = null;
  };
  const zero = () => {
    setTime(0);
  };
  const stop = () => {
    startTimeRef.current = null;
  };

  const milliseconds = time % 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor(time / 60000);

  return { milliseconds, seconds, minutes, reset, stop, zero };
}

export default useTimer;
