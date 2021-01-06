import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  Footer,
} from 'native-base';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
const {width, height} = Dimensions.get('window');
const data = [
  {
    title: 'Death Bed',
    artist: 'Powfu',
    artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
    url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
    id: '1',
  },
  {
    title: 'Bad Liar',
    artist: 'Imagine Dragons',
    artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
    url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
    id: '2',
  },
  {
    title: 'Faded',
    artist: 'Alan Walker',
    artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
    url: 'https://samplesongs.netlify.app/Faded.mp3',
    id: '3',
  },
  {
    title: 'Hate Me',
    artist: 'Ellie Goulding',
    artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
    url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
    id: '4',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
    url: 'https://samplesongs.netlify.app/Solo.mp3',
    id: '5',
  },
  {
    title: 'Without Me',
    artist: 'Halsey',
    artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
    url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
    id: '6',
  },
];

const PodList = ({navigation}) => {
  const [song, setSong] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [playing, setPlaying] = useState('');
  const _handleItemID = async id => {
    let podID = JSON.stringify(id);
    await AsyncStorage.setItem('podID', podID, e => {
      setSpinner(true);
      if (e === null) {
        setTimeout(() => {
          setSpinner(false);
          navigation.navigate('podcast');
        }, 2000);
      } else {
        setSpinner(false);
        console.log('Error message from AsyncStorage: ' + e);
      }
    });
    console.log(id);
  };

  useEffect(() => {
    getIsPlaying();

    return () => {
      _remAsync();
    };
  }, []);

  useEffect(() => {
    getSongs();
    return () => {};
  }, []);

  const getIsPlaying = async () => {
    await AsyncStorage.getItem('isSetPlay', (e, res) => {
      console.log(e);
      if (!e) {
        console.log(res);

        setPlaying(res);
        console.log(res + ' podcaslist');
      }
    });
  };
  const _remAsync = async () => {
    await AsyncStorage.removeItem('isSetPlay');
    setPlaying('');
  };

  const getSongs = async () => {
    try {
      let res = await fetch('https://church.aftjdigital.com/api/all_podcast');
      let json = await res.json();
      if (json.status === 'success') {
        console.log(json.Podcasts);
        setSong(json.Podcasts);
      }
    } catch (e) {
      console.log(e);
      if (e.message == 'Network request failed') {
        Toast.show('Internet Connection Error', Toast.LONG);
      }
    }
  };
  return (
    <Container>
      <Spinner
        visible={spinner}
        textContent={'Processing...'}
        textStyle={{color: '#fff'}}
      />
      <Content>
        <List>
          {song.map(item => {
            return (
              <ListItem
                key={item.id}
                thumbnail
                onPress={() => {
                  _handleItemID(item.id);
                }}>
                <Left>
                  <Thumbnail square source={{uri: item.artwork}} />
                </Left>
                <Body>
                  <Text>{item.title}</Text>
                  <Text note numberOfLines={1}>
                    {item.poster}
                  </Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>03:23</Text>
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
      {playing === 'playing' ? (
        <View
          style={{
            width,
            height: 50,
            backgroundColor: '#ffffff',
            elevation: 8,
            // paddingLeft: 20,
            // paddingRight: 20,
            // display: 'none',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 40, height: 40, marginRight: 10}}
            source={{
              uri: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
            }}
          />
          <View style={{marginRight: 90}}>
            <Text style={{fontFamily: 'Nunito-Bold'}}>
              Focus on the important
            </Text>
            <Text style={{fontFamily: 'Nunito-Regular'}}>Pastor Peter</Text>
          </View>
          <Icon name="play-circle-fill" size={30} color="#000000" />
        </View>
      ) : null}
    </Container>
  );
};

export default PodList;

const styles = StyleSheet.create({});
