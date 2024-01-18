import { CardType } from '@/@types/game.interface';
import Card from '@/components/Card';
import BackCard from '@/components/BackCard';

import styles from './PlayerSelected.module.css';
import { forwardRef } from 'react';

type Props = {
  card: CardType | null;
}

const PlayerSelected = forwardRef<HTMLDivElement, Props>(({ card }, ref) => {
  return (
    <div className={styles.playerSelect} ref={ref}>
      <div className={styles.invisible}>
        <BackCard />
      </div>
      <div data-name="preview" className={styles.visible}>
        {card !== null && (
          <Card {...card} />
        )}
        {card === null && (
          <BackCard />
        )}
      </div>
    </div>
  )
});

export default PlayerSelected;