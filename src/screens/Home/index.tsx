import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SendMessageForm } from '../../components/SendMessageForm';
import { SignInBox } from '../../components/SignInBox';

import { styles } from './styles';
import { ChatRequest } from '../../components/ChatRequest';
import { useMessage } from '../../hooks/message';

export function Home() {
  const { user } = useAuth();
  const { isMessageBoxOpen } = useMessage();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {isMessageBoxOpen ? <ChatRequest /> : <Header />}
        <MessageList />
        {user ? <SendMessageForm /> : <SignInBox />}
      </View>
    </KeyboardAvoidingView>
  )
}