import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: COLORS.BLACK_TERTIARY
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: COLORS.WHITE,
    marginLeft: 10
  },
  text: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
    marginTop: 15
  },
  actionButtons: {
    marginTop: 15,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  buttonText: {
    fontSize: 15,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE,
  },
  declineButton: {
    backgroundColor: COLORS.BLACK_TERTIARY
  },
  acceptButton: {
    backgroundColor: COLORS.PINK,
    marginLeft: 20
  }
});