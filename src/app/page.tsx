'use client';

import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import useSocket from '@/hooks/useSocket';
import Logo from '@/components/Logo';
import useLobby from '@/hooks/useLobby';
import { IdType } from '@/@types/lobby.interface';
import toast from 'react-hot-toast';

export default function Page() {
  const { socket, updateUserName } = useSocket();
  const navigator = useRouter();
  const { createLobby, joinLobby } = useLobby();
  const [aka, setAka] = useState<string>('');
  const [lobbyId, setLobbyId] = useState<string>('');

  useEffect(() => {
    if (socket) {
      socket.on('lobby:join:success', handleLobbyJoined);
      socket.on('lobby:join:failed', handleLobbyJoinedError);
    }

    () => {
      socket?.off('lobby:join:success', handleLobbyJoined);
      socket?.off('lobby:join:failed', handleLobbyJoinedError);
    }
  }, [socket]);

  const handleLobbyJoined = (payload: string) => {
    const { id } = JSON.parse(payload) as IdType;

    navigator.push(`/lobby/${id}`);
  }

  const handleLobbyJoinedError = () => {
    toast.error("ห้องเต็ม / ไม่เจอห้อง");
    navigator.push('/');
  }

  useEffect(() => {
    const _aka = localStorage.getItem('aka') || '';
    
    setAka(_aka);
  }, []);

  const handleAkaChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    
    setAka(value);
  }

  const handleLobbyIdChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    
    setLobbyId(value);
  }

  const handlCreateLobby = () => {
    if (disableButton) return;

    localStorage.setItem('aka', aka);
    updateUserName(aka);
    createLobby();
  }

  const handlJoinLobby = () => {
    if (disableButton) return;

    localStorage.setItem('aka', aka);
    updateUserName(aka);
    joinLobby(lobbyId);
  }

  const disableButton = useMemo<boolean>(() => {
    return aka.length === 0;
  }, [aka]);

  const disableJoinButton = useMemo<boolean>(() => {
    return disableButton || lobbyId.length === 0;
  }, [disableButton, lobbyId]);

  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <Logo />
        <h3>ชื่อแกร</h3>
        <input value={aka} placeholder='กรอกชื่อ' onChange={handleAkaChange} />
        <button onClick={handlCreateLobby} disabled={disableButton}>
          สร้างห้อง
        </button>
        <div className={styles.or}>หรือ</div>
        <input value={lobbyId} placeholder='กรอกเลขห้อง' onChange={handleLobbyIdChange} />
        <button onClick={handlJoinLobby} disabled={disableJoinButton}>
          เข้าร่วม
        </button>
      </div>
    </main>
  )
}
