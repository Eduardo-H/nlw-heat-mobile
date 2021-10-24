import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MotiView } from 'moti';

import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export function ChatRequest() {
  return (
    <MotiView
      from={{ opacity: 0, translateX: -200 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <UserPhoto imageUri="https://github.com/Eduardo-H.png" />
        <Text style={styles.headerText}>
          Eduardo Oliveira
        </Text>
      </View>

      <Text style={styles.text}>
        Você gostaria de iniciar uma conversa privada com Eduardo Oliveira?
      </Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, styles.declineButton]}
        >
          <Text style={styles.buttonText}>
            Não
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
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