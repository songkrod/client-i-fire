'use client';
import Image from "next/image";
import { forwardRef, useMemo, useState } from 'react';
import useSocket from '@/hooks/useSocket';

import styles from './Hands.module.css';
import { CardType } from '@/@types/game.interface';
import Card from '@/components/Card';
import { useParams } from 'next/navigation';
import BackCard from "@/components/BackCard";

type Props = {
  hands: CardType[];
  disabled?: boolean;
  onPicked?: () => void;
}

const Hands = forwardRef<HTMLDivElement, Props>(({ hands = [], disabled = false, onPicked }, ref) => {
  const { socket } = useSocket();
  const params = useParams<{ id: string }>();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [showBackCard, setShowBackCard] = useState<boolean>(false);

  const handCardZoomLevel = useMemo<number>(() => {
    return (0.4/702) * window.innerWidth;
  }, []);

  const handleSelectCard = (card: CardType) => {
    if (disabled) return;

    if (card.no === selectedCard?.no) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  }

  const handleConfirmSelect = () => {
    if (disabled) return;
    
    socket?.emit('game:player:pick', JSON.stringify({ id: params.id, cardNo: selectedCard?.no }));
    setSelectedCard(null);
    onPicked?.();
  }

  const handleHiddenCard = () => {
    setShowBackCard(!showBackCard);
  }

  return (
    <div className={styles.hands} ref={ref}>      
      <div onClick={handleHiddenCard} className={styles.showBackCard} >
        <Image alt='eye' width={50} height={50} src={showBackCard? '/eye-solid.svg': '/eye-slash-solid.svg'} />
      </div>
      <div className={styles.cards}>
        {hands.map((card) => (
          <div className={`${styles.cardWrapper} ${disabled ? styles.disableHover : ''} ${selectedCard && selectedCard.no === card.no ? styles.cardActive : ''}`} key={`card-${card.no}`} onClick={() => handleSelectCard(card)}>
            {showBackCard && <div><BackCard /></div>}
            {!showBackCard && <div className={styles.card}><Card zoom={handCardZoomLevel} {...card} /></div>}
            {selectedCard?.no === card.no && (
              <div className={styles.button}>
                <button onClick={handleConfirmSelect}>ยืนยัน</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
})

export default Hands;