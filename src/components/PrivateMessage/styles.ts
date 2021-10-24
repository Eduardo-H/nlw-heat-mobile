import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    marginBottom: 5
  },
  sent: {
    backgroundColor: COLORS.GRAY_QUATERNARY,
    marginLeft: 'auto'
  },
  received: {
    backgroundColor: COLORS.PINK,
    marginRight: 'auto'
  },
  message: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
});