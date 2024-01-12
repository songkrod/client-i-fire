'use client'

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/contexts/SocketContext";
import { MemberReadyStateType, MemberType } from "@/@types/lobby.interface";

const useLobby = () => {
  const { socket } = useContext(SocketContext);
  const [lobbyOwner, setLobbyOwner] = useState<MemberType | null>(null);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [memberReadyStates, setMemberReadyStates] = useState<MemberReadyStateType>({});

  const joinLobby = (name: string) => {
    const user = { id: socket?.id, name };

    socket?.emit('user:update', JSON.stringify(user));
    socket?.emit('lobby:join');
  }

  const leaveLobby = () => {
    socket?.emit('lobby:leave');
  }

  const getLobbyInfo = () => {
    socket?.emit('lobby:members:get');
  }

  const updateUserStatus = (state: boolean) => {
    const status = { state: state };

    console.log('updateUserStatus', status);
    
    socket?.emit('lobby:ready', JSON.stringify(status));
  }

  useEffect(() => {
    if (socket) {
      socket.on('lobby:members', (payload: string) => {
        const _members = JSON.parse(payload) as MemberType[];

        setMembers(_members);
      })

      socket.on('lobby:owner', (payload: string) => {
        const _owner = JSON.parse(payload) as MemberType;

        console.log('_owner', _owner)

        setLobbyOwner(_owner);
      })

      socket.on('lobby:members:status', (payload: string) => {
        const _memberReadyStates = JSON.parse(payload) as MemberReadyStateType;

        setMemberReadyStates(_memberReadyStates);
      });
    }
  }, [socket]);

  return { lobbyOwner, members, memberReadyStates, getLobbyInfo, joinLobby, leaveLobby, updateUserStatus }
};

export default useLobby;