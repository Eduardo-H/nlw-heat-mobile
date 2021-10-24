import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight() + 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  chats: {
    flex: 1,
  },
  noChatsText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.GRAY_SECONDARY,
    textAlign: 'center',
    marginTop: 30
  }
});