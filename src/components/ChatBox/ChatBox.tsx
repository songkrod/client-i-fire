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

type ChatBoxPropsType = {
  onSendMessage: Function;
  listMessages: string[];
};

const ChatBox = () => {
  const { chatMessages, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState<string>("");

  const [showQuickReply, setShowQuickReply] = useState<boolean>(false);

  const messagesEndRef = useRef(null);

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
    <div className={styles.chatBoxBg}>
      <div className={styles.chatBox}>
        <div className={styles.chat}>
        <h2 className={styles.title}>Welcome to ChatBox</h2>
          <ul>
            {chatMessages?.map((message, i) => (
              <li key={i}>
                {message.sender}:<div className={styles.message}>{message.message}</div>
              </li>
            ))}
            <div ref={messagesEndRef} />
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
          src="/chat/send-message.png"
          alt="send-button"
          width={24}
          height={24}
          onClick={handleSendMessage}
        />
        <Image
          src="/chat/plus.png"
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
