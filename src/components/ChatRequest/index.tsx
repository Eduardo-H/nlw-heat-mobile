import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/core';

import { useMessage } from '../../hooks/message';
import { useAuth } from '../../hooks/auth';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export function ChatRequest() {
  const { user } = useAuth();
  const {
    userMessageBox,
    closeMessageBox,
    fetchPrivateChat
  } = useMessage();

  const navigate = useNavigation();

  async function handleOpenChat() {
    closeMessageBox();

    if (user && userMessageBox) {
      await fetchPrivateChat(user.id, userMessageBox?.id);

      navigate.navigate('Chat');
    }
  }

  return (
    <MotiView
      from={{ opacity: 0, translateX: -200 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <UserPhoto imageUri={userMessageBox?.avatar_url} />
        <Text style={styles.headerText}>
          {userMessageBox?.name}
        </Text>
      </View>

      <Text style={styles.text}>
        Você gostaria de iniciar uma conversa privada com {userMessageBox?.name}?
      </Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={closeMessageBox}
          style={[styles.button, styles.declineButton]}
        >
          <Text style={styles.buttonText}>
            Não
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenChat}
          style={[styles.button, styles.acceptButton]}
        >
          <Text style={styles.buttonText}>
            Sim
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}