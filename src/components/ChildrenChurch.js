import React from 'react';

import {View, ImageBackground, ScrollView, Text, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChildrenChurch = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.connect}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <TouchableOpacity
          style={styles.item} onPress={()=>navigation.navigate('PreSchool', {option:'Toddlers'})}>
          <View>
            <ImageBackground
              style={styles.img}
              imageStyle={styles.imgStyle}
              source={require('../assets/toddler-menu.jpg')}>
              <View style={styles.overlay} />
              <Text style={styles.text}>Toddlers </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('PreSchool', {option: 'Pre-school'})}>
          <View>
            <ImageBackground
              style={styles.img}
              imageStyle={styles.imgStyle}
              source={require('../assets/preeschool-menu.jpg')}>
              <View style={styles.overlay} />
              <Text style={styles.text}>Pre-school </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('KindergartenIntro',  {option: 'Kindergarten'})}>
          <View>
            <ImageBackground
              style={styles.img}
              imageStyle={styles.imgStyle}
              source={require('../assets/kindergaten-menu.jpg')}>
              <View style={styles.overlay} />
              <Text style={styles.text}>Kindergarten </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item} onPress={()=>navigation.navigate('Grade1', {title: 'Grade 1 - 2'})}>
          <View>
            <ImageBackground
              style={styles.img}
              imageStyle={styles.imgStyle}
              source={require('../assets/grade-one-two.jpg')}>
              <View style={styles.overlay} />
              <Text style={styles.text}>Grade 1st - 2nd </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item} onPress={()=>navigation.navigate('Grade1', {title: 'Grade 3 - 4'})}
          >
          <View>
            <ImageBackground
              style={styles.img}
              imageStyle={styles.imgStyle}
              source={require('../assets/grade-three-four.jpg')}>
              <View style={styles.overlay} />
              <Text style={styles.text}>Grade 3rd - 4th </Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default ChildrenChurch;

const styles = {
  connect: {
    width: '95%',
    height: '100%',
    marginLeft: 9,
  },
  item: {
    marginTop: 18,
  },

  img: {
    width: '100%',
    height: 100,
  },
  imgStyle: {
    resizeMode: 'cover',
    borderRadius: 5,
  },
  overlay: {
    width: '100%',
    height: 100,
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.4,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    zIndex: 10,
    fontWeight: '300',
    fontSize: 24,
    fontStyle:'italic',
    fontWeight:'bold',
    marginTop: 35,
    alignSelf: 'center',
  },
};
