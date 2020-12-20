import React, {useState} from 'react';
import {View, Modal, Text, SafeAreaView} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const Location = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  return (
    <SafeAreaView>
      <View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                name="close"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setButtonVisible(!buttonVisible);
                }}
                color={'#000'}
                style={{position: 'absolute', top: 15, right: 15}}
                size={25}
              />

              <Text style={{marginBottom: 20}}>5000 mi</Text>
              <Text style={{textAlign: 'center'}}>
                3000 Macedonia Road, Powder Springs, G.A USA
              </Text>
            </View>
          </View>
        </Modal>

        <MapView
          key="AIzaSyASZZ81sDOHAEeNp_kIg4rtkURzdmV5YNM"
          provider={PROVIDER_GOOGLE}
          style={{
            height: '100%',

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          initialRegion={{
            latitude: 33.8745141,
            longitude: -84.6397579,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

          // region={{ latitude: 33.8745141,
          // longitude: -84.639779,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421 }}
          // showsUserLocation={true}
        >
          <Marker
            key={'AIzaSyASZZ81sDOHAEeNp_kIg4rtkURzdmV5YNM'}
            coordinate={{latitude: 33.8745141, longitude: -84.6397579}}
            title={'JCCI Glory Tabernacle'}
            description={'Rligious Organization'}
          />
        </MapView>
      </View>
      {/* <TouchableOpacity style={{backgroundColor:'red', height:100}} > */}
      {buttonVisible ? (
        <View style={styles.icon}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
              setButtonVisible(!buttonVisible);
            }}>
            <Icon
              style={{alignSelf: 'center'}}
              name="ios-arrow-back"
              color={'#fff'}
              size={30}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      {/* </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    bottom: 25,
    right: 4,
    backgroundColor: '#000',
  },
  modalView: {
    // margin: 20,
    height: '50%',
    width: '50%',
    // backgroundColor:"red",
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: '30%',
    marginRight: '8%',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    width: '100%',
    backgroundColor: '#191C52',
    borderRadius: 20,
    padding: 10,
    marginTop: '10%',
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 19,
  },
};

export default Location;
