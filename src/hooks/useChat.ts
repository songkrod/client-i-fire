"use client";

import { RefObject, useEffect, useState } from "react";
import { AnimateMessageType, MessageType } from "@/@types/message.interface";
import useSocket from "./useSocket";

type MessagePayloadType = {
  roomId: string;
  message: string;
};

const insultWordsList: string[] = [
  "เดี๋ยวเสี่ยซื้อเอง 💳",
  "เหมา!!! 😘",
  "ไอหนู พี่ลงก่อน",
  "เสี่ยหำเหมารอบนี้",
  "ผมอะ 💯% คราบน้องๆ",
  "💯% หรอจ๋ะน้อง",
  "ว้ายยยยย 🤪 ต๋ายแย้ววววว",
  "อย่าลงการ์ดแบบนี้เวลางาน",
  "น้ำขิงไหมคะ 😊",
  "อย่าคิดนาน",
  "อย่าคิดเยอะดิ",
  "เดียวเราต้องคุยกัน",
  "แทรกกู 😡",
  "กูรอดโว้ย 🤪",
];

const useChat = (ref: RefObject<HTMLDivElement> | null, gameId = "") => {
  const { socket } = useSocket();
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
      console.log('emit if',messagePayload)
      socket?.emit("chat:send:message:animate", JSON.stringify(messagePayload));
    } else {
      console.log('emit else',messagePayload)
      socket?.emit("chat:send:message", JSON.stringify(messagePayload));
    }
  };

  const scrollToBottom = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReceiveMessage = (payload: string) => {
    const _payload = JSON.parse(payload) as MessageType;
    setChatMessages((prevState) => [...prevState, _payload]);
  };

  const handleReceiveAnimateMessage = (payload: string) => {
    const _payload = JSON.parse(payload) as AnimateMessageType;
    console.log('return handleReceiveAnimateMessage',_payload)
    setAnimateText(_payload);
  };

  return {
    chatMessages,
    sendMessage,
    animateText,
    insultWordsList
  };
};

export default useChat;
