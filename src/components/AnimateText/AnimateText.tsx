import { motion } from "framer-motion";
import styles from "./AnimateText.module.css";
import { useEffect, useState } from "react";
import { AnimateMessageType } from "@/@types/message.interface";

type QuickReplyPropsType = {
  id: string;
  animateText: AnimateMessageType | null;
};

const animateTextDisplayTime = 3000 // in ms

const AnimateText = ({ id, animateText }: QuickReplyPropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const willOpenAnimateText = () => {
      if (id !== animateText?.id) return;

      setIsOpen(true);
    };

    willOpenAnimateText();
  }, [animateText]);

  useEffect(()=>{
    const wilSetTimeOut = () => {
      if(!isOpen) return

      setTimeout(() => {
        setIsOpen(false);
      }, animateTextDisplayTime);
    }
    
    wilSetTimeOut()
  },[isOpen])

  return (
    <>
      {isOpen && (
        <motion.div
          className={styles.animateText}
          animate={{ scale: [0.5, 1.5, 0.75, 1.125, 0.935, 1] }}
          transition={{ duration: 1 }}
        >
          {animateText?.message}
        </motion.div>
      )}
    </>
  );
};

export default AnimateText;
