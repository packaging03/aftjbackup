import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {dataArray} from '../components/common/searchToAllPages';
import {dataArray2} from '../components/common/searchObject';
import {connect} from 'react-redux';

const SearchAllPages = ({navigation, accessToken}) => {
  const [data, setData] = useState(
    dataArray.sort((a, b) => (a.value > b.value ? 1 : -1)),
  );
  const [data2, setData2] = useState(dataArray2);
  const [query, setQuery] = useState('');
  const [recentVisits, setRecentVisits] = useState();

  useEffect(() => {
    if (accessToken == null) {
      alert('Please Login to access some features of this page');
    } else {
      fetch('https://church.aftjdigital.com/api/get/pages', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          let value = JSON.stringify(responseJson.data);
          console.log(value);
          setRecentVisits(value);
        })
        .catch(error => {
          alert(error);
        });
    }
  });

  const updateSearch = text => {
    setQuery(text);

    let textData;
    const newData = data.filter(item => {
      const itemData = `${item.value.toUpperCase()}`;

      textData = text.toUpperCase();

      return itemData.indexOf(textData) == 0;
    });

    if (textData) {
      setData(newData);
    } else {
      setData(dataArray);
    }
  };

  const getItem = item => {
    fetch('https://church.aftjdigital.com/api/add/page/' + item.value, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let value = JSON.stringify(responseJson.data);
        console.log(value);
        setRecentVisits(value);
      })
      .catch(error => {
        alert(error);
      });

    navigation.navigate(data2[item.id.toString()]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.searchSection}>
        <View style={styles.input}>
          <TextInput
            style={{fontSize: 16}}
            placeholder="Search"
            onChangeText={text => updateSearch(text)}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
        </View>

        <Text style={{marginLeft: '3%', marginTop: '2%', marginBottom: '2%'}}>
          Recent Pages
        </Text>
        <View style={styles.recentPages}>
          {/* <View style={styles.pages}>
            <Text>
              {recentVisits
                ? JSON.parse(recentVisits)[2]
                : () => {
                    alert('Please check your internet connection or reload');
                  }}
            </Text>
          </View> */}
          <View style={styles.pages}>
            <Text>
              {recentVisits
                ? JSON.parse(recentVisits)[1]
                : () => {
                    alert('Please check your internet connection or reload');
                  }}
            </Text>
          </View>
          <View style={styles.pages}>
            <Text>
              {recentVisits
                ? JSON.parse(recentVisits)[0]
                : () => {
                    alert('Please check your internet connection or reload');
                  }}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          paddingHorizontal: 5,
          paddingVertical: 5,
          marginTop: '2%',
        }}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                alignSelf: 'center',
                marginLeft: '5%',
              }}>
              <TouchableOpacity onPress={() => getItem(item)}>
                <Text
                  onPress={() => getItem(item)}
                  style={{
                    fontSize: 17,
                    fontFamily: 'Nunito-ExtraLight',
                    fontSize: 14,
                  }}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.4,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: 1,
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '5%',
    paddingLeft: '3%',
  },

  searchSection: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    height: '25%',
    elevation: 4,
  },

  recentPages: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  pages: {
    backgroundColor: '#c5cad2',
    height: 30,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
});

export default connect(mapStateToProps)(SearchAllPages);
