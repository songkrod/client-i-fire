'use client';

import { useEffect, useMemo, useState } from 'react';
import useSocket from '@/hooks/useSocket';

import styles from './Hands.module.css';
import { CardType } from '@/@types/game.interface';
import Card from '@/components/Card';

const Hands = () => {
  const { socket } = useSocket();
  const [hands, setHands] = useState<CardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  useEffect(() => {
    socket?.emit('game:hands:get');
    
    socket?.on('game:hands', (message: string) => {
      const _cards = JSON.parse(message) as CardType[];
  
      setHands(_cards);
    })
  }, []);

  const handCardZoomLevel = useMemo<number>(() => {
    return (0.4/702) * window.innerWidth;
  }, []);

  const buttonTitle = useMemo<string>(() => {
    return confirmed ? 'Confirmed' : 'Confirm';
  }, [confirmed]);

  const handleSelectCard = (card: CardType) => {
    if (confirmed) return;

    if (card.no === selectedCard?.no) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  }

  const handleConfirmSelect = () => {
    if (confirmed) return;

    setConfirmed(true);
    socket?.emit('game:confirm', JSON.stringify(selectedCard));
  }

  return (
    <div className={styles.hands}>
      <div className={styles.cards}>
        {hands.map((card) => (
          <div className={`${styles.card} ${selectedCard && selectedCard.no === card.no ? styles.cardActive : ''}`} key={`card-${card.no}`} onClick={() => handleSelectCard(card)}>
            <Card zoom={handCardZoomLevel} {...card} />
          </div>
        ))}
      </div>
      <div className={`${styles.button} ${confirmed ? styles.confirmed : ''}`}>
        <button disabled={selectedCard === null} onClick={handleConfirmSelect}>{buttonTitle}</button>
      </div>
    </div>
  )
}

export default Hands;