import { useEffect, useRef } from "react";

function useIntervalCallback(
  callback: () => void,
  intervalSeconds: number,
  isActive: boolean = true
) {
  const savedCallback = useRef<() => void>();

  // Сохраняем текущий callback в ref
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive || intervalSeconds <= 0) return;

    const intervalId = setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, intervalSeconds * 1000);

    // Очищаем таймер при отключении
    return () => clearInterval(intervalId);
  }, [intervalSeconds, isActive]);
}

export default useIntervalCallback;
