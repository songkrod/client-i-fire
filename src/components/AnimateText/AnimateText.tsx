import { motion } from "framer-motion";
import styles from "./AnimateText.module.css";
import { useEffect, useState } from "react";
import { AnimateMessageType } from "@/@types/message.interface";

type QuickReplyPropsType = {
  animateText?: string;
};

const AnimateText = ({ animateText = "" }: QuickReplyPropsType) => {
  return (
    <motion.div
      className={styles.animateText}
      animate={{ scale: [0.5, 1.5, 0.75, 1.125, 0.935, 1] }}
      transition={{ duration: 1 }}
    >
      {animateText}
    </motion.div>
  );
};

export default AnimateText;
