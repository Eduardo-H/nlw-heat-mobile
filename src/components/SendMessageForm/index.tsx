import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native';
import { api } from '../../services/api';
import { useToast } from 'react-native-toast-notifications';

import { Button } from '../Button';
import { COLORS } from '../../theme';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const toast = useToast();

  async function handleMessageSubmit() {
    const messageFormated = message.trim();

    if (messageFormated.length === 0) {
      Alert.alert('Digite uma mensagem');
      return;
    }

    setSendingMessage(true);

    try {
      await api.post('/messages', { message: messageFormated });

      toast.show('Mensagem enviada com sucesso!', {
        type: 'success'
      });
    } catch (err) {
      toast.show('Não foi possível enviar sua mensagem', {
        type: 'danger'
      });
    }

    setMessage('');
    Keyboard.dismiss();

    setSendingMessage(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
        style={styles.input}
      />

      <Button
        title="Enviar Mensagem"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        onPress={handleMessageSubmit}
        isLoading={sendingMessage}
      />
    </View>
  );
}