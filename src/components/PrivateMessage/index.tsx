import React from 'react';
import {
  Text,
  View
} from 'react-native';

import { styles } from './styles';

interface Props {
  text: string;
  owner: boolean;
}

export function PrivateMessage({ text, owner }: Props) {
  return (
    <View style={[
      styles.container,
      owner ? styles.sent : styles.received
    ]}>
      <Text style={styles.message}>
        {text}
      </Text>
    </View>
  );
}