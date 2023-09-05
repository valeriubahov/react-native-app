import React from 'react';
import {FlatList, View, Text} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {products} from '../../../data/products';
import FavoriteItem from '../../../components/FavoriteItem';

const Favorites = () => {
  const renderItem = ({item}) => {
    return <FavoriteItem {...item} />;
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={item => String(item?.id)}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Favorites);
