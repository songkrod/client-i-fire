'use client';

import { CSSProperties, useMemo } from "react";

import styles from './BackCard.module.css';

type BackCardPropsType = {
  zoom?: number;
};

const BackCard = ({zoom}: BackCardPropsType) => {
  const zoomLevel = useMemo<CSSProperties>(() => {
    if (zoom === undefined) return {};

    return {zoom: zoom}
  }, [zoom]);

  return (
    <div className={styles.card}>
      <div className={styles.wrapper} />
    </div>
  )
}

export default BackCard;