import useChat from "@/hooks/useChat";
import styles from "./QuickReply.module.css";

type QuickReplyPropsType = {
  onSelect: (message: string) => void;
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

const QuickReply = ({ onSelect }: QuickReplyPropsType) => {
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
