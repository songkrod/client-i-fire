import { CardType } from "@/@types/game.interface";
import { DEFAULT_DELAY, DEFAULT_DURATION, MAX_STACK_ANIMATION_DURATION } from "@/constants/animate";
import { useAnimate } from "framer-motion";

const useGameAnimation = () => {
  const [stacksRef, animateStacks] = useAnimate<HTMLDivElement>();
  const [handsRef, animateHands] = useAnimate<HTMLDivElement>();
  const [playersRef, animatePlayers] = useAnimate<HTMLDivElement>();
  const [playerSelectedRef, animatePlayerSelected] = useAnimate<HTMLDivElement>();

  const delay = async (time: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  };

  const animateTakeAll = async (stack: CardType[], stackNo: number): Promise<void> => {
    return new Promise((resolve) => {
      stack.forEach((_, index) => {
        const delay = index * DEFAULT_DELAY;
        animateStacks(`[data-name=stack${stackNo}] [data-name=slot${index + 1}] > div`, { opacity: 0, scale: 2, rotate: 10 }, { duration: DEFAULT_DURATION, delay: delay, ease: 'easeIn', onComplete: () => {
          if (index === stack.length - 1) {
            resolve();
          }
        }});
      });
    });
  }

  const resetAnimateTakeAll = async (stack: CardType[], stackNo: number): Promise<void> => {
    return new Promise((resolve) => {
      stack.forEach((_, index) => {
        animateStacks(`[data-name=stack${stackNo}] [data-name=slot${index + 1}] > div`, { opacity: 1, scale: 1, rotate: 0 }, { duration: 0, delay: 0, ease: 'easeIn', onComplete: () => {
          if (index === stack.length - 1) {
            resolve();
          }
        }});
      });
    });
  }

  const animateSelfPlaceCard = async (): Promise<void> => {
    return new Promise((resolve) => {
      animatePlayerSelected('[data-name=preview]', { scale: 1.5, y: '-50%' }, { duration: 0.3, delay: 0, ease: 'easeOut', onComplete: () => {
        resolve();
      }});
    });
  }

  const resetAnimateSelfPlaceCard = async (): Promise<void> => {
    return new Promise((resolve) => {
      animatePlayerSelected('[data-name=preview]', { scale: 1, y: '0%' }, { duration: 0, delay: 0, ease: 'easeOut', onComplete: () => {
        resolve();
      }});
    });
  }

  const animatePlayerPlaceCard = async (playerId: string): Promise<void> => {
    return new Promise((resolve) => {
      animatePlayers(`[data-name='card${playerId}']`, { scale: 2, y: '50%' }, { duration: DEFAULT_DURATION, delay: MAX_STACK_ANIMATION_DURATION, ease: 'easeOut', onComplete: () => {
        resolve();
      }});
    });
  }

  const resetAnimatePlayerPlaceCard = async (playerId: string): Promise<void> => {
    return new Promise((resolve) => {
      animatePlayers(`[data-name='card${playerId}']`, { scale: 1, y: '0%' }, { duration: 0, delay: 0, ease: 'easeOut', onComplete: () => {
        resolve();
      }});
    });
  }

  return {
    stacksRef, 
    handsRef, 
    playersRef, 
    playerSelectedRef,
    delay,
    
    animateTakeAll,
    resetAnimateTakeAll,
    
    animateSelfPlaceCard,
    resetAnimateSelfPlaceCard,
    
    animatePlayerPlaceCard,
    resetAnimatePlayerPlaceCard
  };
}

export default useGameAnimation;