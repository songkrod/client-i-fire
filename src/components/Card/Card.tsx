import type { CardType } from "@/@types/game.interface";

import styles from './Card.module.css';
import Logo from "../Logo";
import { CSSProperties, useMemo } from "react";

type CardPropsType = CardType & {
  zoom?: number;
};

const Card = ({no, score, zoom}: CardPropsType) => {
  const cardColor = useMemo<string>(() => {
    if (score === 2) return styles.blue;
    if (score === 3) return styles.green;
    if (score === 5) return styles.red;
    if (score === 7) return styles.purple;

    return styles.gray;
  }, [score]);

  const zoomLevel = useMemo<CSSProperties>(() => {
    if (zoom === undefined) return {};

    return {zoom: zoom}
  }, [zoom]);

  return (
    <div className={`${styles.card} ${cardColor}`} >
      <div className={styles.wrapper}>
        <div className={styles.score}>
          <div className={styles.buff}>
            <Logo />
          </div>
          <span>x</span>
          <b>{score}</b>
        </div>
        <div className={styles.no}>{no}</div>
      </div>
    </div>
  )
}

export default Card;