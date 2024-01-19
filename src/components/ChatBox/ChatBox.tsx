import useChat from "@/hooks/useChat";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import QuickReply from "../QuickReply";
import Image from "next/image";

import styles from "./ChatBox.module.css";
import useSocket from "@/hooks/useSocket";

type ChatBoxPropsType = {
  gameId: string;
};

const ChatBox = ({ gameId }: ChatBoxPropsType) => {
  const { chatMessages, sendMessage } = useChat(gameId);
  const [inputMessage, setInputMessage] = useState<string>("");

  const [showQuickReply, setShowQuickReply] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setInputMessage(value);
  };

  const handleSendMessage = () => {
    if (inputMessage) {
      sendMessage(inputMessage);
      setInputMessage("");
      scrollToBottom();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") handleSendMessage();
  };

  const handleClickPlus = () => {
    setShowQuickReply((prevState) => !prevState);
  };

  const onChangQuickReply = (message: string) => {
    sendMessage(message);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.ChatBoxWarper}>
      <div className={styles.chatBox}>
        <div className={styles.chat}>
          <ul>
            <li>Welcome to ChatBox</li>
            {chatMessages?.map((message, i) => (
              <li key={i}>
                {message.name}: {message.message}
              </li>
            ))}
            <div ref={messagesEndRef} style={{ height:'20px' }}/>
          </ul>
        </div>
        {showQuickReply && (
          <div className={styles.quickReply}>
            <QuickReply onSelect={onChangQuickReply} />
          </div>
        )}
      </div>
      <div className={styles.inputBlock}>
        <input
          onChange={handleChange}
          value={inputMessage}
          type="text"
          onKeyDown={handleKeyDown}
        ></input>
        <Image
          src="/chat/chat.svg"
          alt="plus-image"
          width={24}
          height={24}
          onClick={handleClickPlus}
        />
      </div>
    </div>
  );
};

export default ChatBox;
