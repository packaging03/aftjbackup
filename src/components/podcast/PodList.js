import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const PodList = ({navigation}) => {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate('podcast')}>
        <Text>pETER</Text>
      </Pressable>
    </View>
  );
};

export default PodList;

const styles = StyleSheet.create({});
