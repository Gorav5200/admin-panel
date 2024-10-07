import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";

const useTimer = ({ initialTime = 0, countDown = false } = {}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const start = () => {
    if (!isRunning ) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) =>
          countDown ? Math.max(prevTime - 1, 0) : prevTime + 1
        );
      }, 1000);
    }
  };

  const stop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTime(initialTime);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return dayjs().startOf("day").second(seconds).format("ss [sec]");
    } else if (seconds < 3600) {
      return dayjs().startOf("day").second(seconds).format("mm [min]:ss");
    } else {
      return dayjs().startOf("day").second(seconds).format("HH:mm:ss");
    }
  };

  const formattedTime = formatTime(time);

  return { time: formattedTime, isRunning, start, stop, reset, seconds: time };
};

export default useTimer;
