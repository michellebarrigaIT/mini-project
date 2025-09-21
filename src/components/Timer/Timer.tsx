import { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import "./Timer.scss";

type TimerProps = {
  start?: boolean;
};

function Timer({ start = true }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <MdOutlineTimer /> {formatTime(seconds)}
    </div>
  );
}

export default Timer;
