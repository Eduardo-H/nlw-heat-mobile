import React, { useState, useEffect } from 'react';
import {
  ScrollView
} from 'react-native';
import io from 'socket.io-client';
import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';

import { styles } from './styles';

let messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  function updateMessages(prevState: MessageProps[]) {
    if (prevState.length > 2) {
      return [
        messagesQueue[0],
        prevState[0],
        prevState[1]
      ];
    } else {
      return [messagesQueue[0], ...prevState];
    }
  }

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last-3');
      setMessages(messagesResponse.data);
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => updateMessages(prevState));
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {messages.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
}