import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Share} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default function ShareMemoryVerse({route, navigation}) {
  const {title, details} = route.params;

  const shareMemoryverse = async () => {
    try {
      const result = await Share.share({
        message: title + ' ' + details,
        title: 'Share memory verse',
      });
    } catch (error) {
      alert(error.message);
    }
  };
  function customHeaderTitle() {
    return (
      <View style={styles.headerContainer}>
        <Text style={{color: '#fff', fontSize: 22, fontWeight: '500'}}>
          Share Memory Verse
        </Text>

        <TouchableOpacity onPress={() => shareMemoryverse()}>
          <Icon name="ios-share-social-outline" color="#ffffff" size={34} />
        </TouchableOpacity>
      </View>
    );
  }
  {
    {
      navigation.setOptions({headerTitle: customHeaderTitle});
    }
  }
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: '#fff',
        height: '100%',
      }}>
      <Text
        style={{
          fontSize: 22,

          margin: 10,
          color: '#191C52',
          fontWeight: '600',
          fontFamily: 'Poppins',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginLeft: 10,
          marginRight: 10,

          color: '#191C52',
          fontFamily: 'Poppins',
          fontWeight: '500',
          textAlign: 'justify',
          lineHeight: 20,
        }}>
        {details}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
