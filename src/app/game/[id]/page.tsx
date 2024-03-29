'use client';

import { useEffect, useState } from 'react';
import useSocket from '@/hooks/useSocket';
import Hands from './_components/Hands';
import Stacks from './_components/Stacks';

import styles from './page.module.css';
import Players from './_components/Players';
import { useRouter } from 'next/navigation';
import useGame from '@/hooks/useGame';
import TextOverlay from './_components/TextOverlay';
import toast from 'react-hot-toast';
import { PlayerType } from '@/@types/player.interface';
import { ActivityType, BoughtType, BuyerType, CardType, PlayerPickedType, PlayerScoreType, StacksType } from '@/@types/game.interface';
import PlayerSelected from './_components/PlayerSelected';
import useRefEventListener from '@/hooks/useRefEventListener';
import { MAX_STACK_ANIMATION_DURATION } from '@/constants/animate';
import useGameAnimation from '@/hooks/useGameAnimation';
import ScoreBoard from './_components/ScoreBoard';
import ChatBox from '@/components/ChatBox';

export default function Page({ params }: { params: { id: string } }) {
  const { socket } = useSocket();
  const navigator = useRouter();
  const { joinGame, leaveGame } = useGame();
  const { 
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
  } = useGameAnimation();
  const [startGame, setStartGame] = useState<boolean>(false);
  const [isFreeze, setIsFreeze] = useState<boolean>(true);
  const [isBuyer, setIsBuyer] = useState<boolean>(false);
  const [waitingPlayerBuy, setWaitingPlayerBuy] = useState<PlayerType | null>(null);
  const [isPlayerPicked, setIsPlayerPicked] = useState<boolean>(false);
  const [pickedPlayerCard, setPickedPlayerCard] = useState<CardType | null>(null);

  const [playerScore, setPlayerScore] = useState<PlayerScoreType[]>([]);

  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [playersPicked, setPlayersPicked] = useState<string[]>([]);
  const [pickedDetail, setPickedDetail] = useState<PlayerPickedType>({});

  const [hands, setHands] = useState<CardType[]>([]);
  const [stacks, setStacks] = useState<StacksType>({
    stack1: [],
    stack2: [],
    stack3: [],
    stack4: [],
  });

  useEffect(() => {
    joinGame(params.id)

    // commons
    socket?.on('game:members:ready', handleAllPlayerReady);
    socket?.on('game:join:failed', handleJoinGameFailed);
    socket?.on('game:player:buy', handleWatingPlayerBuy);
    socket?.on('game:activity', handleGameActivity);
    socket?.on('game:start:turn', handleStartTurn);
    socket?.on('game:result', handleGameResult);

    // hands
    socket?.on('game:hands', handlePlayerHands);

    // stacks
    socket?.on('game:stacks', handleUpdateStack);

    // players
    socket?.on('game:players', handlePlayersUpdate);
    
    // pick card
    socket?.on('game:player:picked', handlePlayerPicked);
    socket?.on('game:player:picked:result', handlePlayerPickedResult);

    // buy
    socket?.on('game:player:buyer', handleBuyer);
    socket?.on('game:player:bought', handleBought);

    return () => {
      leaveGame(params.id);

      // commons
      socket?.off('game:members:ready', handleAllPlayerReady);
      socket?.off('game:join:failed', handleJoinGameFailed);
      socket?.off('game:player:buy', handleWatingPlayerBuy);
      socket?.off('game:activity', handleGameActivity);
      socket?.off('game:start:turn', handleStartTurn);
      socket?.off('game:result', handleGameResult);

      // hands
      socket?.off('game:hands', handlePlayerHands);

      // stacks
      socket?.off('game:stacks', handleUpdateStack);

      // players
      socket?.off('game:players', handlePlayersUpdate);
      
      // pick card
      socket?.off('game:player:picked', handlePlayerPicked);
      socket?.off('game:player:picked:result', handlePlayerPickedResult);

      // buy
      socket?.off('game:player:buyer', handleBuyer);
      socket?.off('game:player:bought', handleBought);
    }
  }, []);

  const handleStartTurn = () => {
    setIsFreeze(false);
    setIsBuyer(false);
    setWaitingPlayerBuy(null);
    setIsPlayerPicked(false);
    setPickedPlayerCard(null);
    setPlayersPicked([]);
    setPickedDetail({});
  }

  const handlePlayerHands = (payload: string) => {
    const _cards = JSON.parse(payload) as CardType[];

    setHands(_cards);
  }

  const handleUpdateStack = (payload: string) => {
    const _stacks = JSON.parse(payload) as StacksType;
    
    setStacks(_stacks);
  }

  const handleBuyer = () => {
    setIsFreeze(false);
    setIsBuyer(true);
  }

  const handleBought = (payload: string) => {
    setIsFreeze(true);
    const { stack: stackNo, stacks: updatedStacks, buyer } = JSON.parse(payload) as BoughtType;
    setIsBuyer(false);
    setWaitingPlayerBuy(null);

    toast(`${buyer.name} เหมาแถวที่ ${stackNo} จ้าาาา`, {
      icon: '🤩',
    });

    animateBoughtStackRef.current(buyer, stackNo, updatedStacks);
  }

  const animateBoughtStackRef = useRefEventListener(async (buyer: PlayerType, stackNo: number, updatedStacks: StacksType) => {
    const stackKey = `stack${stackNo}` as keyof StacksType;

    await animateTakeAll(stacks[stackKey], stackNo);
    await delay(MAX_STACK_ANIMATION_DURATION);
    await resetAnimateTakeAll(stacks[stackKey], stackNo);

    if (buyer.id === socket?.id) {
      // await animateSelfPlaceCard();
      await delay(1000);
      setStacks(updatedStacks);
      setIsPlayerPicked(false);
      // await resetAnimateSelfPlaceCard();
    } else {
      // await animatePlayerPlaceCard(buyer.id);
      setPlayersPicked((prevState) => prevState.filter((id) => id !== buyer.id));
      setPickedDetail((prevState) => {
        const newState =  {...prevState};
        delete newState[buyer.id];

        return newState;
      });
      await delay(1000);
      setStacks(updatedStacks);
      // await resetAnimatePlayerPlaceCard(buyer.id);
    }
  });

  const handlePlayerPicked = (payload: string) => {
    const playerId = socket?.id || '';
    const ids = JSON.parse(payload) as string[];
    const isPicked = ids.includes(playerId);

    setIsPlayerPicked(isPicked);
    setPlayersPicked(ids);
  }

  const handlePlayerPickedResult = (payload: string) => {
    const playerId = socket?.id || '';
    const playerPicked = JSON.parse(payload) as PlayerPickedType;
    
    setPickedDetail(playerPicked);
    setPickedPlayerCard(playerPicked[playerId] || null);
  }

  const handleAllPlayerReady = () => {
    setStartGame(true);
  }

  const handleJoinGameFailed = () => {
    toast.error("เข้าเกมไม่ได้จ้าา");
    navigator.push('/');
  }

  const handleWatingPlayerBuy = (payload: string) => {
    const { buyer } = JSON.parse(payload) as BuyerType;
    setWaitingPlayerBuy(buyer);
  }

  const handleGameActivity = (payload: string) => {
    setIsFreeze(true);
    const activities = JSON.parse(payload) as ActivityType[];

    if (activities.length === 0) {
      socket?.emit('game:end:turn', JSON.stringify({ id: params.id }));
      return;
    }

    activities.map((activity, index) => {
      triggerActivity(activity, (index + 1) * 2000, index === activities.length - 1);
    });
  }

  const triggerActivity = async (activity: ActivityType, timeout: number, isLast: boolean) => {
    await delay(timeout);

    setStacks(activity.stacks);
    if (activity.action === 'PUSH') {
      setPlayersPicked((prevState) => prevState.filter((id) => id !== activity.player.id));
      setPickedDetail((prevState) => {
        const newState =  {...prevState};
        delete newState[activity.player.id];

        return newState;
      });

      if (activity.player.id === socket?.id) {
        setIsPlayerPicked(false);
        setPickedPlayerCard(null);
      }
    } else {
      const stackKey = `stack${activity.detail.stackNo}` as keyof StacksType;
      await animateTakeAll(stacks[stackKey], activity.detail.stackNo);
      await delay(MAX_STACK_ANIMATION_DURATION);
      setStacks(activity.stacks);
      await resetAnimateTakeAll(stacks[stackKey], activity.detail.stackNo);
    }

    if (!isLast) return;
    socket?.emit('game:end:turn', JSON.stringify({ id: params.id }));
  }

  const handlePlayersUpdate = (payload: string) => {
    const _players = JSON.parse(payload) as PlayerType[];

    setPlayers(_players);
  };

  const handleGameResult = (payload: string) => {
    setIsFreeze(true);
    const scores = JSON.parse(payload) as PlayerScoreType[];
    setPlayerScore(scores);
  }

  const handlePickedCard = () => {
    setIsFreeze(true);
  }

  return (
    <div className={styles.page}>
      <Stacks ref={stacksRef} stacks={stacks} buyMode={isBuyer} />
      <Players ref={playersRef} players={players} playersPicked={playersPicked} playerPickedCard={pickedDetail} gameId={params.id}/>
      <Hands ref={handsRef} hands={hands} onPicked={handlePickedCard} />
      {isPlayerPicked && (
        <PlayerSelected ref={playerSelectedRef} card={pickedPlayerCard} />
      )}
      {!startGame && (
        <TextOverlay children="รอผู้เล่นคนอื่นแปปจ้าาา" />
      )}
      {waitingPlayerBuy !== null && (
        <TextOverlay>รอ <span>{waitingPlayerBuy.name}</span> ซื้อแปป</TextOverlay>
      )}
      {isFreeze && (
        <div className={styles.blocker} />
        )}
      <ChatBox gameId={params.id}/>
      {playerScore.length > 0 && (
        <ScoreBoard gameId={params.id} playerScores={playerScore} />
      )}
    </div>
  )
}