import useSocket from "@/hooks/useSocket";
import styles from "./Player.module.css";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { CardType, PlayerPickedType } from "@/@types/game.interface";
import BackCard from "@/components/BackCard";
import Image from "next/image";
import Card from "@/components/Card";
import { PlayerType } from "@/@types/player.interface";
import AnimateText from "@/components/AnimateText";
import useChat from "@/hooks/useChat";
import { useParams } from "next/navigation";

const PENDING_ICON = "/clock.svg";
const SELECTED_ICON = "/done.svg";

type Props = {
  player: PlayerType;
  isPlayerPicked: boolean;
  playerPickedCard: CardType;
};

const animateTextDisplayTime = 3000; // in ms

const Player = ({ player, isPlayerPicked, playerPickedCard }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const params = useParams<{ id: string }>();
  const { animateText } = useChat(params.id);

  useEffect(() => {
    const handleAnimateTextChange = () => {
      if (player.id !== animateText?.id) return;
      if (isOpen) return;

      setMessage(animateText.message);
      setIsOpen(true);
    };

    handleAnimateTextChange();
  }, [animateText]);

  useEffect(() => {
    const settingTimer = () => {
      if (!isOpen) return;

      setTimeout(() => {
        setIsOpen(false);
      }, animateTextDisplayTime);
    };

    settingTimer();
  }, [isOpen]);

  const cardZoomLevel = useMemo<number>(() => {
    return (0.3 / 702) * window.innerWidth;
  }, []);

  return (
    <div className={styles.player} key={player.id}>
      <div className={styles.name}>
        <div className={styles.icon}>
          <Image
            alt="remaining"
            src={isPlayerPicked ? SELECTED_ICON : PENDING_ICON}
            fill
            objectFit="contain"
          />
        </div>
        <span>{player.name}</span>
      </div>
      {isPlayerPicked && (
        <div className={styles.card} data-name={`card${player.id}`}>
          {playerPickedCard ? (
            <Card zoom={cardZoomLevel} {...playerPickedCard} />
          ) : (
            <BackCard zoom={cardZoomLevel} />
          )}
        </div>
      )}
      {isOpen && <AnimateText key={player.id} animateText={message} />}
    </div>
  );
};

export default Player;
