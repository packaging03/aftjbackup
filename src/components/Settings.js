import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Settings({navigation}) {
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const toggleLocation = () =>
    setLocationEnabled(previousState => !previousState);

  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <StatusBar backgroundColor="transparent" translucent />

      <TouchableOpacity onPress={() => navigation.navigate('AboutApp')}>
        <View style={styles.setting}>
          <Icon style={styles.icon} name="info" color={'#000'} size={23} />
          <Text style={styles.text}>About App</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.line} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Notification settings')}>
        <View style={styles.setting}>
          <Icon
            style={styles.icon}
            name="notifications"
            color={'#000'}
            size={23}
          />
          <Text style={styles.text}>Notification</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.line} />

      <TouchableOpacity onPress={() => navigation.navigate('Help')}>
        <View style={styles.setting}>
          <Icon style={styles.icon} name="help" color={'#000'} size={23} />
          <Text style={styles.text}>Help</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.line} />

      <TouchableOpacity onPress={() => navigation.navigate('Privacy settings')}>
        <View style={styles.setting}>
          <Image style={styles.icon} source={require('../assets/key.png')} />
          <Text style={styles.text}>Privacy</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.line} />

      <View style={{display: 'flex', flexDirection: 'row', margin: 15}}>
        {isLocationEnabled ? (
          <Icon
            style={styles.icon}
            name="location-on"
            color={'green'}
            size={23}
          />
        ) : (
          <Icon
            style={styles.icon}
            name="location-off"
            color={'black'}
            size={23}
          />
        )}

        <Text style={styles.text}>Location</Text>
        <Switch
          trackColor={{false: '#000', true: '#000'}}
          thumbColor={isLocationEnabled ? '#fff' : '#f4ff3f4'}
          ios_backgroundColor="black"
          onValueChange={toggleLocation}
          value={isLocationEnabled}
          style={{alignSelf: 'flex-end'}}
        />
      </View>

      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: 'black',
    opacity: 0.3,
  },
  setting: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginRight: 20,
    opacity: 0.9,
  },
  text: {
    fontSize: 14,
    width: '65%',
    fontFamily: 'Nunito-ExtraLight',
  },
});
