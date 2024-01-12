"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import useSocket from "@/hooks/useSocket";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import useLobby from "@/hooks/useLobby";
import Image from "next/image";
import ChatBox from "@/components/ChatBox/ChatBox";

export default function Page() {
  const navigator = useRouter();
  const { socket } = useSocket();
  const {
    members,
    lobbyOwner,
    memberReadyStates,
    leaveLobby,
    getLobbyInfo,
    updateUserStatus,
  } = useLobby();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    getLobbyInfo();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("lobby:start:game", (payload: string) => {
        const { id } = JSON.parse(payload) as { id: string };

        navigator.push("/game");
      });
    }
  }, [socket]);

  const handleClickReady = () => {
    const nextState = !ready;
    setReady(nextState);
    updateUserStatus(nextState);
  };

  const handleClickStartGame = () => {
    socket?.emit("lobby:start");
  };

  const buttonTitle = useMemo<string>(() => {
    return ready ? "Unready" : "Ready";
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
    leaveLobby();
    navigator.push("/");
  };

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <Logo />
        <div className={styles.table}>
          <div className={styles.header}>
            <div className={styles.name}>Players</div>
            <div className={styles.status}>Status</div>
          </div>
          {members.map((member) => (
            <div key={member.id} className={styles.player}>
              <div className={styles.name}>
                {member.name}
                {member.id === lobbyOwner?.id && (
                  <div className={styles.icon}>
                    <Image
                      alt="leader"
                      src="/crown.svg"
                      fill
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
              <div
                className={`${styles.status} ${
                  !!memberReadyStates[member.id] ? styles.ready : styles.unready
                }`}
              >
                {!!memberReadyStates[member.id] ? "Ready" : "Unready"}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.button}>
          <button onClick={handleLeaveLobby}>Leave</button>
          <button onClick={handleClickReady}>{buttonTitle}</button>
          {isLeader && (
            <button
              className={styles.startButton}
              onClick={handleClickStartGame}
              disabled={notAllMembersAreReady}
            >
              Start Game
            </button>
          )}
        </div>

        <ChatBox />
      </div>
    </div>
  );
}
