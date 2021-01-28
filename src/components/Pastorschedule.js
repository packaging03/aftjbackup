import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconn from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Pastorschedule({navigation}) {
  const [dataSet, setData] = useState([]);
  const [loading, setIsloading] = useState(false);
  const [value, setValue] = useState('');
  const [changed, setChanged] = useState('');
  const [cardBackgroundColor, setCardbackground] = useState('#FF0100');

  const PastorEvent = props => {
    const {title, venue, date, time, host} = props;
    const changeBackground = () => {
      var ColorCode =
        'rgb(' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ')';
      return ColorCode;
    };
    const bgcol = changeBackground();
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: bgcol,
          borderRadius: 5,
          padding: '1%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'space-between',
            alignItems: 'stretch',
            flex: 1,
          }}>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontFamily: 'Nunito-Regular',
              fontWeight: '600',
              fontSize: 14,
              lineHeight: 16,
              textTransform: 'capitalize',
              marginTop: '5%',
              marginLeft: '3%',
            }}>
            {title}
          </Text>
          <Text
            style={{
              alignSelf: 'flex-end',
              fontFamily: 'Nunito-Regular',
              fontWeight: '600',
              fontSize: 14,
              lineHeight: 16,
              marginTop: '5%',
              marginLeft: '23%',
            }}>
            {date}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontFamily: 'Nunito-Regular',
              fontWeight: '600',
              fontSize: 12,
              lineHeight: 14,
              marginLeft: '3%',
            }}>
            {time}
          </Text>
          <Image
            style={{
              borderRadius: 4,
              height: 60,
              width: 60,
              resizeMode: 'contain',
              flex: 0.5,
              position: 'absolute',
              left: '73%',
              top: -6,
            }}
            source={require('../assets/ppth.jpg')}
          />
        </View>
        <Text
          style={{
            marginTop: '8%',
            marginLeft: '3%',
            fontFamily: 'Nunito-Regular',
            fontWeight: '600',
            fontSize: 14,
            lineHeight: 16,
          }}>
          Venue
        </Text>
        <Text
          style={{
            marginLeft: '3%',
            fontFamily: 'Nunito-Regular',
            fontWeight: '600',
            fontSize: 12,
            lineHeight: 14,
            textTransform: 'capitalize',
          }}>
          {venue}
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: '73%',
            top: '83%',
            fontFamily: 'Nunito-Regular',
            fontWeight: '600',
            fontSize: 12,
            lineHeight: 14,
            textTransform: 'capitalize',
          }}>
          {host}
        </Text>
      </View>
    );
  };

  const fetchData = async () => {
    try {
      let response = await fetch(
        'https://church.aftjdigital.com/api/pastor-schedule',
      );
      let responseJson = await response.json();

      setData(responseJson['data']);
      console.log(responseJson['data']);
      console.log(dataSet);
      setChanged(!changed);
    } catch (error) {}
  };

  {
    {
      navigation.setOptions({
        headerRight: () => (
          <View style={styles.iconContainer}>
      <TouchableOpacity 
       onPress={() => navigation.navigate('Bookappointment')}
      >
            <Iconn
              name="plussquareo"
              size={25}
              backgroundColor="#fff"
              color="#000"
              style={{marginLeft: 20}}
             
            />
      </TouchableOpacity>
      <TouchableOpacity
         onPress={() => navigation.navigate('Schedulecalendar')}
      >
            <IconM
              name="calendar-blank-outline"
              size={25}
              backgroundColor="#fff"
              color="#000"
              
            />
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, [2]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      {/* <Text onPress={() => navigation.navigate('Schedulecalendar')}>Heree</Text> */}

      <FlatList
        data={dataSet}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <PastorEvent
            venue={item.venue}
            date={item.event_date}
            time={item.event_time}
            host={item.host}
            title={item.title}
          />
        )}
        extraData={changed}
        ListHeaderComponent={() => {
          return (
            <View style={styles.searchView}>
              <Icon name="search" size={25} color={'#ccc'} />
              <TextInput
                onChangeText={value => {
                  setValue(value);
                  searchFilterFunction(value);
                }}
                value={value}
                style={{width: '100%', height: 50}}
                placeholder="Search"
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: '#fff',
  },
  searchView: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    marginBottom: 30,
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    margin: '10%',
    width: '100%',
    height: 124,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  card: {
    width: '100%',
    backgroundColor: '#f00767',
    margin: '2%',
    borderRadius: 5,
  },
  iconContainer: {
    width: '75%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:20
},
});
