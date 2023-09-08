import React, {useContext} from 'react';
import {Image, Linking, Pressable, ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import ImageCarousel from '../../../components/ImageCarousel';
import Config from 'react-native-config';
import {updateService} from '../../../utils/backendCalls';
import {ServiceContext} from '../../../../App';

const ProductDetails = ({navigation, route}) => {
  const params = route?.params || {};
  const {services, setServices} = useContext(ServiceContext);
  const product = services.find(
    service => service?._id === params?.product?._id,
  );

  const onBackPress = () => {
    navigation.goBack();
  };

  const onContact = () => {
    // Make a phone call
    // const phone = '123456789';
    // Linking.openURL(`tel:${phone}`);

    // Send email
    const email = 'test@test.com';
    Linking.openURL(`mailto: ${email}`);
  };

  const onBookmark = async () => {
    const data = await updateService(product?._id, {liked: !product?.liked});
    setServices(data);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {product?.images?.length ? (
          <ImageCarousel images={product?.images} />
        ) : (
          <Image
            style={styles.image}
            source={{uri: `${Config.API_URL}/${product?.image?.path}`}}
          />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>$ {product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>

        {/* Absolute header with back arrow */}
        <Pressable onPress={onBackPress} style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={require('../../../assets/back.png')}
          />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={onBookmark} style={styles.bookmarkContainer}>
          <Image
            style={styles.bookmarkIcon}
            source={
              product?.liked
                ? require('../../../assets/bookmark_blue.png')
                : require('../../../assets/bookmark.png')
            }
          />
        </Pressable>
        <Button onPress={onContact} title="Contact Seller" />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ProductDetails);
