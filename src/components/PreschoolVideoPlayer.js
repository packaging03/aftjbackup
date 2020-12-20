import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import YouTube from 'react-native-youtube';
import Spinner from './common/Spinner';

export default function PreschoolVideoPlayer({navigation, route}) {
    const {videoLink, videoTitle} = route.params;
    const [isready, setIsReady] = useState(false);
    {{navigation.setOptions({title:videoTitle})}}
    return (
        <View style = {{backgroundColor:'#fff'}}>
            <YouTube 
                    style={styles.video}
                    key='AIzaSyB1K6hMGSyf1jznInofqdrP3turp5TzvxI'
                    apiKey='AIzaSyB1K6hMGSyf1jznInofqdrP3turp5TzvxI'
                    videoId={videoLink}
                    fullscreen ={true}
                    play={true}
                    loop={true}
                    
                    />
            
            
           
        </View>
    )
}

const styles = StyleSheet.create({ video:{height: '100%', 
    alignSelf: 'stretch',
     width: '100%'}, })
