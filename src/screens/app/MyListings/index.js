import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FavoriteItem from '../../../components/FavoriteItem';
import Header from '../../../components/Header';
import {ProfileContext, ServiceContext} from '../../../../App';
import {deleteService} from '../../../utils/backendCalls';

const MyListings = ({navigation}) => {
  const {services, setServices} = useContext(ServiceContext);
  const {profile} = useContext(ProfileContext);

  const myServices = Array.isArray(services)
    ? services?.filter(service => service?.owner === profile?._id)
    : [];

  const renderItem = ({item}) => {
    const onProductPress = () => {
      navigation.navigate('ProductDetails', {product: item});
    };

    const onRemove = async () => {
      const updatedServices = await deleteService(item?._id);
      if (Array.isArray(updatedServices)) {
        setServices(updatedServices);
      }
    };

    return (
      <FavoriteItem
        onIconPress={onRemove}
        icon={require('../../../assets/remove.png')}
        onPress={onProductPress}
        {...item}
      />
    );
  };

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView>
      <Header title="My Listings" showBack onBackPress={goBack} />

      <FlatList
        data={myServices}
        renderItem={renderItem}
        keyExtractor={item => String(item?._id)}
      />
    </SafeAreaView>
  );
};

export default React.memo(MyListings);
