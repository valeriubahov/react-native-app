import {StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  sectionTitle: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.blue,
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  uploadContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey,
    borderStyle: 'dotted',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 28,
  },
  uploadCircle: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadPlus: {
    color: colors.white,
    fontSize: 28,
    marginTop: -4,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 28,
  },
  delete: {
    width: 24,
    height: 24,
    marginLeft: -14,
    marginTop: -24,
  },
  textarea: {
    minHeight: 150,
  },
  button: {
    marginBottom: 180,
  },
});
