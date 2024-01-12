'use client';

import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import useSocket from '@/hooks/useSocket';
import Logo from '@/components/Logo';
import useLobby from '@/hooks/useLobby';

export default function Page() {
  const { socket } = useSocket();
  const { joinLobby } = useLobby();
  const [aka, setAka] = useState<string>('');
  const navigator = useRouter();

  useEffect(() => {
    if (socket) {
      socket?.on('lobby:join:success', handleLobbyJoined);
      socket?.on('lobby:join:failed', handleLobbyJoinedError);
    }
  }, [socket]);

  const handleLobbyJoined = () => {
    navigator.push('/lobby');
  }

  const handleLobbyJoinedError = () => {
    alert('Lobby is already full!');
  }

  useEffect(() => {
    const _aka = localStorage.getItem('aka') || '';
    
    setAka(_aka);
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    
    setAka(value);
  }

  const handleSubmitName = () => {
    if (disableButton) return;

    localStorage.setItem('aka', aka);
    joinLobby(aka);
  }

  const disableButton = useMemo<boolean>(() => {
    return aka.length === 0;
  }, [aka]);

  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <Logo />
        <h3>Name</h3>
        <input value={aka} placeholder='Enter your aka name' onChange={handleChange} />
        <button onClick={handleSubmitName} disabled={disableButton}>
          Enter Lobby
        </button>
      </div>
    </main>
  )
}
