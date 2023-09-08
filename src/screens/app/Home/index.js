import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import {categories} from '../../../data/categories';
import CategoryBox from '../../../components/CategoryBox';
import ProductHomeItem from '../../../components/ProductHomeItem';
import {getServices} from '../../../utils/backendCalls';
import {ServiceContext, UserContext} from '../../../../App';
import axios from 'axios';
import {addTokenToAxios} from '../../../utils/request';

const Home = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState();
  const [keyword, setKeyword] = useState();
  const {services, setServices} = useContext(ServiceContext);
  const {user} = useContext(UserContext);
  const [filteredProducts, setFilteredProducts] = useState(services);

  useEffect(() => {
    (async () => {
      if (!axios.defaults.headers.Authorization) {
        addTokenToAxios(user?.token);
      }

      const data = await getServices();
      setServices(data);
    })();
  }, [setServices, user]);

  useEffect(() => {
    if (selectedCategory && !keyword) {
      const updatedProducts = services.filter(
        x => String(x.category) === String(selectedCategory),
      );
      setFilteredProducts(updatedProducts);
    } else if (selectedCategory && keyword) {
      const updatedProducts = services.filter(
        x =>
          String(x.category) === String(selectedCategory) &&
          x.title.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredProducts(updatedProducts);
    } else if (!selectedCategory && keyword) {
      const updatedProducts = services.filter(x =>
        x.title.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredProducts(updatedProducts);
    } else if (!selectedCategory && !keyword) {
      setFilteredProducts(services);
    }
  }, [selectedCategory, keyword, services]);

  const renderCategoryItem = ({item, index}) => {
    return (
      <CategoryBox
        onPress={() => setSelectedCategory(item?.id)}
        isSelected={item?.id === selectedCategory}
        isFirst={index === 0}
        title={item?.title}
        image={item?.image}
      />
    );
  };

  const renderProductItem = ({item}) => {
    const onProductPress = product => {
      navigation.navigate('ProductDetails', {product});
    };
    return <ProductHomeItem onPress={() => onProductPress(item)} {...item} />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        showSearch
        onSearch={setKeyword}
        keyword={keyword}
        title="Find All You Need"
      />
      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.list}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => String(index)}
        />
        <FlatList
          style={styles.productsList}
          numColumns={2}
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => String(item._id)}
          ListFooterComponent={<View style={{height: 300}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Home);
