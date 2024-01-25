import useChat from "@/hooks/useChat";
import styles from "./QuickReply.module.css";

type QuickReplyPropsType = {
  onSelect: (message: string) => void;
};

const QuickReply = ({ onSelect }: QuickReplyPropsType) => {
  const { insultWordsList } = useChat(null);
  const handleSelect = (message: string) => {
    onSelect?.(message);
  };

  return (
    <ul className={styles.wordList}>
      {insultWordsList.map((word, index) => (
        <li key={index} onClick={() => handleSelect(word)}>
          {word}
        </li>
      ))}
    </ul>
  );
};

export default QuickReply;
