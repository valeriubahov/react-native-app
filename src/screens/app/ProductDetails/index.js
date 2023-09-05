import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProductDetails = ({navigation, route}) => {
  const {product} = route?.params || {};
  console.log('product', product);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{uri: product?.image}} />
        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>{product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ProductDetails);
