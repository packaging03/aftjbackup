import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native-paper';

const Contacts = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [changed, ischanged] = useState(false);
  const [arrayholder, setArrayholder] = useState([]);
  const sortNames = [];

  const searchFilterFunction = text => {
    const newData = arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    arrangeNames(newData);
  };

  const getUsers = async () => {
    try {
      let response = await fetch('https://church.aftjdigital.com/api/users');
      let json = await response.json();

      arrangeNames(json);

      setArrayholder(json);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
    arrangeNames(data);
  }, [2]);

  const renderItem = ({item}) => (
    <View>
      <Text
        style={{
          fontSize: 16,
          textTransform: 'capitalize',
          marginTop: '3%',
          fontFamily: 'Nunito-Bold',
          marginBottom: '3%',
        }}>
        {item.later}
      </Text>
      <View
        style={{
          borderBottomColor: '#C4C4C4',
          borderBottomWidth: 1,
          marginTop: '2%',
          marginBottom: '2%',
        }}
      />
      <FlatList
        data={item.contacts}
        keyExtractor={item => item.email}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ContactDetails', {
                name: item.name,
                email: item.email,
                phone: item.phone,
              })
            }>
            <Text
              style={{
                marginTop: '1%',
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
                fontWeight: '400',
                marginBottom: '2%',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const arrangeNames = data => {
    const abcd = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const lstp = [];
    const glist = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < abcd.length; j++) {
        if (data[i].name.toUpperCase().startsWith(abcd[j].toUpperCase())) {
          if (lstp.includes(abcd[j])) {
          } else {
            lstp.push(abcd[j]);
          }
        }
      }
    }

    for (var x = 0; x < lstp.length; x++) {
      var y = 0;
      var contactss = [];

      while (y < data.length) {
        if (data[y].name.toUpperCase().startsWith(lstp[x].toUpperCase())) {
          contactss.push(data[y]);
        }
        y++;
      }
      glist.push({later: lstp[x], contacts: contactss});
    }

    setData(glist);
    if (glist.length < 1) {
      setLoading(true);
      ischanged(true);
    } else {
      setLoading(false);
    }
  };

  return (
    <View style={styles.contacts}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.searchView}>
        <Icon name="search" size={25} color={'#ccc'} />
        <TextInput
          onChangeText={value => {
            setValue(value);
            searchFilterFunction(value);
          }}
          value={value}
          style={{width: '100%', height: 50}}
          placeholder="Enter name to search"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator style={{alignSelf: 'center'}} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.later}
          extraData={changed}
        />
      )}
    </View>
  );
};

const styles = {
  contacts: {
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
};

export default Contacts;
