'use client';

import { useEffect, useMemo, useState } from "react";
import styles from './page.module.css';
import useSocket from "@/hooks/useSocket";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import useLobby from "@/hooks/useLobby";
import Image from "next/image";

export default function Page({ params }: { params: { id: string } }) {
  const navigator = useRouter();
  const { socket } = useSocket();
  const { members, lobbyOwner, memberReadyStates, leaveLobby, getLobbyInfo, updateUserStatus } = useLobby();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    getLobbyInfo(params.id);
    socket?.on('lobby:start:game', handleStartGame);

    return () => {
      leaveLobby(params.id);
      socket?.off('lobby:start:game', handleStartGame);
    }
  }, []);

  const handleStartGame = () => {
    navigator.push(`/game/${params.id}`);
  }

  const handleClickReady = () => {
    const nextState = !ready;
    setReady(nextState);
    updateUserStatus(params.id, nextState);
  }

  const handleClickStartGame = () => {
    socket?.emit('lobby:start', JSON.stringify({ id: params.id }));
  }

  const buttonTitle = useMemo<string>(() => {
    return ready ? 'ไม่พร้อม' : 'พร้อม';
  }, [ready]);

  const isLeader = useMemo<boolean>(() => {
    if (!socket) return false;
    if (!lobbyOwner) return false;

    return lobbyOwner.id === socket.id;
  }, [lobbyOwner, socket]);

  const notAllMembersAreReady = useMemo<boolean>(() => {
    return Object.values(memberReadyStates).some((status) => status === false);
  }, [memberReadyStates]);

  const handleLeaveLobby = () => {
    leaveLobby(params.id);
    navigator.push('/');
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <Logo />
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.name}>ชื่อผู้เล่น</div>
            <div className={styles.status}>สถานะ</div>
          </div>
          {members.map((member) => (
            <div key={member.id} className={styles.player}>
              <div className={styles.name}>{member.name}
              {member.id === lobbyOwner?.id && (
                <div className={styles.icon}>
                  <Image alt='leader' src='/crown.svg' fill objectFit='contain' />
                </div>
              )}
              </div>
              <div className={`${styles.status} ${!!memberReadyStates[member.id] ? styles.ready : styles.unready}`}>
                {!!memberReadyStates[member.id] ? 'พร้อม' : 'ยังไม่พร้อม'}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.button}>
          <button onClick={handleLeaveLobby}>
            ออกจากห้อง
          </button>
          <button onClick={handleClickReady}>
            {buttonTitle}
          </button>
          {isLeader && (
            <button className={styles.startButton} onClick={handleClickStartGame} disabled={notAllMembersAreReady}>
              เริ่มเกม
            </button>
          )}
        </div>
      </div>
    </div>
  )
};