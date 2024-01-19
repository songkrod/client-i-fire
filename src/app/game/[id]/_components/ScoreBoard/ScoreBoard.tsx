'use client';

import { PlayerScoreType } from '@/@types/game.interface';
import styles from './ScoreBoard.module.css';
import { forwardRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useLobby from '@/hooks/useLobby';
import useSocket from '@/hooks/useSocket';
import { IdType } from '@/@types/lobby.interface';
import toast from 'react-hot-toast';

type Props = {
  gameId: string;
  playerScores: PlayerScoreType[];
}

const ScoreBoard = forwardRef<HTMLDivElement, Props>(({ gameId, playerScores }, ref) => {
  const navigator = useRouter();
  const { socket } = useSocket();
  const { createLobby, joinLobby } = useLobby();

  const sorted = useMemo<PlayerScoreType[]>(() => {
    return playerScores.sort((a, b) => {
      if (a.score < b.score) return -1;
      if (a.score > b.score) return 1;
      return 0;
    })
  }, [playerScores]);

  const isOwner = useMemo<boolean>(() => {
    const owner = playerScores.find((player) => player.owner);

    if (!owner) return false;

    return socket?.id === owner.id;
  }, [playerScores]);

  useEffect(() => {
    if (socket) {
      socket.on('lobby:created', handleLobbyCreated);
      socket.on('lobby:join:success', handleLobbyJoined);
      socket.on('lobby:join:failed', handleLobbyJoinedError);
    }

    return () => {
      socket?.off('lobby:created', handleLobbyCreated);
      socket?.off('lobby:join:success', handleLobbyJoined);
      socket?.off('lobby:join:failed', handleLobbyJoinedError);
    }
  }, [socket]);

  const handleLobbyJoined = (payload: string) => {
    const { id } = JSON.parse(payload) as IdType;

    navigator.push(`/lobby/${id}`);
  }

  const handleLobbyJoinedError = () => {
    toast.error("ห้องเต็ม / ไม่เจอห้อง");
    navigator.push('/');
  }

  const handleFinish = () => {
    navigator.replace('/');
  }

  const handleCreateLobby = () => {
    createLobby(gameId);
  }

  const handleLobbyCreated = (payload: string) => {
    const { id } = JSON.parse(payload) as IdType;
    
    joinLobby(id);
  }

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
          {isOwner && (
            <button className={styles.startButton} onClick={handleCreateLobby}>
              เล่นอีกรอบ
            </button>
          )}
        </div>
      </div>
    </div>
  )
})

export default ScoreBoard;