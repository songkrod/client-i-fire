import useSocket from '@/hooks/useSocket';
import styles from './Players.module.css';
import { useEffect, useMemo, useState } from 'react';
import { PlayerPickedType } from '@/@types/game.interface';
import BackCard from '@/components/BackCard';
import Image from 'next/image';
import Card from '@/components/Card';

const PENDING_ICON = '/clock.svg';
const SELECTED_ICON = '/done.svg';

const Players = () => {
  const { otherPlayers, socket } = useSocket();
  const [playerPicked, setPlayerPicked] = useState<string[]>([]);
  const [pickedDetail, setPickedDetail] = useState<PlayerPickedType>({});

  useEffect(() => {
    socket?.on('game:player:picked', (message) => {
      const playerAlreadyPicked = JSON.parse(message) as string[];

      setPlayerPicked(playerAlreadyPicked);
    })

    socket?.on('game:player:pick:result', (message) => {
      const pickedCardDetail = JSON.parse(message) as PlayerPickedType;

      setPickedDetail(pickedCardDetail);
    })
  }, []);

  const cardZoomLevel = useMemo<number>(() => {
    return (0.3/702) * window.innerWidth;
  }, []);

  return (
    <div className={styles.players}>
      {otherPlayers.map((player) => (
        <div className={`${styles.player} ${pickedDetail[player.id] ? styles.show : ''}`}>
          <div className={styles.card}>
            {pickedDetail[player.id] ? (
                <Card zoom={cardZoomLevel} {...pickedDetail[player.id]} /> 
            ) : (
                <BackCard zoom={cardZoomLevel} />
            )}
          </div>
        <div className={styles.name}>
          <div className={styles.icon}>
            <Image alt='remaining' src={playerPicked.includes(player.id) ? SELECTED_ICON : PENDING_ICON} fill objectFit='contain' />
          </div>
          {player.name}
        </div>
      </div>
      ))}
    </div>
  )
}

export default Players;