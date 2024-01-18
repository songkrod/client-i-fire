'use client';

import { forwardRef, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import useSocket from '@/hooks/useSocket';
import { CardType, StacksType } from '@/@types/game.interface';
import Card from '@/components/Card';

import styles from './Stacks.module.css';

type Props = {
  stacks: StacksType;
  buyMode?: boolean;
}

const Stacks = forwardRef<HTMLDivElement, Props>(({ stacks: _stacks, buyMode = false }, ref) => {
  const { socket } = useSocket();
  const params = useParams<{ id: string }>();

  const zoomLevel = useMemo<number>(() => {
    return 0.0048 * (window.innerHeight * 0.15);
  }, []);

  const getSum = (stack: CardType[]): number => {
    return stack.reduce((previous, current) => {
      return previous + current.score;
    }, 0);
  }

  const handleBuyStack = (stackNo: number) => {
    socket?.emit('game:player:buy:stack', JSON.stringify({ id: params.id, stack: stackNo }));
  }

  return (
    <div className={styles.stackWrapper} ref={ref}>
      <div className={styles.stacks}>
        <div className={styles.stack} data-name='stack1'>
          {buyMode && (
            <div className={styles.buyButton}>
              <button onClick={() => handleBuyStack(1)}>ซื้อ &gt;&gt;<br />( {getSum(_stacks.stack1)} แต้ม )</button>
            </div>
          )}
          <div data-name='slot1' className={styles.slot}>{_stacks.stack1[0] && <Card zoom={zoomLevel} {..._stacks.stack1[0]} />}</div>
          <div data-name='slot2' className={styles.slot}>{_stacks.stack1[1] && <Card zoom={zoomLevel}  {..._stacks.stack1[1]} />}</div>
          <div data-name='slot3' className={styles.slot}>{_stacks.stack1[2] && <Card zoom={zoomLevel}  {..._stacks.stack1[2]} />}</div>
          <div data-name='slot4' className={styles.slot}>{_stacks.stack1[3] && <Card zoom={zoomLevel}  {..._stacks.stack1[3]} />}</div>
          <div data-name='slot5' className={`${styles.slot} ${styles.redLine}`}>{_stacks.stack1[4] && <Card zoom={zoomLevel}  {..._stacks.stack1[4]} />}</div>
        </div>
        <div className={styles.stack} data-name='stack2'>
          {buyMode && (
            <div className={styles.buyButton}>
              <button onClick={() => handleBuyStack(2)}>ซื้อ &gt;&gt;<br />( {getSum(_stacks.stack2)} แต้ม )</button>
            </div>
          )}
          <div data-name='slot1' className={styles.slot}>{_stacks.stack2[0] && <Card zoom={zoomLevel}  {..._stacks.stack2[0]} />}</div>
          <div data-name='slot2' className={styles.slot}>{_stacks.stack2[1] && <Card zoom={zoomLevel}  {..._stacks.stack2[1]} />}</div>
          <div data-name='slot3' className={styles.slot}>{_stacks.stack2[2] && <Card zoom={zoomLevel}  {..._stacks.stack2[2]} />}</div>
          <div data-name='slot4' className={styles.slot}>{_stacks.stack2[3] && <Card zoom={zoomLevel}  {..._stacks.stack2[3]} />}</div>
          <div data-name='slot5' className={`${styles.slot} ${styles.redLine}`}>{_stacks.stack2[4] && <Card zoom={zoomLevel}  {..._stacks.stack2[4]} />}</div>
        </div>
        <div className={styles.stack} data-name='stack3'>
          {buyMode && (
            <div className={styles.buyButton}>
              <button onClick={() => handleBuyStack(3)}>ซื้อ &gt;&gt;<br />( {getSum(_stacks.stack3)} แต้ม )</button>
            </div>
          )}
          <div data-name='slot1' className={styles.slot}>{_stacks.stack3[0] && <Card zoom={zoomLevel}  {..._stacks.stack3[0]} />}</div>
          <div data-name='slot2' className={styles.slot}>{_stacks.stack3[1] && <Card zoom={zoomLevel}  {..._stacks.stack3[1]} />}</div>
          <div data-name='slot3' className={styles.slot}>{_stacks.stack3[2] && <Card zoom={zoomLevel}  {..._stacks.stack3[2]} />}</div>
          <div data-name='slot4' className={styles.slot}>{_stacks.stack3[3] && <Card zoom={zoomLevel}  {..._stacks.stack3[3]} />}</div>
          <div data-name='slot5' className={`${styles.slot} ${styles.redLine}`}>{_stacks.stack3[4] && <Card zoom={zoomLevel}  {..._stacks.stack3[4]} />}</div>
        </div>
        <div className={styles.stack} data-name='stack4'>
          {buyMode && (
            <div className={styles.buyButton}>
              <button onClick={() => handleBuyStack(4)}>ซื้อ &gt;&gt;<br />( {getSum(_stacks.stack4)} แต้ม )</button>
            </div>
          )}
          <div data-name='slot1' className={styles.slot}>{_stacks.stack4[0] && <Card zoom={zoomLevel}  {..._stacks.stack4[0]} />}</div>
          <div data-name='slot2' className={styles.slot}>{_stacks.stack4[1] && <Card zoom={zoomLevel}  {..._stacks.stack4[1]} />}</div>
          <div data-name='slot3' className={styles.slot}>{_stacks.stack4[2] && <Card zoom={zoomLevel}  {..._stacks.stack4[2]} />}</div>
          <div data-name='slot4' className={styles.slot}>{_stacks.stack4[3] && <Card zoom={zoomLevel}  {..._stacks.stack4[3]} />}</div>
          <div data-name='slot5' className={`${styles.slot} ${styles.redLine}`}>{_stacks.stack4[4] && <Card zoom={zoomLevel}  {..._stacks.stack4[4]} />}</div>
        </div>
      </div>
    </div>
  )
})

export default Stacks;