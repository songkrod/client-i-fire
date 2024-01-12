"use client";

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/contexts/SocketContext";

const useChat = () => {
  const { socket } = useContext(SocketContext);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const sendMessage = (message: string) => {
    if (message === "") {
      return;
    }

    socket?.emit("chat:message", { message });
  };

  useEffect(() => {
    if (socket) {
      socket.on("chat:message", (payload: string) => {
        setChatMessages((prevState) => [...prevState, payload]);
      });
    }
  }, [socket]);

  return {
    chatMessages,
    sendMessage,
  };
};

export default useChat;
