import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  info: {
    flexDirection: 'column',
    marginLeft: 15
  },
  name: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    color: COLORS.WHITE
  },
  message: {
    fontFamily: FONTS.REGULAR,
    fontSize: 15,
    color: COLORS.GRAY_SECONDARY
  }
});