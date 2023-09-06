import React from 'react';
import {Linking, ScrollView, Text} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';

const Settings = () => {
  const onItemPress = () => {
    // simple redirect
    Linking.openURL('https://google.com');
  };

  return (
    <SafeAreaView>
      <Header title="Settings" />

      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Help</Text>
        <ListItem onPress={onItemPress} style={styles.item} title="FAQ" />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Contact Us"
        />
        <ListItem
          onPress={onItemPress}
          style={styles.item}
          title="Privacy & Terms"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Settings);
