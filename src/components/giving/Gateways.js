import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Container} from 'native-base';
import {Switch} from 'react-native-paper';
const {height, width} = Dimensions.get('window');
import PayPal from 'react-native-paypal-gateway';
import {GooglePay} from 'react-native-google-pay';
import {ApplePay} from 'react-native-apay';
import {useNavigation} from '@react-navigation/native';
import {GooglePay} from 'react-native-google-pay';
import {ApplePay} from 'react-native-apay';
import {useNavigation} from '@react-navigation/native';
// import {
//   requestOneTimePayment,
//   requestBillingAgreement,
// } from 'react-native-paypal';

// import {uuid} from 'uuidv4';

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
// import PaymentRequest from 'react-native-payments';
import PayPal from 'react-native-paypal-gateway';

// sq0idp-lREoTP6sgS5hXFGUBICUFQ => app_id

const Gateways = ({route}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState({
    nonce: '',
    payerId: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState(route.params.amount);
  const [expiration, setExpiration] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [BTN, setBTN] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const navigation = useNavigation();

  const gatewayRequestData = {
    cardPaymentMethod: {
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        gateway: 'square',
        gatewayMerchantId: 'L183EDXAE37FC',
        // L183EDXAE37FC= locationid => merchant id
      },
      allowedCardNetworks,
      allowedCardAuthMethods,
    },
    transaction: {
      totalPrice: '123',
      totalPriceStatus: 'FINAL',
      currencyCode: 'USD',
    },
    merchantName: 'Example Merchant',
  };

  const requestDataIOS = {
    merchantIdentifier: 'merchant.com.example',
    supportedNetworks: ['mastercard', 'visa'],
    countryCode: 'US',
    currencyCode: 'USD',
    paymentSummaryItems: [
      {
        label: 'AFTj church',
        amount: `${route.params.amount}`,
      },
    ],
  };

  const _handleIOSPay = () => {
    if (ApplePay.canMakePayments) {
      ApplePay.requestPayment(requestDataIOS).then(paymentData => {
        console.log(paymentData);
        // Simulate a request to the gateway
        setTimeout(() => {
          // Show status to user ApplePay.SUCCESS || ApplePay.FAILURE
          ApplePay.complete(ApplePay.SUCCESS).then(() => {
            Alert.alert('completed');
            // do something
          });
        }, 1000);
      });
    } else {
      Alert.alert(
        'Ooops!',
        'Apple pay is not available , you do not meet the payment requirements.',
      );
    }
  };
  useEffect(() => {
    // tokenC();
    return () => {};
  }, []);

  const tokenC = async () => {
    try {
      const res = await fetch(
        'https://braintree-sample-merchant.herokuapp.com/client_token',
      );
      let json = await res.json();
      console.log(json.client_token);
      setToken(json.client_token);
    } catch (e) {
      if (e.message === 'Network request failed') {
        Alert.alert('Please connect to the internet ');
      }
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
      setBTN(true);
    }

    return () => {};
  }, []);

  const _handleGPay = () => {
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods).then(
      ready => {
        if (ready) {
          console.log('ready');
          GooglePay.requestPayment(gatewayRequestData)
            .then(handleSuccess)
            .catch(handleError);
        } else {
          Alert.alert(
            'Ooops!',
            'Google pay is not supported by the current device or browser for your specific payment method.',
          );
        }
      },
    );

    console.log('clicked_Gpay');
  };


  const handleSuccess = async token => {
    // Send a token to your payment gateway
    Alert.alert('Success', `token: ${token}`);
  };

  const handleError = error => {
    Alert.alert('Error', `${error.code}\n${error.message}`);
  };

  // paypal=============================================================

  const _handlePayWithPayPal = () => {
    try {
      PayPal.initialize(
        PayPal.NO_NETWORK,
        'AU3lEA5_gSXn7EQiHcYN73adepQ4sv9RaUmImkBgBRap04kdl_7imWAgrcZG70lWTgDOqZFQLOcuIwJ8',
      );
      PayPal.pay({
        price: amount,
        currency: 'USD',
        description: 'tithe',
      })
        .then(confirm => {
          console.log('pay success', confirm);
          navigation.navigate('paySuccess');
          // setIsVisible(false)
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
    // requestOneTimePayment(token, {
    //   amount: '12',
    //   currency: 'USD',
    //   localeCode: 'en_US',
    //   // shippingAddressRequired: false,
    //   // userAction: 'commit',
    //   // intent: 'authorize',
    //   // // MerchantID: '',
    // })
    //   .then(da => {
    //     setSuccess(da);
    //     console.log(da);
    //   })
    //   .then(() => setError(''))
    //   .catch(err => {
    //     console.log(err.message);
    //     setError(err.message);
    //   });
    // console.log(success);
  };

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
          <Pressable
            onPress={_handleIOSPay}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                marginHorizontal: '6%',
              },
              styles.press,
            ]}>
            <Image
              source={require('../../assets/applePay.png')}
              style={{width: 49, height: 20}}
            />
          </Pressable>
          {/* ======================================================================== */}
          <Pressable
            onPress={_handlePayWithPayPal}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                marginHorizontal: 12,
              },
              styles.press,
            ]}>
            <Image
              source={require('../../assets/PayPal-Logo.wine.png')}
              style={{width: 80, height: 50}}
            />
          </Pressable>
          {/* ================================================================================== */}
          {!BTN ? null : (
            <Pressable
              onPress={_handleGPay}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                  width: 90,
                  justifyContent: 'center',
                  height: 48,
                  alignItems: 'center',
                  borderRadius: 10,
                  marginHorizontal: 14,
                  elevation: 7,
                },
              ]}>
              <Image
                source={require('../../assets/Gpay.png')}
                style={{width: 49, height: 20}}
              />
            </Pressable>
          )}
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
    // backgroundColor: '#fff',
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
