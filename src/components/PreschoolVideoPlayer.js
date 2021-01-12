import React,{useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import YouTube from 'react-native-youtube';
import Spinner from './common/Spinner';
import CButton from '../components/common/CustomButton';

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
                    fullscreen ={false}
                    play={true}
                    loop={false}
            />


            <TouchableOpacity onPress={()=>navigation.navigate('SchoolCurriculumQuiz')}> 
                <CButton
                    style={{marginBottom: 20}}
                    onPress={() => {
                            navigation.navigate('SchoolCurriculumQuiz')
                        } 
                    }>
                        View Assessment
                </CButton>
   
            </TouchableOpacity>
            
           
        </View>
    )
}

const styles = StyleSheet.create({ video:{height: '60%', //100%
    alignSelf: 'stretch',
     width: '100%',
    marginBottom: 160}, })
