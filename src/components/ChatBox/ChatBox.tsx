import useChat from "@/hooks/useChat";
import { ChangeEventHandler, useState } from "react";
import styles from "./ChatBox.module.css";

type ChatBoxPropsType = {
  onSendMessage: Function;
  listMessages: string[];
};

const ChatBox = () => {
  const { chatMessages, sendMessage } = useChat();
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    setInputMessage(value);
  };

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage("");
  };

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
      <div className={styles.box}>
        <div>
          <input
            onChange={handleChange}
            value={inputMessage}
            type="text"
          ></input>
        </div>
        <div className={styles.box}>
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
