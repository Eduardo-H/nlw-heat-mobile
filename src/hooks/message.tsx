import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export type User = {
  id: string;
  name: string | undefined;
  login: string;
  avatar_url: string;
}

export type Message = {
  id: string;
  text: string;
  user_id: string;
  user: User
}

type Chat = {
  id: string;
  messages: Message[];
  users: User[];
}

type MessageContextData = {
  isMessageBoxOpen: boolean;
  userMessageBox: User | null;
  openChat: Chat | null;
  openMessageBox: () => void;
  closeMessageBox: () => void;
  setUserMessage: (user: User) => void;
  fetchPrivateChat: (user_id: string, contact_id: string) => void;
}

type MessageProviderProps = {
  children: React.ReactNode;
}

export const MessageContext = createContext({} as MessageContextData);

function MessageProvider({ children }: MessageProviderProps) {
  const [userMessageBox, setUserMessageBox] = useState<User | null>(null);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);
  const [openChat, setOpenChat] = useState<Chat | null>(null);

  function openMessageBox() {
    setIsMessageBoxOpen(true);
  }

  function closeMessageBox() {
    setIsMessageBoxOpen(false);
  }

  function setUserMessage(user: User) {
    setUserMessageBox(user);
  }

  async function fetchPrivateChat(user_id: string, contact_id: string) {
    const { data } = await api.post<Chat>('/chat', {
      user_id,
      contact_id
    });

    setOpenChat(data);
  }

  return (
    <MessageContext.Provider value={{
      isMessageBoxOpen,
      userMessageBox,
      openChat,
      openMessageBox,
      closeMessageBox,
      setUserMessage,
      fetchPrivateChat
    }}>
      {children}
    </MessageContext.Provider>
  )
}

function useMessage() {
  const context = useContext(MessageContext);
  return context;
}

export { MessageProvider, useMessage };