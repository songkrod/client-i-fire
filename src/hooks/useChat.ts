"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { AnimateMessageType, MessageType } from "@/@types/message.interface";
import useSocket from "./useSocket";

type MessagePayloadType = {
  roomId: string;
  message: string;
};

const useChat = (gameId = "") => {
  const { socket } = useSocket();
  const messageRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);

  const [animateText, setAnimateText] = useState<AnimateMessageType | null>(
    null
  );

  useEffect(() => {
    socket?.on("chat:feed:message", handleReceiveMessage);
    socket?.on("chat:feed:message:animate", handleReceiveAnimateMessage);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const sendMessage = (message: string, animateText = false) => {
    if (message === "") {
      return;
    }

    const messagePayload: MessagePayloadType = {
      roomId: gameId,
      message: message,
    };

    if (animateText) {
      socket?.emit("chat:send:message:animate", JSON.stringify(messagePayload));
    } else {
      socket?.emit("chat:send:message", JSON.stringify(messagePayload));
    }
  };

  const scrollToBottom = () => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReceiveMessage = (payload: string) => {
    const _payload = JSON.parse(payload) as MessageType;
    setChatMessages((prevState) => [...prevState, _payload]);
  };

  const handleReceiveAnimateMessage = (payload: string) => {
    const _payload = JSON.parse(payload) as AnimateMessageType;
    setAnimateText(_payload);
  };

  return {
    messageRef,
    chatMessages,
    sendMessage,
    animateText,
  };
};

export default useChat;
