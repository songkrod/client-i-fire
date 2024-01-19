'use client'

import { useEffect, useState } from "react";
import { MemberReadyStateType, MemberType } from "@/@types/lobby.interface";
import useSocket from "./useSocket";

const useLobby = () => {
  const { socket } = useSocket();
  const [lobbyOwner, setLobbyOwner] = useState<MemberType | null>(null);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [memberReadyStates, setMemberReadyStates] = useState<MemberReadyStateType>({});

  const createLobby = (id?: string) => {
    const payload = id ? JSON.stringify({id}) : undefined;

    socket?.emit('lobby:create', payload);
  }

  const joinLobby = (id: string) => {
    socket?.emit('lobby:join', JSON.stringify({ id }));
  }

  const leaveLobby = (id: string) => {
    socket?.emit('lobby:leave', JSON.stringify({ id }));
  }

  const getLobbyInfo = (id: string) => {
    socket?.emit('lobby:enter', JSON.stringify({ id }));
  }

  const updateUserStatus = (id: string, state: boolean) => {
    socket?.emit('lobby:ready', JSON.stringify({ id, state }));
  }

  useEffect(() => {
    if (socket) {
      socket.on('lobby:members', handleUpdateMembers);
      socket.on('lobby:owner', handleGetOwner);
      socket.on('lobby:members:status', handleUpdateMemberStatus);
    }

    return () => {
      socket?.off('lobby:members', handleUpdateMembers);
      socket?.off('lobby:owner', handleGetOwner);
      socket?.off('lobby:members:status', handleUpdateMemberStatus);
    }
  }, [socket]);

  const handleUpdateMembers = (payload: string) => {
    const _members = JSON.parse(payload) as MemberType[];

    setMembers(_members);
  }

  const handleGetOwner = (payload: string) => {
    const _owner = JSON.parse(payload) as MemberType;

    setLobbyOwner(_owner);
  }

  const handleUpdateMemberStatus = (payload: string) => {
    const _memberReadyStates = JSON.parse(payload) as MemberReadyStateType;

    setMemberReadyStates(_memberReadyStates);
  }

  return { lobbyOwner, members, memberReadyStates, createLobby, getLobbyInfo, joinLobby, leaveLobby, updateUserStatus }
};

export default useLobby;