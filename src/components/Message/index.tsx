import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MotiView } from 'moti';

import { useMessage, User } from '../../hooks/message';
import { useAuth } from '../../hooks/auth';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export type MessageProps = {
  id: string;
  text: string;
  user: {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
  }
}

type Props = {
  data: MessageProps;
}

export function Message({ data }: Props) {
  const { user } = useAuth();
  const { setUserMessage, openMessageBox } = useMessage();

  function handleOpenChatRequest(selectedUser: User) {
    if (user && user?.id !== selectedUser.id) {
      setUserMessage(selectedUser);
      openMessageBox();
    }
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>
        {data.text}
      </Text>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => handleOpenChatRequest(data.user)}
          activeOpacity={0.85}
        >
          <UserPhoto
            imageUri={data.user.avatar_url}
            size="SMALL"
          />
        </TouchableOpacity>

        <Text style={styles.username}>
          {data.user.name}
        </Text>
      </View>
    </MotiView>
  );
}