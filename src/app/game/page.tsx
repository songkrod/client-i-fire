'use client';

import { useEffect } from 'react';
import useSocket from '@/hooks/useSocket';
import Countdown from './_components/Countdown';
import Hands from './_components/Hands';
import Stacks from './_components/Stacks';

import styles from './page.module.css';
import Players from './_components/Players';

export default function Page() {
  const { socket } = useSocket();
  

  useEffect(() => {
    socket?.emit('game:start');
  }, []);

  return (
    <div className={styles.page}>
      game start
      {/* <Stacks /> */}
      {/* <Players /> */}
      {/* <Hands /> */}
      {/* <Countdown /> */}
    </div>
  )
}