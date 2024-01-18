'use client';
import { PlayerReadyStateType, PlayerType } from "@/@types/player.interface";
import { useParams } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client';

type SocketContextValues = {
  socket: Socket | null;
}

const defaultValus: SocketContextValues = {
  socket: null,
}

export const SocketContext = createContext(defaultValus);
SocketContext.displayName = 'SocketContext';

let inited = false;

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (!socket && !inited) {
      inited = true;
      connect();
    }

    return () => {
      if (params.id) {
        const payload = JSON.stringify({id: params.id});
        socket?.emit('lobby:leave', payload);
        socket?.emit('game:leave', payload);
      }
  
      socket?.emit("user:disconnected");
    }
  }, []);

  const connect = () => {
    const _socket = io('https://a475-49-229-126-173.ngrok-free.app');

    setSocket(_socket);
  }

  return <SocketContext.Provider value={{
    socket: socket,
  }}>
    {children}
  </SocketContext.Provider>
}