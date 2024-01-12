'use client'

import { useContext } from "react";
import { SocketContext } from "@/contexts/SocketContext";

const useSocket = () => {
  const { socket } = useContext(SocketContext);

  return { socket }
};

export default useSocket;