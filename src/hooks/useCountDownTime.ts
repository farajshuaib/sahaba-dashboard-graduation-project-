import { useState, useEffect } from "react";

const calculateTimeLeft = (date: Date) => {
  let difference = +new Date(date) - +new Date();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const useCountDownTime = (sale_end_at: Date) => {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(sale_end_at))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(sale_end_at)));
    }, 1000);
    return () => clearTimeout(timer);
  });

  return timeLeft;
};

export default useCountDownTime;
