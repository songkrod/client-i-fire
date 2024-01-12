'use client';
import { PlayerReadyStateType, PlayerType } from "@/@types/player.interface";
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

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      connect();
    }

    return () => {
      socket?.emit("user:disconnected");
    }
  }, []);

  const connect = () => {
    const _socket = io('http://localhost:3001');

    setSocket(_socket);
  }

  return <SocketContext.Provider value={{
    socket: socket,
  }}>
    {children}
  </SocketContext.Provider>
}