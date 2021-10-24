import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';
import { api } from '../../services/api';

import { useAuth } from '../../hooks/auth';
import { Chat, useMessage } from '../../hooks/message';
import { ChatButton } from '../../components/ChatButton';

import { COLORS } from '../../theme';

import { styles } from './styles';
import { MotiView } from '@motify/components';

export function ChatList() {
  const { user } = useAuth();
  const navigate = useNavigation();

  const { getChatById } = useMessage();

  const [chats, setChats] = useState<Chat[]>();

  function handleGoBack() {
    navigate.goBack();
  }

  async function handleNavigateToChat(id: string) {
    await getChatById(id);
    navigate.navigate('Chat');
  }

  useEffect(() => {
    async function getChats() {
      if (user) {
        const reponse = await api.get<Chat[]>('/chats/all');

        setChats(reponse.data);
      } else {
        setChats([]);
      }
    }

    getChats();
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

        <Text style={styles.headerTitle}>
          Suas conversas
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {
        chats && chats.length > 0
          ? (
            <MotiView
              from={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 700 }}
            >
              <FlatList
                data={chats}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <ChatButton
                    avatar_url={item.users[0].avatar_url}
                    name={item.users[0].name ? item.users[0].name : item.users[0].login}
                    message={item.messages[0].text}
                    onPress={() => handleNavigateToChat(item.id)}
                  />
                )}
                contentContainerStyle={{ marginTop: 20, paddingBottom: 20 }}
                ItemSeparatorComponent={() => (
                  <View style={{
                    height: 1,
                    backgroundColor: COLORS.GRAY_QUATERNARY,
                    marginHorizontal: 20
                  }} />
                )}
              />
            </MotiView>
          ) : (
            <Text style={styles.noChatsText}>
              Você não possui nenhuma conversa
            </Text>
          )
      }
    </View>
  );
}