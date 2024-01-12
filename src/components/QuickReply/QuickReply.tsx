import styles from "./QuickReply.module.css";

type QuickReplyPropsType = {};

const insultWordList: string[] = [
  'เดี๋ยวเสี่ยซื้อเอง 💳',
  'เหมา!!! 😘',
  'ไอหนู พี่ลงก่อน',
  'เสี่ยหำเหมารอบนี้',
  'ผมอะ 💯% คราบน้องๆ',
  '💯% หรอจ๋ะน้อง',
  'ว้ายยยยย 🤪 ต๋ายแย้ววววว',
  'อย่าลงการ์ดแบบนี้เวลางาน',
  'น้ำขิงไหมคะ 😊',
  'โสดครับ',
  'วันนี้ป่วยครับ',
  'อย่าคิดนาน คิดกระจิดรวย',
  'ดิดมาก คิดน้อยนวย',
  'เดี๋ยวนะๆ เดี๋ยวมาคุยกัน,',
  'ไอ้ชิบหาย😡 แทรกกู',
  'กูรอดโว้ย!!! 🤪',
];

const QuickReply = () => {
  return (
    <div className={styles.replyWarper}>
      <ul className={styles.wordList}>
        {insultWordList.map((word, index)=> <li key={index}>{word}</li>)}
      </ul>
    </div>
  );
};

export default QuickReply;
