import React, {useState} from 'react';
import {FlatList, Image, View, Dimensions} from 'react-native';
import {styles} from './styles';

const {width} = Dimensions.get('window');

const ImageCarousel = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollEnd = e => {
    const horizontalOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(horizontalOffset / width);
    setActiveIndex(index);
  };

  const renderImage = ({item}) => {
    return <Image style={styles.image} source={{uri: item}} />;
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        style={styles.list}
        data={images}
        renderItem={renderImage}
        onMomentumScrollEnd={handleScrollEnd}
      />
      <View style={styles.pagination}>
        {images?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationLine,
              index === activeIndex ? styles.activeLine : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default React.memo(ImageCarousel);
