import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormated = message.trim();

    if (messageFormated.length === 0) {
      Alert.alert('Digite uma mensagem');
      return;
    }

    setSendingMessage(true);
    await api.post('/messages', { message: messageFormated });

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