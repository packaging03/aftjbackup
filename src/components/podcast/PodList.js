import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
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
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

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
  const [song, setSong] = useState(data);
  const [spinner, setSpinner] = useState(false);
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
                    {item.artist}
                  </Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default PodList;

const styles = StyleSheet.create({});
