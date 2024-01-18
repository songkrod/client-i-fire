"use client";

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/contexts/SocketContext";
import { MessageType } from "@/@types/message.interface";

const useChat = () => {
  const { socket } = useContext(SocketContext);
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);

  const sendMessage = (message: string) => {
    if (message === "") {
      return;
    }

    socket?.emit("chat:message", { message });

    setChatMessages((prevState: MessageType[]) => [
      ...prevState,
      <MessageType>{ sender: "me", message },
    ]);
  };

  useEffect(() => {
    if (socket) {
      socket.on("chat:message", handleReceiveMessage);
    }
  }, [socket]);

  const handleReceiveMessage = (payload: MessageType) => {
    setChatMessages((prevState) => [...prevState, payload]);
  }

  return {
    chatMessages,
    sendMessage,
  };
};

export default useChat;
