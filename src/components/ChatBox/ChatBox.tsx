import useChat from "@/hooks/useChat";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
} from "react";
import QuickReply from "../QuickReply";
import Image from "next/image";

import styles from "./ChatBox.module.css";
import { motion } from "framer-motion";

type ChatBoxPropsType = {
  gameId: string;
};

const ChatBox = ({ gameId }: ChatBoxPropsType) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const { messageRef, chatMessages, sendMessage } = useChat(gameId);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [showQuickReply, setShowQuickReply] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setInputMessage(value);
  };

  const handleSendMessage = () => {
    if (inputMessage) {
      sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") handleSendMessage();
  };

  const handleClickPlus = () => {
    setShowQuickReply((prevState) => !prevState);
  };

  const onChangeQuickReply = (message: string) => {
    sendMessage(message,true);
    handleCloseQuickReply();
  };

  const handleCloseQuickReply = () => {
    setShowQuickReply(false);
  };

  return (
    <motion.div className={styles.container} ref={constraintsRef}>
      <motion.div
        className={styles.ChatBoxWarper}
        drag
        dragConstraints={constraintsRef}
      >
        <div className={styles.chatBox} onClick={handleCloseQuickReply}>
          <div className={styles.chat}>
            <ul>
              <li>Welcome to ChatBox</li>
              {chatMessages?.map((message, i) => (
                <li key={i}>
                  {message.name}: {message.message}
                </li>
              ))}
              <div ref={messageRef} style={{ height: "5px" }} />
            </ul>
          </div>
        </div>
        <div className={styles.inputBlock}>
          <input
            onFocus={handleCloseQuickReply}
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
        {showQuickReply && (
          <div className={styles.quickReply}>
            <QuickReply onSelect={onChangeQuickReply} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatBox;
