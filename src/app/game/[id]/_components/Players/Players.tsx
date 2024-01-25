import useSocket from '@/hooks/useSocket';
import styles from './Players.module.css';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { PlayerPickedType } from '@/@types/game.interface';
import { PlayerType } from '@/@types/player.interface';
import Player from '../Player';

type Props = {
  players: PlayerType[];
  playersPicked: string[];
  playerPickedCard: PlayerPickedType;
  gameId: string
}

const Players = forwardRef<HTMLDivElement, Props>(({ players, playersPicked, playerPickedCard, gameId}, ref) => {
  const { socket } = useSocket();

  const otherPlayers = useMemo<PlayerType[]>(() => {
    return players.filter((player) => player.id !== socket?.id);
  }, [players, socket]);

  return (
    <div className={styles.players} ref={ref}>
      {otherPlayers.map((player) => (
        <Player key={player.id} player={player} playerPicked={playersPicked} playerPickedCard={playerPickedCard} gameId={gameId} />
      ))}
    </div>
  )
})

export default Players;