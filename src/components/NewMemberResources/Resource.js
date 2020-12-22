import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, SafeAreaView, Text} from 'react-native';
import CustomButton from '../common/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import { WebView } from 'react-native-webview';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Resource = ({route, navigation}) => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const ids = useState(route.params.ids);
    const [currentVideo, setCurrentVideo] = useState(route.params.uri);
    var videos = route.params.videos;
    
    const [questionsandanswers, setQuestionsAndAnswers] = useState(data);
    var item = 0;
    var answers = []

    
            
    const getData = async (id) => {

        try {
            
            let response = await fetch('https://church.aftjdigital.com/api/retrieve/'+id+'/assessment');
            let json = await response.json();
            // console.log(json.data.length);
            setData(json.data);
            setLoading(false);
            
            console.log('number: '+ids);
            // console.log('number: '+questionsandanswers[0]);
            
        setLoading(false);
        } catch (error) {
          
          if (error.message == 'Network request failed'){
             Toast.show('Internet Connection Error', Toast.LONG);
          }
        }
    };


    const setQuestionNums = () => {

        var questionsandanswers = data;
        var i; var num = 0;
        for (i = 0; i < questionsandanswers.length; i++) {
            // console.log('hi');
            num = num + 1;
            questionsandanswers[i]["num"] = num;
            // Object.assign(questionsandanswers[i], {num: ++i});
            console.log('works: '+JSON.stringify(questionsandanswers[i]));
            
        }

        setQuestionsAndAnswers(questionsandanswers);
    }
    useEffect(() => {
        getData(route.params.id);
        setQuestionNums();

        
        // console.log('id: '+ids.findIndex(2))
        //function to show auth alert call
       
    }, []);

    const submit = () => {
        // alert('');
        // getData(ids.findIndex(2));
        if (item === ids[ids.length - 1]); 
        {
            navigation.navigate('NM-Confirmation');
            return;
        }
        item = item + 1;
        
        getData(ids[item]);
        setQuestionNums();

        var index = videos.indexOf(currentVideo) +  1;
        setCurrentVideo(videos[index]);
        // 
    }
        
    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#CED0CE',
              marginLeft: '1%',
            }}
          />
        );
      };

      const Item = ({item}) => {
        const [isSelected1, setSelection1] = useState(false);
        const [isSelected2, setSelection2] = useState(false);
        const [isSelected3, setSelection3] = useState(false);
        const [isSelected4, setSelection4] = useState(false);
       
        console.log('ids: '+videos);
        
        return (
          <View>

            <Text style={styles.question}>Question {item.num} : {item.question}</Text>
                <View style={styles.option}>
                    <CheckBox
                        value={isSelected1}
                        
                        onValueChange={(newValue) => {
                            setSelection1(newValue);
                            if(newValue === true) {
                                setSelection2(false);
                                setSelection3(false);
                                setSelection4(false);

                                answers.push('optionA');
                                console.log('newvalue:'+answers);
                            }
                            if (!isSelected1){
                                setSelection1(true);

                            }
                            console.log('newvalue:'+newValue);
                        }}
                        style={styles.checkbox}
                        />
                    <Text 
                    style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option1}</Text>

                </View>
                <View style={styles.option}>
                    <CheckBox
                        value={isSelected2}
                        onValueChange={(newValue) => {
                            setSelection2(newValue)
                            console.log('newvalue:'+newValue);
                            if( newValue) {
                                setSelection4(false);
                                setSelection3(false);
                                setSelection1(false);
                            }
                            if (!newValue){
                                setSelection2(true);
                            }
                        }}
                        style={styles.checkbox}
                        />
                    <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option2}</Text>

                </View>
                <View style={styles.option}>
                    <CheckBox
                        value={isSelected3}
                        onValueChange={(newValue) => {
                            setSelection3(newValue);
                            if(newValue) {
                                setSelection1(false);
                                setSelection2(false);
                                setSelection4(false);
                            }
                            if (!newValue){
                                setSelection3(true);
                            }
                        }}
                        style={styles.checkbox}
                        />
                    <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option3}</Text>

                </View>
                <View style={styles.option}>
                    <CheckBox
                        value={isSelected4}
                        onValueChange={(newValue) => {
                            setSelection4(newValue);
                            if(newValue) {
                                setSelection1(false);
                                setSelection2(false);
                                setSelection3(false);
                            }
                            if (!newValue){
                                setSelection4(true);
                            }
                        }}
                        style={styles.checkbox}
                        />
                    <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option4}</Text>

                </View>
          </View>
      )}

      const renderItem = ({item}) => (
        <Item
          item={item}
          
        />
      );

      const getHeader = () => {
        return  <View>
        <Text style={{
                   fontFamily:'Nunito',
                   fontWeight:'400',
                   marginLeft:16,
                   fontSize:16, marginBottom:8}}>Assessment</Text>
               <Text style={styles.text}>Please take this assessment test when you are done with</Text>
               <Text style={styles.text}>this Session in other for you to move to the next Session</Text>
               <View
                   style={{
                   height: 1,
                   width: '100%',
                   marginTop:20,
                   marginBottom:20,
                   backgroundColor: '#CED0CE',
                   }}
               />

   </View>
       
       
    };

    const getFooter = () => {
        return <CustomButton onPress={() => submit()} buttonStyle={
            { width:'100%', 
            marginTop:20,
            marginBottom:40
            }}>Submit</CustomButton>
    }

 

    return(

        <View style={{flex:1, backgroundColor:'white', paddingTop:20}}>

                <View style={{
                    backgroundColor:'white', 
                    height:200, 
                    borderColor:'white', 
                    borderWidth:0, 
                    margin:15, 
                    alignItems:'center',
                    borderRadius:6}}>
                <WebView
                     containerStyle={styles.video}
                     allowsFullscreenVideo
                     allowsInlineMediaPlayback
                     cacheEnabled
                     
                     style={{backgroundColor: 'transparent',  borderWidth:0, marginLeft: -20, marginRight: -20}}
                     source={{uri: currentVideo}}
                     />
                <View style={{
                    width:'99.5%', 
                    alignSelf:'center', 
                    position:'absolute', 
                    bottom:0,  flexDirection:'row', height:50}}>
                    <View style={{
                        backgroundColor:'#000', 
                        width:'99.5%',
                        position:'absolute', 
                        bottom:0, 
                        borderBottomLeftRadius:6, 
                        borderBottomRightRadius:6, 
                        padding:10,
                        zIndex:-1,
                         
                        zIndex:10, 
                        opacity:0.7, 
                        height:50}}/>
                        <Icon style={{position:'absolute',  alignSelf:'center', zIndex:10, right:10}}  name="chevron-forward-outline" size={30} color="white"/>
                        <Icon style={{position:'absolute', alignSelf:'center', zIndex:10,  left:'45%'}} name="play" size={30} color="red"/>
                        <Icon  style={{position:'absolute',  alignSelf:'center', zIndex:10, left:10}}   name="chevron-back-outline" size={30} color="white"/>
                    
                </View>
                </View>

                
                <View style={{flex:1}}>

                   
                    {isLoading ? (
                    <ActivityIndicator size="large" style={{marginTop: 50}} />
                    ) : (
                    <FlatList
                        data={questionsandanswers}
                        ItemSeparatorComponent={renderSeparator}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        ListHeaderComponent={getHeader}
                        ListFooterComponent={getFooter}
                    />
                    )}

                    
                </View>

                
        </View>
    )

}

const styles = {

    option:{
       marginLeft:16,
       display:'flex',
       flexDirection:'row',
       justifyContent:'flex-start',
       marginTop:16,
       
    },
    checkbox: {
        alignSelf: "flex-start",
        marginTop:-8,
        opacity:0.9,
      },
    question:{
        fontFamily:'Nunito',
        fontWeight:'400',
        marginLeft:16,
        fontSize:14,
        marginBottom:8,
        marginLeft:16,
        marginTop:10,
    },
    text:{
        fontFamily:'Nunito-Light',
        fontSize:12,
        lineHeight:16,
        letterSpacing:0.5,
        color:'#000',
        marginLeft:16,
    },
    video: {
       
        height: 200,
        overflow:'hidden',
        borderWidth: 1,
        width: '100%',
        backgroundColor:'black',
        borderColor:'white',
        borderRadius: 6,
        zIndex:-1,

         },
}

export default Resource;