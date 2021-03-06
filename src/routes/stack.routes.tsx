import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { Chat } from '../screens/Chat';
import { useAuth } from '../hooks/auth';
import { ChatList } from '../screens/ChatList';

const { Navigator, Group, Screen } = createStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Chat: undefined;
      ChatList: undefined;
    }
  }
}

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent'
        }
      }}
      initialRouteName={user?.id ? 'Home' : 'Welcome'}
    >
      <Group>
        <Screen
          name="Home"
          component={Home}
        />

        <Screen
          name="Chat"
          component={Chat}
        />

        <Screen
          name="ChatList"
          component={ChatList}
        />
      </Group>
    </Navigator>
  );
}