import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { ToastProvider } from 'react-native-toast-notifications';

import { AuthProvider } from './src/hooks/auth';
import { MessageProvider } from './src/hooks/message';
import { Routes } from './src/routes';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <AuthProvider>
      <MessageProvider>
        <ToastProvider
          duration={3000}
          placement="top"
          offsetTop={getStatusBarHeight() + 10}
        >
          <StatusBar
            style="light"
            translucent
            backgroundColor="transparent"
          />
          <Routes />
        </ToastProvider>
      </MessageProvider>
    </AuthProvider>
  );
}