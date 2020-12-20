import React from 'react';

import {TouchableOpacity, Text, View, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Congratulations = props => {
  const {info} = props;
  return (
    <View style={{margin: '6%'}}>
      <View style={styles.CircleShapeView}>
        <Icon
          name="ios-checkmark-sharp"
          size={100}
          color={'#3ACC6C'}
          styles={styles.icon}
        />
      </View>

      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.details}>{info}</Text>
    </View>
  );
};

export const PasswordField = ({
  onChangeText,
  title,
  onPress,
  otherStyles,
  togleSecrete,
  value,
  onBlur,
}) => (
  <View style={styles.textBoxContainer}>
    <TextInput
      placeholderTextColor="black"
      style={{
        fontFamily: 'Nunito-Regular',
        width: '100%',
        color: 'black',
        fontWeight: '900',
        fontSize: 16,
        lineHeight: 22,
      }}
      onChangeText={onChangeText}
      value={value}
      placeholder={title}
      secureTextEntry={togleSecrete}
      onBlur={onBlur}
    />
    <TouchableOpacity style={styles.touachableButton} onPress={onPress}>
      <Icon
        name={togleSecrete ? 'eye-off-outline' : 'eye-outline'}
        size={20}
        style={styles.buttonImage}
        color={'#C4C4C4'}
      />
    </TouchableOpacity>

    <View
      style={{
        backgroundColor: '#a2a2a2',
        width: '100%',
        height: 0.9,
        position: 'absolute',
        top: '40%',
        marginTop: 17,
      }}
    />
  </View>
);

const styles = {
  CircleShapeView: {
    width: 170,
    height: 170,
    borderRadius: 200 / 2,
    borderColor: '#3ACC6C',
    borderWidth: 4,
    alignSelf: 'center',
    alignItems: 'center',
    padding: '8%',
  },
  tick: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsText: {
    marginTop: '10%',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 25,
    fontWeight: '600',
    alignSelf: 'center',
    fontFamily: 'Nunito-Regular',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 25,
    color: '#000',
    textAlign: 'center',
  },
  details: {
    marginBottom: '20%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    textAlign: 'center',
    lineHeight: 19,
    fontSize: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  textBox: {
    fontSize: 20,
    alignSelf: 'stretch',
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    borderWidth: 1,
    paddingVertical: 0,
  },
  touachableButton: {
    position: 'absolute',
    right: -8,
    height: 40,
    width: 35,
    padding: 5,
  },
  buttonImage: {
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  icon: {
    alignSelf: 'center',
  },
};
