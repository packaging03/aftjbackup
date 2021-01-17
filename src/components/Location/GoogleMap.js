import React, {useEffect, useState} from 'react';

import {StyleSheet, View, Dimensions, PermissionsAndroid} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import CurrentLocationButton from './CurrentLocationButton';
import RNReverseGeocode from '@kiwicom/react-native-reverse-geocode';
import AsyncStorage from '@react-native-community/async-storage';
import {Spinner} from 'native-base';

const {height, width} = Dimensions.get('window');

export default function GoogleMap({side}) {
  const [GrantedPermission, setGrantedPermission] = useState(false);
  const [chee, setChee] = useState(false);
  const [cord, setCord] = useState();

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'AFTj needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          setGrantedPermission(true);
          getOneTimeLocation();
          setInterval(() => {
            setChee(true);
          }, 7000);
        } else {
          alert('Permission Denied');
        }
      } catch (err) {
        alert('err', err);
      }
    };

    const RNRgeo = async () => {
      try {
        const region = {
          latitude: 33.87508419258687,
          longitude: -84.6397579,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        const searchText = 'JCCI GLORY TABERNACLE';

        RNReverseGeocode.searchForLocations(searchText, region, (err, res) => {
          storeAddress(res[0].address);
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    RNRgeo();
    requestLocationPermission();
  }, [GrantedPermission]);

  const storeAddress = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('address', jsonValue);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const dataCord = {
          latitude: 33.874620973209886,
          longitude: -84.63951113948264,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setCord(dataCord);
      },
      error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View style={styles.mapView}>
      <CurrentLocationButton open={side} />
      {chee === false ? (
        <Spinner size={30} />
      ) : (
        <MapView
          initialRegion={cord}
          // zoomControlEnabled
          showsBuildings
          showsTraffic
          provider={PROVIDER_GOOGLE}
          style={styles.maping}>
          <Marker
            coordinate={{
              latitude: 33.8745141,
              longitude: -84.63975789999999,
            }}
            title={'JCCI GLORY TABERNACLE'}
            // description={'You are welcom'}
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,

    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    height: 200,
    // marginTop: ,
  },
  maping: {
    ...StyleSheet.absoluteFillObject,
  },
  iconArrow: {
    zIndex: 2,
    position: 'absolute',
    shadowRadius: 5,
    left: 15,
    top: 10,
    // justifyContent: "space-around",
    // alignItems: "center",
  },
});
