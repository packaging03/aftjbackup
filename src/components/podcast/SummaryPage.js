import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Container, Content, Thumbnail} from 'native-base';
// import song from './data';
const song = [
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

const SummaryPage = () => {
  const [data, setData] = useState(song);
  const obj = data[0];
  return (
    <Container>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: obj.artwork}}
          style={{width: 160, height: 160, borderRadius: 10}}
        />
        <Text style={{fontSize: 18, fontFamily: 'Nunito-Bold', top: 10}}>
          Stay Focused As He Leads
        </Text>
        <Text style={{marginTop: 35}}>
          By: <Text>{obj.artist}</Text>
        </Text>
        <Text style={{marginTop: 10}}>
          Length: <Text>45 Mins 10 Seconds</Text>
        </Text>
      </View>
      <View style={{marginTop: 20, marginBottom: 10}}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 5,
          }}>
          Summary
        </Text>
      </View>
      <Content>
        <Text style={{paddingLeft: 30, paddingRight: 30}}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Text>
      </Content>
    </Container>
  );
};

export default SummaryPage;

const styles = StyleSheet.create({});
