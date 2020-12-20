import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GenerateQRBulletin() {
  const [qrvalue, setQrvalue] = useState(getBulletin);

  const getBulletin = () => {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    var date = new Date().getDate();
    var month = monthNames[new Date().getMonth()];
    var year = new Date().getFullYear();
    const today =
      'AFTj Church Bulletin ::' + date + ' ' + month + ', ' + year + '.';
    setQrvalue(today);
  };

  useEffect(() => {
    getBulletin();
  }, [1]);
  return (
    <View style={styles.container}>
      <QRCode
        value={qrvalue ? qrvalue : 'NA'}
        size={200}
        color="#000"
        backgroundColor="white"
        logo={require('../assets/aftjlogo.png')}
        logoSize={20}
        logoMargin={1}
        logoBorderRadius={1}
        logoBackgroundColor="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
});
