'use client';

import { useEffect, useMemo, useState } from "react";
import useSocket from "@/hooks/useSocket";

import styles from './Countdown.module.css';

const Countdown = () => {
  const { socket } = useSocket();
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    socket?.on('game:start:countdown', (counter) => {
      setCountdown(counter);

      if (counter === '0') {
        setTimeout(() => {
          setGameStart(true);
        }, 1000);
      }
    })
  }, []);

  const countdownText = useMemo<string>(() => {
    if (countdown === '0') return 'GO!';
    
    return countdown;
  }, [countdown]);

  return (
    gameStart === false ? (
      <div className={styles.countdown}>
        <div className={styles.counter}>{countdownText}</div>
      </div>
    ) : null
  )
}

export default Countdown;