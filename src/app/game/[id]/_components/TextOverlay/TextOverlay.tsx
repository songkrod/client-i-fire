'use client';

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import useSocket from "@/hooks/useSocket";

import styles from './TextOverlay.module.css';

type TextOverlayPropsType = PropsWithChildren;

const TextOverlay = ({ children }: TextOverlayPropsType) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>{children}</div>
    </div>
  )
}

export default TextOverlay;