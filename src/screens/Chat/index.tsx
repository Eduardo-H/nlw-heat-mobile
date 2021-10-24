import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  ScrollView,
  Text
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { api } from '../../services/api';
import io from 'socket.io-client';

import { useAuth } from '../../hooks/auth';
import { Message, useMessage } from '../../hooks/message';
import { UserPhoto } from '../../components/UserPhoto';
import { PrivateMessage } from '../../components/PrivateMessage';

import { COLORS } from '../../theme';

import { styles } from './styles';

export function Chat() {
  const { user } = useAuth();
  const { openChat } = useMessage();
  const navigate = useNavigation();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(openChat ? openChat.messages : []);

  const contact = openChat?.users[0].id === user?.id ? openChat?.users[1] : openChat?.users[0];

  function handleGoBack() {
    navigate.goBack();
  }

  async function handleSendMessage() {
    if (!message.trim()) {
      return;
    }

    await api.post('/chat/messages', {
      id: openChat?.id,
      text: message
    });

    setMessage('');
  }

  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on(`new_private_message_${openChat?.id}`, (newMessage: Message) => {
      const updatedMessages = [...messages];
      updatedMessages.push(newMessage);

      setMessages(updatedMessages);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BorderlessButton
          onPress={handleGoBack}
        >
          <AntDesign
            name="left"
            size={24}
            color={COLORS.WHITE}
          />
        </BorderlessButton>

        <View style={styles.headerTitle}>
          <UserPhoto imageUri={contact?.avatar_url} />
          <Text style={styles.username}>
            {contact?.name}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.messages}
      >
        {
          messages.map((message) => (
            <PrivateMessage
              key={message.id}
              text={message.text}
              owner={user?.id === message.user_id}
            />
          ))
        }
      </ScrollView>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor={COLORS.GRAY_PRIMARY}
          value={message}
          onChangeText={setMessage}
        />

        <RectButton
          style={styles.sendButton}
          activeOpacity={0.8}
          onPress={handleSendMessage}
        >
          <Feather name="send" size={20} color={COLORS.WHITE} />
        </RectButton>
      </View>
    </View>
  );
}