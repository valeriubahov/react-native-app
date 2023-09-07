import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.white,
    marginVertical: 8,
    marginHorizontal: 1,
    borderRadius: 4,

    // ios only
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // android only
    elevation: 5,
  },

  label: {
    color: colors.grey,
    fontSize: 16,
  },
  input: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: '500',
  },
});
