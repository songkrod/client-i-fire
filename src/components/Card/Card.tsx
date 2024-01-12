import type { CardType } from "@/@types/game.interface";

import styles from './Card.module.css';
import Logo from "../Logo";
import { CSSProperties, useMemo } from "react";

type CardPropsType = CardType & {
  zoom?: number;
};

const Card = ({no, buff, zoom}: CardPropsType) => {
  const cardColor = useMemo<string>(() => {
    if (buff === 2) return styles.blue;
    if (buff === 3) return styles.green;
    if (buff === 5) return styles.red;
    if (buff === 7) return styles.purple;

    return styles.gray;
  }, [buff]);

  const zoomLevel = useMemo<CSSProperties>(() => {
    if (zoom === undefined) return {};

    return {zoom: zoom}
  }, [zoom]);

  return (
    <div className={`${styles.card} ${cardColor}`} style={zoomLevel}>
      <div className={styles.wrapper}>
        <div className={styles.score}>
          <div className={styles.buff}>
            <Logo />
          </div>
          <span>x</span>
          <b>{buff}</b>
        </div>
        <div className={styles.no}>{no}</div>
      </div>
    </div>
  )
}

export default Card;