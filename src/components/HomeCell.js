import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import CustomButton from '../components/common/CustomButton';
import {Card} from 'react-native-elements';
import {TextInput} from 'react-native-gesture-handler';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
// import {RadioButton} from 'react-native-paper';
import CustomInput from '../components/common/CustomInput';
import CButton from '../components/common/CustomButton';

radio_props = [{label: 'Yes', value: 0}, {label: 'No', value: 1}];

export default function HomeCell() {
  const [checkMember, setMember] = useState('Yes');
  const [checkMarried, setMarried] = useState(0);
  const [checkHaveChildren, setHaveChildren] = useState('Yes');
  const [checkNumberofChildren, setNumberOfChildren] = useState(0);
  const radio_props_children = [
    {label: '1', value: 0},
    {label: '2', value: 1},
    {label: '3', value: 2},
    {label: '4', value: 3},
    {label: '5', value: 4},
    {label: '6 and more', value: 5},
  ];

  const Married = value => {
    setMarried(value);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={require('../assets/homecell.png')}
            /*source={{
              uri:
                'https://s3-alpha-sig.figma.com/img/03a4/708d/aea2904aef50891726f515c3cce806ad?Expires=1604275200&Signature=hyxMjD1CH1ppQ377q28YuMAJ0-C6U3cy8G-cFVWdTrIZCmKfb5SNoaZT5de8tiNgVyVpJYRRvzqWWUXI00Wsim2ft8YwkD7QrWPKIVowjG4gs8Okc6IbHHAEDLVxuccst2Tu5dNFWJB3Np4df8U-mrTYdHXFuqfqQgHzkS9vZ0JkjzZcJkq3vN11LenCAUgfoSgKHUK30t0AAH6Aok6FusWQn1K-m7buxm5O9FZzzWTl9zRsRTK14ugwqd6R~7vck5nwuDMBeyQUqMXG8bou782dl66syFd6UPEzZkENPiSNyUaIqPfWuR6LlLtTWdTOucAZL3mINePqQgp5JXIa2w__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
            }}*/
            style={styles.img}
          />
        </View>

        <Text style={styles.title}>Home Cell</Text>
        <Text style={styles.description}>
          Home cell is a vital part Jubilee Christian Church Int’l. This is
          because it is the best way you can connect to others with the passion
          in the church. {'\n\n'} Each home cell group is a healthy community of
          people, expressing what they believe, exploiting their faith together
          and developing friendship. {'\n\n'} Most of the home cell group meet
          at least once a month. If you want to plug into any of the life group,
          register below.
        </Text>
        <View style={{alignSelf: 'baseline', alignItems: 'baseline'}}>
          <Text style={styles.otherText}>FILL THE FORM BELLOW</Text>
        </View>
        <View style={styles.card1}>
          <View style={styles.card}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <CustomInput title="Enter Your Full Name" />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <CustomInput
              keyboardType="email-address"
              title="Enter Email Address"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Contact Number</Text>
            <CustomInput
              keyboardType="phone-pad"
              title="Enter Contact Number"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Home Address</Text>
            <CustomInput
             
              title="Enter Home Address"
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>
              Are you a member of Jubilee Christian Church Int'l?
            </Text>

            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonSize={10}
              buttonColor={'#000'}
              buttonInnerColor={'#000'}
              backgroundColor={'#000'}
              borderColor={'#000'}
              shadowColor={'#000'}
              buttonOuterColor={'#000'}
              selectedButtonColor={'#000'}
              buttonOuterSize={19}
              onPress={() => {}}
              style={{marginTop: 10}}
              animation={true}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.inputLabel}>Are you married?</Text>

            <RadioForm
              radio_props={radio_props}
              formHorizontal={false}
              labelHorizontal={true}
              buttonSize={10}
              initial={0}
              buttonColor={'#000'}
              buttonInnerColor={'#000'}
              backgroundColor={'#000'}
              borderColor={'#000'}
              shadowColor={'#000'}
              buttonOuterColor={'#000'}
              selectedButtonColor={'#000'}
              buttonOuterSize={19}
              onPress={value => {
                Married(value);
              }}
              style={{marginTop: 10}}
              animation={true}
            />
          </View>
          {checkMarried === 0 ? (
            <View style={styles.innercontainer}>
              <View style={styles.card}>
                <Text style={styles.inputLabel}>Spouse Name</Text>
                <CustomInput title="Your spouse Name" />
              </View>
              <View style={styles.card}>
                <Text style={styles.inputLabel}>Do you have children?</Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={false}
                  labelHorizontal={true}
                  buttonSize={10}
                  buttonColor={'#000'}
                  buttonInnerColor={'#000'} //#191C52
                  backgroundColor={'#000'}
                  borderColor={'#000'}
                  shadowColor={'#000'}
                  buttonOuterColor={'#000'}
                  selectedButtonColor={'#000'}
                  buttonOuterSize={19}
                  onPress={() => {}}
                  style={{marginTop: 10}}
                  animation={true}
                />
              </View>
              <View style={styles.card}>
                <Text styel={styles.inputLabel}>
                  How many children do you have?
                </Text>
                <RadioForm
                  radio_props={radio_props_children}
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
                  onPress={() => {}}
                  style={{marginTop: 10}}
                  animation={true}
                />
              </View>
              <CustomButton 
          
         
          buttonStyle={{ width:'60%', marginRight:-20, marginTop:40, alignSelf:'flex-end', marginBottom:20}}>
            SUBMIT</CustomButton>
            </View>
          ) : (
            <CustomButton 
          
            
            buttonStyle={{ width:'60%', marginRight:-20, marginTop:40, alignSelf:'flex-end', marginBottom:20}}>
              SUBMIT</CustomButton>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    display: 'flex',
    marginRight: 20,
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
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
    borderRadius: 5,
    borderColor: 'black',

    borderWidth: 0.4,

    shadowOpacity: 0.1,
    elevation: 1,
  },
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  innercontainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  description: {
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'Nunito',
    fontSize:12,
    letterSpacing: 0.5,
    lineHeight: 22,
    textAlign: 'justify',
  },
  img: {
    height: 150,
    width: '100%',
    opacity: 1,
    borderRadius: 10,
  },
  inputLabel: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight:'400',
    lineHeight:24,
    letterSpacing:0.5
  },
  imgContainer: {
    width: '94%',
    alignSelf: 'center',
    marginTop: 20,
    height: 150,
    borderRadius:10,
    overflow:'hidden'
  },
  otherText: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Nunito',
    alignSelf: 'baseline',
    lineHeight:32,
    fontSize: 16,
  },
  title: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20,
    fontFamily: 'Nunito',
    color: 'black',
    fontSize: 20,
    lineHeight:24,
    fontWeight: '600',
    letterSpacing: 0.5,
    alignSelf: 'baseline',
  },
});
