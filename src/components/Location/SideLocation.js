import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Content} from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';

export default class SideLocation extends Component {
  state = {address: ''};
  componentDidMount = () => {
    this.getData();
  };
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('address');
      return jsonValue != null
        ? this.setState({address: JSON.parse(jsonValue)})
        : null;
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            width: width / 2 + 40,
            height: height / 3 - 40,
            backgroundColor: '#f1f1f1',
            alignSelf: 'center',
            elevation: 5,
            shadowRadius: 5,
            position: 'relative',
            top: 75,
            borderRadius: 10,
            padding: 15,
          }}>
          <Text style={{marginBottom: 10, fontSize: 18, marginTop: 5}}>
            5000 mi
          </Text>
          <Text style={{marginBottom: 10, fontSize: 18, marginTop: 5}}>
            {this.state.address}
          </Text>
        </View>

        <View style={[styles.container]}>
          <SimpleLineIcons
            name="arrow-right"
            color="#fff"
            size={20}
            onPress={this.props.close}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    position: 'absolute',
    height: 30,
    bottom: 13,

    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    // marginTop: height / 2 + 115,
  },
});
