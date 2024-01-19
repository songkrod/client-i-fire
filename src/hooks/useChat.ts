"use client";

import { RefObject, useEffect, useState } from "react";
import { MessageType } from "@/@types/message.interface";
import useSocket from "./useSocket";

type MessagePayloadType = {
  roomId: string;
  message: string;
};

const useChat = (ref: RefObject<HTMLDivElement>,gameId = "") => {
  // const { socket } = useContext(SocketContext);
  const { socket } = useSocket();
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    socket?.on("chat:feed:message", handleReceiveMessage);
    return () => {
      socket?.off("chat:feed:message");
    }
  }, []);

  useEffect(()=>{
    scrollToBottom()
  },[chatMessages])

  const sendMessage = (message: string) => {
    if (message === "") {
      return;
    }

    const messagePayload: MessagePayloadType = {
      roomId: gameId,
      message: message,
    };
    socket?.emit("chat:send:message", JSON.stringify(messagePayload));
  };

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReceiveMessage = (payload: string) => {
    const _payload = JSON.parse(payload) as MessageType
    setChatMessages((prevState) => [...prevState, _payload]);
  };

  return {
    chatMessages,
    sendMessage,
  };
};

export default useChat;
