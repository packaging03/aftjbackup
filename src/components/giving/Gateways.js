import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Container} from 'native-base';
import {Switch} from 'react-native-paper';
const {height, width} = Dimensions.get('window');

const Gateways = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const _handlingCardNumber = number => {
    const num = number
      .replace(/\s?/g, '')
      .replace(/(\d{4})/g, '$1  ')
      .trim();
    setCardNumber(num);
    // console.log(cardNumber);
    console.log(num);
  };
  const _handlingCardExpiry = text => {
    if (text.indexOf('.') >= 0 || text.length > 5) {
      return;
    }

    if (text.length === 2 && expiration.length === 1) {
      text += '/';
    }
    setExpiration(text);
    console.log(text);
  };
  const _handlingCardName = text => {
    setCardName(text);
    // console.log(cardName); issue with state update
    console.log(text);
  };
  const _handlingCardCVV = text => {
    setCVV(text);
    // console.log(cvv);
    console.log(text);
  };
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    console.log(isSwitchOn);
  };
  return (
    <Container>
      <Text
        style={{
          textAlign: 'center',
          top: width / 14,
          fontFamily: 'Nunito-Bold',
          fontSize: 23,
          marginBottom: 30,
        }}>
        Payment Data
      </Text>
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          // backgroundColor: '#f1f1f1',
          height,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Nunito-Regular',
            marginTop: 20,
            marginBottom: 10,
          }}>
          Payment Method
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.press}>
            <Image
              source={require('../../assets/applePay.png')}
              style={{width: 49, height: 20}}
            />
          </Pressable>
          {/* ======================================================================== */}
          <Pressable style={{...styles.press, marginHorizontal: 12}}>
            <Image
              source={require('../../assets/PayPal-Logo.wine.png')}
              style={{width: 80, height: 50}}
            />
          </Pressable>
          {/* ================================================================================== */}
          <Pressable
            style={{
              backgroundColor: '#fff',
              width: 90,
              justifyContent: 'center',
              height: 48,
              alignItems: 'center',
              borderRadius: 10,
              marginHorizontal: 14,
              elevation: 7,
            }}>
            <Image
              source={require('../../assets/Gpay.png')}
              style={{width: 49, height: 20}}
            />
          </Pressable>
        </View>

        <View style={{marginTop: 30}}>
          <Text style={{fontFamily: 'Nunito-Regular', fontSize: 18}}>
            Card Number
          </Text>

          {/* <CreditCardDisplay
            number={555}
            cvc={123}
            expiration="04/21"
            name="John J. Doe"
            since="2004"
          /> */}
          <TextInput
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={text => _handlingCardNumber(text)}
            keyboardType="number-pad"
            style={styles.longTextInput}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              // backgroundColor: '#133',
            }}>
            <View>
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 18,
                  fontFamily: 'Nunito-Regular',
                }}>
                Expiry Date
              </Text>
              <TextInput
                style={styles.expiInput}
                onChangeText={text => _handlingCardExpiry(text)}
                placeholder="MM/YY"
                keyboardType="numeric"
                value={expiration}
              />
            </View>
            <View>
              <Text
                style={{
                  marginHorizontal: width / 9,
                  marginBottom: 10,
                  fontSize: 18,
                  fontFamily: 'Nunito-Regular',
                }}>
                CVV
              </Text>
              <TextInput
                style={styles.cvv}
                onChangeText={text => _handlingCardCVV(text)}
                placeholder="CVV"
                keyboardType="numeric"
                value={cvv}
              />
            </View>
          </View>
          {/* ------------------------------------------------------------------------- */}
          <Text
            style={{
              fontFamily: 'Nunito-Regular',
              fontSize: 18,
              marginTop: 20,
            }}>
            Card Holder
          </Text>
          <TextInput
            placeholder="Card Holder"
            value={cardName}
            onChangeText={text => _handlingCardName(text)}
            keyboardType="default"
            style={styles.longTextInput}
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 25}}>
          <Text style={{fontFamily: 'Nunito-Regular', fontSize: 16}}>
            Save Card for future Payments
          </Text>
          <Switch
            style={{marginHorizontal: 63}}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            color="green"
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('paySuccess')}
          style={{
            alignSelf: 'center',
            height: 45,
            width: width / 2 + 60,
            backgroundColor: '#c5cad2',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Nunito-Bold',
            }}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Gateways;

const styles = StyleSheet.create({
  press: {
    backgroundColor: '#fff',
    width: 90,
    justifyContent: 'center',
    height: 48,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 12,
    elevation: 7,
  },
  longTextInput: {
    width: width - 40,
    height: 40,

    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 10,
  },
  expiInput: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: width / 3 + 20,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  cvv: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: width / 3 + 20,
    marginHorizontal: width / 9,
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
  },
});
