import React from 'react';
import {Pressable, Text, Image} from 'react-native';
import {styles} from './styles';
import Config from 'react-native-config';

const ProductHomeItem = ({title, price, image, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: `${Config.API_URL}/${image?.path}`}}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>$ {price}</Text>
    </Pressable>
  );
};

export default React.memo(ProductHomeItem);
