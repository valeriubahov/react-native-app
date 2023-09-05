import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    margin: 8,
    flexDirection: 'row',
  },
  title: {
    color: colors.textGrey,
    paddingVertical: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  price: {
    color: colors.black,
    paddingBottom: 8,
  },
  content: {},
});
