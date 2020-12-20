import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Doodle from '../components/Doodles';
import QRcodeScannerBulletin from '../components/QRcodeScannerBulletin';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import GenerateQRBulletin from '../components/GenerateQRBulletin';

const Tab = createBottomTabNavigator();

export default function BulletinQr({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.caption}>
        Scan the QR Code or Click to have access to our Bulletin
      </Text>

      <View style={styles.tabs}>
        <Tab.Navigator
          activeColor="#000"
          inactiveColor="#000"
          labeled={true}
          tabBarOptions={{
            showLabel: true,
            activeTintColor: '#2F80ED',
            indicatorStyle: {backgroundColor: 'blue', width: '50%'},
          }}>
          <Tab.Screen
            name="ScanQRcode"
            component={QRcodeScannerBulletin}
            options={{
              headerStyle: {fontFamily: 'Nunito-Regular'},
              tabBarLabel: 'Scan a QR Code',
              tabBarIcon: ({focused, color}) =>
                focused ? (
                  <Icon name="md-camera-outline" color={color} size={28} />
                ) : (
                  <Icon name="md-camera-outline" color={color} size={27} />
                ),
            }}
          />
          <Tab.Screen
            name="ShowQRcode"
            component={GenerateQRBulletin}
            options={{
              headerStyle: {fontFamily: 'Nunito-Regular', fontSize: 14},
              tabBarLabel: 'Show My QR code',
              tabBarIcon: ({focused, color}) =>
                focused ? (
                  <Iconn name="qrcode-scan" color={color} size={28} />
                ) : (
                  <Iconn name="qrcode-scan" color={color} size={27} />
                ),
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  tabs: {
    flex: 1,
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '2%',
    marginBottom: '20%',
    backgroundColor: '#fff',
  },
  caption: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    margin: '5%',
  },
});
