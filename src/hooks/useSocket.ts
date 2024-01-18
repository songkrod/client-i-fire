'use client'

import { useContext } from "react";
import { SocketContext } from "@/contexts/SocketContext";

const useSocket = () => {
  const { socket } = useContext(SocketContext);

  const updateUserName = (name: string) => {
    socket?.emit('user:update', JSON.stringify({ name }));
  }

  return { socket, updateUserName }
};

export default useSocket;