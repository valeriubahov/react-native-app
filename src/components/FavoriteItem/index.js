import React from 'react';
import {Pressable, Text, View, Image} from 'react-native';
import {styles} from './styles';
import Config from 'react-native-config';

const FavoriteItem = ({title, price, icon, image, onPress, onIconPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: `${Config.API_URL}/${image?.path}`}}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>

      <Pressable hitSlop={10} onPress={onIconPress}>
        <Image
          source={icon || require('../../assets/remove.png')}
          style={styles.icon}
        />
      </Pressable>
    </Pressable>
  );
};

export default React.memo(FavoriteItem);
