'use client';
import useSocket from '@/hooks/useSocket';

import styles from './Stacks.module.css';
import { useEffect, useMemo, useState } from 'react';
import { StacksType } from '@/@types/game.interface';
import Card from '@/components/Card';

const Stacks = () => {
  const { socket } = useSocket();
  const [stacks, setStacks] = useState<StacksType>({
    stack1: [],
    stack2: [],
    stack3: [],
    stack4: [],
  });

  useEffect(() => {
    socket?.emit('game:stacks:get');
  
    socket?.on('game:stacks', (message: string) => {
      const _stacks = JSON.parse(message) as StacksType;
      
      setStacks(_stacks);
    })
  }, []);

  const zoomLevel = useMemo<number>(() => {
    return 0.0048 * (window.innerHeight * 0.15);
  }, []);

  return (
    <div className={styles.stacks}>
      <div className={styles.stack}>
        <div className={styles.slot}>{stacks.stack1[0] && <Card zoom={zoomLevel} {...stacks.stack1[0]} />}</div>
        <div className={styles.slot}>{stacks.stack1[1] && <Card zoom={zoomLevel}  {...stacks.stack1[1]} />}</div>
        <div className={styles.slot}>{stacks.stack1[2] && <Card zoom={zoomLevel}  {...stacks.stack1[2]} />}</div>
        <div className={styles.slot}>{stacks.stack1[3] && <Card zoom={zoomLevel}  {...stacks.stack1[3]} />}</div>
        <div className={`${styles.slot} ${styles.redLine}`}>{stacks.stack1[4] && <Card zoom={zoomLevel}  {...stacks.stack1[4]} />}</div>
      </div>
      <div className={styles.stack}>
        <div className={styles.slot}>{stacks.stack2[0] && <Card zoom={zoomLevel}  {...stacks.stack2[0]} />}</div>
        <div className={styles.slot}>{stacks.stack2[1] && <Card zoom={zoomLevel}  {...stacks.stack2[1]} />}</div>
        <div className={styles.slot}>{stacks.stack2[2] && <Card zoom={zoomLevel}  {...stacks.stack2[2]} />}</div>
        <div className={styles.slot}>{stacks.stack2[3] && <Card zoom={zoomLevel}  {...stacks.stack2[3]} />}</div>
        <div className={`${styles.slot} ${styles.redLine}`}>{stacks.stack2[4] && <Card zoom={zoomLevel}  {...stacks.stack1[4]} />}</div>
      </div>
      <div className={styles.stack}>
        <div className={styles.slot}>{stacks.stack3[0] && <Card zoom={zoomLevel}  {...stacks.stack3[0]} />}</div>
        <div className={styles.slot}>{stacks.stack3[1] && <Card zoom={zoomLevel}  {...stacks.stack3[1]} />}</div>
        <div className={styles.slot}>{stacks.stack3[2] && <Card zoom={zoomLevel}  {...stacks.stack3[2]} />}</div>
        <div className={styles.slot}>{stacks.stack3[3] && <Card zoom={zoomLevel}  {...stacks.stack3[3]} />}</div>
        <div className={`${styles.slot} ${styles.redLine}`}>{stacks.stack3[4] && <Card zoom={zoomLevel}  {...stacks.stack1[4]} />}</div>
      </div>
      <div className={styles.stack}>
        <div className={styles.slot}>{stacks.stack4[0] && <Card zoom={zoomLevel}  {...stacks.stack4[0]} />}</div>
        <div className={styles.slot}>{stacks.stack4[1] && <Card zoom={zoomLevel}  {...stacks.stack4[1]} />}</div>
        <div className={styles.slot}>{stacks.stack4[2] && <Card zoom={zoomLevel}  {...stacks.stack4[2]} />}</div>
        <div className={styles.slot}>{stacks.stack4[3] && <Card zoom={zoomLevel}  {...stacks.stack4[3]} />}</div>
        <div className={`${styles.slot} ${styles.redLine}`}>{stacks.stack4[4] && <Card zoom={zoomLevel}  {...stacks.stack1[4]} />}</div>
      </div>
    </div>
  )
}

export default Stacks;