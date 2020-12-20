import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, FlatList, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Help = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getFaqs = async () => {
    try {
      let response = await fetch('https://church.aftjdigital.com/api/faqs');
      let json = await response.json();
      console.log(json);
      setData(json);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFaqs();
  }, []);

  const Item = ({question, answer, onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <TouchableOpacity>
        <Text style={styles.itemText}>{question}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <Item
      question={item.title}
      answer={item.body}
      onPress={() =>
        navigation.navigate('Answers', {title: item.title, body: item.body})
      }
    />
  );
  return (
    <View style={styles.help}>
      <StatusBar backgroundColor="transparent" translucent />
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <View style={styles.line} />

      {isLoading ? (
        <ActivityIndicator style={{alignSelf: 'center', marginTop: 30}} />
      ) : (
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.line} />}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = {
  help: {
    padding: 16,
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Nunito-Regular',
    lineHeight: 16,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#c5cad2',
    marginTop: 20,
  },
  itemText: {
    textAlign: 'left',
    marginTop: 20,
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Nunito-Medium',
    textTransform: 'capitalize',
  },
};

export default Help;
