'use client';

import { PlayerScoreType } from '@/@types/game.interface';
import styles from './ScoreBoard.module.css';
import { forwardRef, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  playerScores: PlayerScoreType[];
}

const ScoreBoard = forwardRef<HTMLDivElement, Props>(({ playerScores }, ref) => {
  const navigator = useRouter();
  const handleFinish = () => {
    navigator.replace('/');
  }

  const sorted = useMemo<PlayerScoreType[]>(() => {
    return playerScores.sort((a, b) => {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0;
    })
  }, [playerScores]);

  return (
    <div className={styles.page}>
      <div className={styles.panel} ref={ref}>
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.name}>ชื่อผู้เล่น Top ควาย</div>
            <div className={styles.status}>คะแนน</div>
          </div>
          {sorted.map((playerScore, index) => (
            <div key={playerScore.id} className={styles.player}>
              <div className={styles.name}>{playerScore.name}
              {index === 0 && (
                <div className={styles.icon}>
                  <Image alt='leader' src='/crown.svg' fill objectFit='contain' />
                </div>
              )}
              {index === sorted.length - 1 && (
                <div className={styles.icon}>
                  <Image alt='leader' src='/fire.svg' fill objectFit='contain' />
                </div>
              )}
              </div>
              <div className={`${styles.status} ${styles.unready}`}>
                {playerScore.score}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.button}>
          <button onClick={handleFinish}>
            ออก
          </button>
        </div>
      </div>
    </div>
  )
})

export default ScoreBoard;