import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Picker,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CustomInput from './common/CustomInput';
import CustomButton from './common/CustomButton';
import {Dimensions} from 'react-native';
// import {Dropdown} from 'react-native-material-dropdown';

radio_props = [{label: 'Yes', value: 0}, {label: 'No', value: 1}];
const win = Dimensions.get('window');
const NewMember = () => {
  const onPress = () => {};
  const [selectedValue, setSelectedValue] = useState(
    'How did you hear about us?',
  );
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.newMember}>
        <Image
          style={styles.topImgStyle}
          source={require('../assets/newmembers.png')}
        />

        <Text style={styles.title}>
          Welcome to Jubilee Christian Church Int'l
        </Text>
        <Text style={styles.description}>
          We are very delighted to have you here, our team would love to serve
          you and help you get connected
        </Text>
        <Text style={styles.otherText}>KINDLY FILL THE FORM BELOW</Text>
        <View style={styles.card1}>
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <CustomInput title="Enter Your Full Name  " />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <CustomInput title="Enter Your Email Address   " />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Contact Number</Text>
            <CustomInput title="Enter Your Contact Number   " />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Home Address</Text>
            <CustomInput title="Enter Your Home Address   " />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>
              Have you visited our Church before?
            </Text>

            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonSize={10}
              buttonColor={'#191C52'}
              buttonInnerColor={'#191C52'}
              backgroundColor={'#191C52'}
              borderColor={'#191C52'}
              shadowColor={'#191C52'}
              buttonOuterColor={'#191C52'}
              selectedButtonColor={'#191C52'}
              buttonOuterSize={19}
              onPress={onPress}
              style={{marginTop: 10}}
              animation={true}
              // onPress={(value) => {this.setState({value:value})}}
            />
          </View>

          <View style={styles.card}>
            {/* <Text style={styles.inputLabel}>How did you hear about us?</Text>
          <CustomInput title="Enter Your Answer" /> */}
            <Picker
              selectedValue={selectedValue}
              style={{width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item
                label="How did you hear about us?"
                value="How did you hear about us?"
              />
              <Picker.Item label="Search Engine" value="Search Engine" />
              <Picker.Item label="Google Ads" value="Google Ads" />
              <Picker.Item label="Facebook Ads" value="Facebook Ads" />
              <Picker.Item label="Youtube Ads" value="Youtube Ads" />
              <Picker.Item
                label="Facebook post/group"
                value="Facebook post/group"
              />
              <Picker.Item label="Twitter post" value="Twitter post" />
              <Picker.Item
                label="Instagram post/story"
                value="Instagram post/story"
              />
              <Picker.Item
                label="Other social media"
                value="Other social media"
              />
              <Picker.Item label="Email" value="Email" />
              <Picker.Item label="Email" value="Radio" />
              <Picker.Item label="TV" value="TV" />
              <Picker.Item label="Newspaper" value="Newspaper" />
              <Picker.Item label="Word of mouth" value="Word of mouth" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>
              Anything you would like us to pray with you about?
            </Text>
            <CustomInput title="Enter Your Prayer Request  " />
          </View>
        </View>
        <View
          style={{
            alignSelf: 'flex-end',
            marginRight: -10,
            width: 220,
            flex: 1,
            marginTop: 20,
            marginBottom: 100,
            display: 'flex',
          }}>
          <CustomButton>Submit</CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  inputLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
  },
  title: {
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20,
    marginTop: 10,
    fontFamily: 'Nunito-Regular',
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 28,
    textAlign: 'justify',
  },
  description: {
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'Nunito-Regular',
    letterSpacing: 0.9,
    lineHeight: 20,
    fontSize: 12,
    textAlign: 'justify',
  },
  otherText: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Nunito-Regular',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 32,
  },
  card: {
    width: '100%',
    display: 'flex',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  card1: {
    width: '90%',
    display: 'flex',
    marginLeft: 20,
    marginTop: 15,
    marginRight: 20,
    flexDirection: 'column',
    padding: 15,
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderColor: '#000',

    borderWidth: 0.4,
    shadowColor: {width: 0, height: 5},
    shadowOpacity: 0.1,
    elevation: 1,
  },
  newMmeber: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imgContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 150,
    backgroundColor: '#fff',
  },

  topImgStyle: {
    width: '90%',
    marginTop: 20,
    margin: 10,
    height: 130,
    alignSelf: 'center',
  },
};

export default NewMember;
