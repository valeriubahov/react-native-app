import React from 'react';
import {Pressable, Text, Image, View} from 'react-native';
import {styles} from './styles';

const FavoriteItem = ({title, price, image, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={{uri: image}} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Pressable>
  );
};

export default React.memo(FavoriteItem);
