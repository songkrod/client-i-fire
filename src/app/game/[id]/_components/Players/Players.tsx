import useSocket from '@/hooks/useSocket';
import styles from './Players.module.css';
import { forwardRef, useMemo } from 'react';
import { PlayerPickedType } from '@/@types/game.interface';
import BackCard from '@/components/BackCard';
import Image from 'next/image';
import Card from '@/components/Card';
import { PlayerType } from '@/@types/player.interface';

const PENDING_ICON = '/clock.svg';
const SELECTED_ICON = '/done.svg';

type Props = {
  players: PlayerType[];
  playersPicked: string[];
  playerPickedCard: PlayerPickedType;
}

const Players = forwardRef<HTMLDivElement, Props>(({ players, playersPicked, playerPickedCard}, ref) => {
  const { socket } = useSocket();

  const cardZoomLevel = useMemo<number>(() => {
    return (0.3/702) * window.innerWidth;
  }, []);

  const otherPlayers = useMemo<PlayerType[]>(() => {
    return players.filter((player) => player.id !== socket?.id);
  }, [players, socket]);

  return (
    <div className={styles.players} ref={ref}>
      {otherPlayers.map((player) => (
        <div className={styles.player} key={player.id}>
          <div className={styles.name}>
            <div className={styles.icon}>
              <Image alt='remaining' src={playersPicked.includes(player.id) ? SELECTED_ICON : PENDING_ICON} fill objectFit='contain' />
            </div>
            <span>{player.name}</span>
          </div>
          {playersPicked.includes(player.id) && (
            <div className={styles.card} data-name={`card${player.id}`}>
              {playerPickedCard[player.id] ? (
                  <Card zoom={cardZoomLevel} {...playerPickedCard[player.id]} /> 
              ) : (
                  <BackCard zoom={cardZoomLevel} />
              )}
            </div>
          )}
      </div>
      ))}
    </div>
  )
})

export default Players;