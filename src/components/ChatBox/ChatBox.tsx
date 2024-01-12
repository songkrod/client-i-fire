import useChat from "@/hooks/useChat";
import { ChangeEventHandler, useState } from "react";
import styles from "./ChatBox.module.css";
import QuickReply from "../QuickReply";
import Image from "next/image";

type ChatBoxPropsType = {
  onSendMessage: Function;
  listMessages: string[];
};

const ChatBox = () => {
  const { chatMessages, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState<string>("");

  const [showQuickReply, setShowQuickReply] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setInputMessage(value);
  };

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage("");
  };

  const handleClickPlus = () => {
    setShowQuickReply(prevState => !prevState)
  }

  return (
    <div>
      <ul>
        <li>Welcome to ChatBox</li>
        {chatMessages?.map((message, i) => (
          <li key={i}>
            {message.sender}: {message.message}
          </li>
        ))}
      </ul>
      <div className={styles.inputBlock}>
        <input onChange={handleChange} value={inputMessage} type="text"></input>
        <Image src="/chat/plus.png" alt="plus-image" width={24} height={24} onClick={handleClickPlus}/>
      </div>
      {showQuickReply && <QuickReply />}
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ChatBox;
