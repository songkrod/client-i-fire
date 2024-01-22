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
    // const _socket = io('http://localhost:3001');
    const _socket = io('https://i-fire-server-uay0.onrender.com');

    setSocket(_socket);
  }

  return <SocketContext.Provider value={{
    socket: socket,
  }}>
    {children}
  </SocketContext.Provider>
}