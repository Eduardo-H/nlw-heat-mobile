import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

interface Props extends RectButtonProps {
  avatar_url: string;
  name: string;
  message: string;
}

export function ChatButton({
  avatar_url,
  name,
  message,
  ...rest
}: Props) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <UserPhoto imageUri={avatar_url} />

      <View style={styles.info}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.message}>
          {message}
        </Text>
      </View>
    </RectButton>
  );
}