import React from 'react';
import {
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
}

export function Button({ 
  title, 
  color, 
  backgroundColor,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, { backgroundColor }]}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading 
        ? <ActivityIndicator color={color} /> 
        : (
          <>
            <AntDesign name={icon} size={24} style={styles.icon} />

            <Text style={[styles.title, { color }]}>
              {title}
            </Text>
          </>
        )        
      }
      
    </TouchableOpacity>
  );
}