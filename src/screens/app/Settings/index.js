import React, {useState} from 'react';
import {Image, Linking, Pressable, ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';
import ListItem from '../../../components/ListItem';
import EditableBox from '../../../components/EditableBox';
import Button from '../../../components/Button';

const Settings = ({navigation}) => {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    name: 'Valeriu Bahov',
    email: 'example@example.com',
  });

  const onItemPress = () => {
    // simple redirect
    Linking.openURL('https://google.com');
  };

  const onEditPress = () => {
    setEditing(true);
  };

  const onSave = () => {
    setEditing(false);
  };

  const onChange = (key, value) => {
    setValues(v => ({...v, [key]: value}));
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Header showBack onBackPress={goBack} title="Settings" />

      <ScrollView style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Pressable onPress={onEditPress}>
            <Image
              style={styles.icon}
              source={require('../../../assets/edit.png')}
            />
          </Pressable>
        </View>

        <EditableBox
          label="Name"
          onChangeText={name => onChange('name', name)}
          value={values.name}
          editable={editing}
        />
        <EditableBox
          label="Email"
          onChangeText={email => onChange('email', email)}
          value={values.email}
          editable={editing}
        />
        {editing ? (
          <Button style={styles.button} onPress={onSave} title="Save" />
        ) : null}

        <Text style={[styles.sectionTitle, {marginTop: 40}]}>Help</Text>
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
