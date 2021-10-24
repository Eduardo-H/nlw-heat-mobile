import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { MotiView } from 'moti';

import { useAuth } from '../../hooks/auth';
import { UserPhoto } from '../UserPhoto';

import LogoSvg from '../../assets/logo.svg';

import { styles } from './styles';

export function Header() {
  const navigate = useNavigation();

  const { user, signOut } = useAuth();
  const [showChatsButton, setShowChatsButton] = useState(false);

  function handleToggleMenu() {
    setShowChatsButton(!showChatsButton);
  }

  function handleNavigateToChatList() {
    setShowChatsButton(false);
    navigate.navigate('ChatList');
  }

  return (
    <>
      <View style={styles.container}>
        <LogoSvg />

        <View style={styles.profileContainer}>
          {user && (
            <TouchableOpacity activeOpacity={0.8} onPress={signOut}>
              <Text style={styles.logoutText}>
                Sair
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity
              onPress={handleToggleMenu}
              activeOpacity={0.85}
            >
              <UserPhoto imageUri={user?.avatar_url} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {
        showChatsButton && (
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 400 }}
          >
            <TouchableOpacity
              onPress={handleNavigateToChatList}
              activeOpacity={0.9}
              style={styles.chatsButton}
            >
              <Text style={styles.chatsButtonText}>
                Mensagens privadas
              </Text>
            </TouchableOpacity>
          </MotiView>

        )
      }
    </>
  );
}