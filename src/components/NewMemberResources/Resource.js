import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, SafeAreaView, Text} from 'react-native';
import CustomButton from '../common/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import { WebView } from 'react-native-webview';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

let item = 0;
const Resource = ({route, navigation}) => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const ids = route.params.ids;
    const [currentVideo, setCurrentVideo] = useState(route.params.uri);
    var videos = route.params.videos;
    
    
    var answers = []
    var obj = {};

    
    const sendResults  = async(id, array) => {

        fetch('https://church.aftjdigital.com/api/assessment'+id+'/validate', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              // 'Authorization': `bearer ${accessToken}`,
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({
              
              payload:array
            
            })
          })
          .then((response) => response.json())
          .then((responseJson) =>{
              console.log("Res:" + JSON.stringify(responseJson));
             
          })
          .catch((error) => {
            console.log("error:" + error);
             
            alert(error)
        });


    }
            
    async function getData(id) {

        try {
            
            
            let response = await fetch('https://church.aftjdigital.com/api/retrieve/'+id+'/assessment');
            let json = await response.json();
            console.log('json: '+json.data);
            var questionsandanswers = json.data;

            var i; var num = 0;
            for (i = 0; i < json.data.length; i++) {
                
                num = num + 1;
                questionsandanswers[i]["num"] = num;
                // Object.assign(questionsandanswers[i], {num: ++i});
                console.log('works: '+JSON.stringify(questionsandanswers[i]));
                
            }
    
            setData(questionsandanswers);
            setLoading(false);
        } catch (error) {
          
          if (error.message == 'Network request failed'){
             Toast.show('Internet Connection Error', Toast.LONG);
          }
        }
    };


    useEffect(() => {
        getData(route.params.id);
      
    }, []);


    const submit = () => {
        
        var array = [];
        var answer = { };
        
        var i = 0;
        for (i = 0; i < Object.keys(obj).length; i++) {

            answer = {"questionId:": Object.keys(obj)[i], "answer": obj[Object.keys(obj)[0]]};
            array.push(answer);
            
        }
        sendResults(ids[item], array);
        console.log('array: '+JSON.stringify(array));
        if (item === (ids.length - 1)){

            
            navigation.navigate('NM-Confirmation');
            return;
            
        }else{

            console.log('anwer: '+ JSON.stringify(array));
            console.log(item);
            item = item + 1;
            
            getData(ids[item]);
            // setQuestionNums();

            var index = videos.indexOf(currentVideo) +  1;
            setCurrentVideo(videos[index]);

            
        }

        obj = [];
       
        
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
       
        
        return (
          <View>

            <Text style={{...styles.question, marginTop:15}}>Question {item.num} : {item.question}</Text>
                <View style={styles.option}>
                    <CheckBox
                        value={isSelected1}
                        
                        onValueChange={(newValue) => {
                            setSelection1(newValue);
                            if(newValue === true) {
                                setSelection2(false);
                                setSelection3(false);
                                setSelection4(false);

                                obj[item.id] = "option1";
                                console.log('obj: '+JSON.stringify(obj));
                                
                                answers.push('optionA');
                                
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

                                obj[item.id] = "option2";
                                console.log('obj: '+JSON.stringify(obj));
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

                                obj[item.id] = "option3";
                                console.log('obj: '+JSON.stringify(obj));
                            }
                            if (!newValue){
                                setSelection3(true);
                            }
                        }}
                        style={styles.checkbox}
                        />
                    <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option3}</Text>

                </View>
                <View style={{...styles.option, marginBottom:10}}>
                    <CheckBox
                        value={isSelected4}
                        onValueChange={(newValue) => {
                            setSelection4(newValue);
                            if(newValue) {
                                setSelection1(false);
                                setSelection2(false);
                                setSelection3(false);

                                obj[item.id] = "option4";
                                console.log('obj: '+JSON.stringify(obj));
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
        return <View>

            <View
                style={{
                height: 1,
                width: '100%',
                marginTop:20,
                marginBottom:20,
                backgroundColor: '#CED0CE',
                }}
            />  
            <CustomButton onPress={() => submit()} buttonStyle={
                { width:'100%', 
                marginTop:20,
                marginBottom:40
                }}>Submit</CustomButton>

        </View>
              
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
                        data={data}
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