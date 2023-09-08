import React, {useContext} from 'react';
import {Alert, FlatList, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import {ServiceContext} from '../../../../App';
import {updateService} from '../../../utils/backendCalls';

const Favorites = ({navigation}) => {
  const {services, setServices} = useContext(ServiceContext);

  const likedServices = Array.isArray(services)
    ? services?.filter(service => service?.liked)
    : [];

  const renderItem = ({item}) => {
    const onProductPress = () => {
      navigation.navigate('ProductDetails', {product: item});
    };

    const onRemove = async () => {
      const updatedServices = await updateService(item?._id, {liked: false});
      console.log(updatedServices);
      if (Array.isArray(updatedServices)) {
        setServices(updatedServices);
      }
    };

    const onIconPress = () => {
      Alert.alert(
        'Are you sure you want to remove this item from your favorite?',
        '',
        [{text: 'Yes', onPress: onRemove}, {text: 'Cancel'}],
      );
    };
    return (
      <FavoriteItem
        onPress={onProductPress}
        onIconPress={onIconPress}
        {...item}
      />
    );
  };
  return (
    <SafeAreaView>
      <Header title="Favorites" />
      <FlatList
        data={likedServices}
        renderItem={renderItem}
        keyExtractor={item => String(item?._id)}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 40}}>
            You do not have any favorites yet
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default React.memo(Favorites);
