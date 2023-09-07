import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import {launchImageLibrary} from 'react-native-image-picker';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Input from '../../../components/Input';
import {categories} from '../../../data/categories';
import Button from '../../../components/Button';

const CreateListing = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

  const goBack = () => {
    navigation.goBack();
  };

  const uploadNewImage = async () => {
    setLoading(true);
    const result = await launchImageLibrary();
    if (result?.assets?.length) {
      setImages(list => [...list, ...result?.assets]);
      setLoading(false);
    }
  };

  const onDeleteImage = image => {
    setImages(() => {
      const filteredImages = images.filter(
        img => img?.fileName !== image?.fileName,
      );
      return filteredImages;
    });
  };

  const onChange = (value, key) => {
    setValues(val => ({...val, [key]: value}));
  };

  return (
    <SafeAreaView>
      <Header
        showBack={true}
        onBackPress={goBack}
        title="Create a new listing"
      />
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.sectionTitle}>Upload Photos</Text>
          <View style={styles.imageRow}>
            <TouchableOpacity
              disabled={loading}
              style={styles.uploadContainer}
              onPress={uploadNewImage}>
              <View style={styles.uploadCircle}>
                <Text style={styles.uploadPlus}>+</Text>
              </View>
            </TouchableOpacity>

            {images?.map(image => (
              <View style={styles.imageContainer} key={image?.fileName}>
                <Image style={styles.image} source={{uri: image?.uri}} />
                <Pressable hitSlop={20} onPress={() => onDeleteImage(image)}>
                  <Image
                    style={styles.delete}
                    source={require('../../../assets/remove.png')}
                  />
                </Pressable>
              </View>
            ))}

            {loading ? <ActivityIndicator /> : null}
          </View>

          <Input
            placeholder="Listing Title"
            label="Title"
            value={values.title}
            onChangeText={value => onChange(value, 'title')}
          />
          <Input
            placeholder="Select the category"
            label="Category"
            type="picker"
            value={values.category}
            onChangeText={value => onChange(value, 'category')}
            options={categories}
          />
          <Input
            placeholder="Enter price in CAD"
            label="Price"
            value={values.price}
            onChangeText={value => onChange(value, 'price')}
            keyboardType="numeric"
          />
          <Input
            style={styles.textarea}
            placeholder="Tell us more..."
            label="Description"
            value={values.description}
            onChangeText={value => onChange(value, 'description')}
            multiline
          />
        </KeyboardAvoidingView>

        <Button title="Submit" style={styles.button} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(CreateListing);
