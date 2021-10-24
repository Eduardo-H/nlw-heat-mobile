import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK_SECONDARY,
    paddingBottom: 20
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: getStatusBarHeight() + 10,
  },
  headerTitle: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontFamily: FONTS.REGULAR,
    fontSize: 18,
    color: COLORS.WHITE,
    marginLeft: 12
  },
  messages: {
    flex: 1,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  form: {
    height: 50,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLACK_TERTIARY,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 10,
    color: COLORS.WHITE
  },
  sendButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PINK
  }
});