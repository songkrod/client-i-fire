'use client';

import { useEffect, useState } from "react";
import useSocket from "./useSocket";
import { PlayerJoinStateType } from "@/@types/game.interface";
import { PlayerType } from "@/@types/player.interface";

const useGame = () => {
  const { socket } = useSocket();

  const joinGame = (id: string) => {
    socket?.emit('game:join', JSON.stringify({ id: id }));
  }

  const leaveGame = (id: string) => {
    socket?.emit('game:leave', JSON.stringify({ id: id }));
  }

  return { joinGame, leaveGame };
}

export default useGame;