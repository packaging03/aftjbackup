import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const Answers = ({route}) => {
  const {title, body} = route.params;
  return (
    <View style={{padding: 16, backgroundColor: '#fff', height: '100%'}}>
      <StatusBar backgroundColor="transparent" translucent />
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <View style={{...styles.line, marginBottom: 10}} />
      <Text style={{...styles.header2, marginTop: 10, marginBottom: 20}}>
        {title}
      </Text>
      <Text style={styles.header2}>Answer</Text>
      <Text style={styles.itemText}>{body}</Text>
    </View>
  );
};

const styles = {
  header: {
    fontSize: 14,
    letterSpacing: 0.4,
    marginBottom: 4,
    fontFamily: 'Nunito-Bold',
    fontWeight: 'bold',
    lineHeight: 16,
  },
  header2: {
    fontSize: 14,
    letterSpacing: 0.4,
    marginBottom: 4,
    fontFamily: 'Nunito-Regular',
    lineHeight: 16,
  },
  header1: {
    fontSize: 12,
    letterSpacing: 0.4,
    marginBottom: 4,
    fontFamily: 'Nunito-Bold',
    fontWeight: '600',
  },

  line: {
    width: '100%',
    height: 0.4,
    backgroundColor: '#c5cad2',
    marginTop: 10,
  },
  itemText: {
    textAlign: 'left',
    marginTop: 20,
    color: '#000',
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
  },
};

export default Answers;
