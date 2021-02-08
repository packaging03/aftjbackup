import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import CustomButton from './common/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';
import { WebView } from 'react-native-webview';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';
import Button from '../components/common/PopButton';
import Dialog, {
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';

let item = 0;


const SchoolCurriculumQuiz = ({route, navigation}) => {
    const {videoLink, videoTitle, pageId} = route.params;
    //const {pageId} = route.params;
    console.log("pageId: " + pageId);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [isLoading, setLoading] = useState(true);
    var testresult = [];
    const [show, setShow] = useState(false);
    const [res, setRes] = useState(false);
    const closeIcon = '../assets/closebtn.png';

    var link = '';

    console.log("videoLink: " + videoLink);
    link = 'https://www.youtube.com/embed/' + videoLink;
    console.log("videoLink: " + link);
    
    var answers = []
    var obj = {};

    hideAlert = () => {
        setRes(true);
        setShow(false);
      };
            
    async function getData(id) {

        try {
            let response = await fetch('https://church.aftjdigital.com/api/retrieve/'+id+'/question');
            let json = await response.json();
            console.log('json: '+JSON.stringify(json.data));
            var questionsandanswers = json.data;

            var i; var num = 0;
            for (i = 0; i < json.data.length; i++) {
                
                num = num + 1;
                questionsandanswers[i]["num"] = num;
                
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
        getData(pageId);
    }, []);


    const submit = () => {
        
        var array = [];
        var answer = { };
        var rarray = [];
        testresult = [];
        
        if(Object.keys(obj).length < data.length){
            Toast.show("Please attempt all questions first",Toast.LONG);
            return;
        }
        var i = 0;
        for (i = 0; i < Object.keys(obj).length; i++) {

            answer = {"id": Object.keys(obj)[i], "answer": obj[Object.keys(obj)[0]]};
            array.push(answer);
            
        }
        rarray = [...array].reverse();
        var i = 0;
        for (i = 0; i < data.length; i++) {
            if(data[i].id == Number(rarray[i].id))
            {
                if(data[i].answer == rarray[i].answer)
                {
                    testresult.push(data[i].answer)
                }
            }
        }
        setAnswer(rarray);
        setResult(testresult);
        setShow(true);
        obj = [];
       
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
      
       function chk(idd)
       {
            var ares = answer[answer.findIndex(x => x.id == idd)]
            return ares.answer
       }

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
                                
                            }else{
                                setSelection1(true);
                                delete obj[item.id];
                                console.log('obj: '+JSON.stringify(obj));

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
                            if( newValue === true) {
                                setSelection4(false);
                                setSelection3(false);
                                setSelection1(false);

                                obj[item.id] = "option2";
                                console.log('obj: '+JSON.stringify(obj));
                            }else {
                                setSelection2(true);
                                delete obj[item.id];
                                console.log('obj: '+JSON.stringify(obj));
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
                            if(newValue === true) {
                                setSelection1(false);
                                setSelection2(false);
                                setSelection4(false);

                                obj[item.id] = "option3";
                                console.log('obj: '+JSON.stringify(obj));
                            }else {
                                setSelection3(true);
                                delete obj[item.id];
                                console.log('obj: '+JSON.stringify(obj));
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
                            if(newValue === true) {
                                setSelection1(false);
                                setSelection2(false);
                                setSelection3(false);

                                obj[item.id] = "option4";
                                console.log('obj: '+JSON.stringify(obj));
                            }else {
                                setSelection4(true);
                                delete obj[item.id];
                                console.log('obj: '+JSON.stringify(obj));
                            }
                        }}
                        style={styles.checkbox}
                        />
                    <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option4}</Text>

                </View>
          </View>
      )}

      const ResItem = ({item}) => {
        const [isSelected1, setSelection1] = useState(false);
        return (
          <View>
            <Text style={{...styles.question2, marginTop:15}}>Question {item.num} : {item.question}</Text>
                    <View style={styles.option}>
                        <View>
                            {(item.answer === "option1") ? (
                               <ImageBackground
                               style={styles.img}
                               source={require('../assets/correct.png')}
                             />
                                
                            ) : (
                                <View>
                                    {(chk(item.id) === "option1") ? (
                                        <ImageBackground
                                            style={styles.img}
                                            source={require('../assets/incorrect.png')}
                                        />
                                    ) : (
                                        
                                        <CheckBox
                                        value={isSelected1}
                                        style={styles.checkbox}
                                        />
                                    )}
                                </View>
                            )}
                        </View>
                    
                    <Text 
                    style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option1}</Text>

                    </View>
                    <View style={styles.option}>
                            <View>
                                {(item.answer === "option2") ? (
                                    <ImageBackground
                                        style={styles.img}
                                        source={require('../assets/correct.png')}
                                    />
                                ) : (

                                    <View>
                                    {(chk(item.id) === "option2") ? (
                                            <ImageBackground
                                            style={styles.img}
                                            source={require('../assets/incorrect.png')}
                                        />
                                    ) : (
                                        
                                        <CheckBox
                                        value={isSelected1}
                                        style={styles.checkbox}
                                        />
                                    )}
                                </View>
                                )}
                            </View>
                        <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option2}</Text>

                    </View>
                    <View style={styles.option}>
                            <View>
                                {(item.answer === "option3") ? (
                                        <ImageBackground
                                            style={styles.img}
                                            source={require('../assets/correct.png')}
                                        />
                                ) : (

                                    <View>
                                    {(chk(item.id) === "option3") ? (
                                            <ImageBackground
                                            style={styles.img}
                                            source={require('../assets/incorrect.png')}
                                        />
                                    ) : (
                                        <CheckBox
                                        value={isSelected1}
                                        style={styles.checkbox}
                                        />
                                    )}
                                </View>
                                )}
                            </View>
                        <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option3}</Text>

                    </View>
                    <View style={{...styles.option, marginBottom:10}}>
                            <View>
                                {(item.answer === "option4") ? (
                                    <ImageBackground
                                        style={styles.img}
                                        source={require('../assets/correct.png')}
                                    />
                                ) : (

                                    <View>
                                    {(chk(item.id) === "option4") ? (
                                            <ImageBackground
                                            style={styles.img}
                                            source={require('../assets/incorrect.png')}
                                        />
                                        
                                    ) : (
                                        
                                        <CheckBox
                                        value={isSelected1}
                                        style={styles.checkbox}
                                        />
                                    )}
                                </View>
                                )}
                            </View>
                        <Text style={{...styles.text, width:'85%', marginLeft:-1}}>{item.option4}</Text>

                    </View>
          </View>
      )}

      const renderItem = ({item}) => (
        <Item
          item={item}
        />
      );

      const renderResItem = ({item}) => (
        <ResItem
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
               <Text style={styles.text}>Please take this assessment test when you are done with
               this Session in other for you to move to the next Session</Text>
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

        <View style={{flex:1, backgroundColor:'white', paddingTop:10}}>

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
                     source={{uri: link}}
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
                    <View>
                            {!res ? (
                                <FlatList
                                    data={data}
                                    ItemSeparatorComponent={renderSeparator}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id.toString()}
                                    ListHeaderComponent={getHeader}
                                    ListFooterComponent={getFooter}
                                />
                            ) : (

                                <FlatList
                                    data={data}
                                    ItemSeparatorComponent={renderSeparator}
                                    renderItem={renderResItem}
                                    keyExtractor={item => item.id.toString()}
                                    ListHeaderComponent={getHeader}
                                    ListFooterComponent={getFooter}
                                />
                            )}
                        </View>
                    )}
                </View>

                
                <Dialog
            width={0.9}
            visible={show}
            rounded
            actionsBordered
            dialogStyle={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
            footer={
              <BlurView
                showBlur={false}
                blurType="light"
                show={show}
                blurAmount={8}
                reducedTransparencyFallbackColor="white">
                <DialogFooter>
                  <DialogButton
                    text=""
                    onPress={() => {
                        hideAlert();
                    }}
                    textStyle={{color: 'white'}}
                    key="button-2"
                  />
                  <View style={{
                      borderRadius: 5,
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        hideAlert();
                      }}>
                      <Button
                        text="Corrections"
                        onPress={() => {
                            hideAlert();
                        }}
                      />
                    </TouchableOpacity>
                   
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 20,
                        marginRight: 20,
                        width: '10%',
                        marginTop: -180,
                        alignSelf: 'flex-end',
                      }}>
                      <TouchableOpacity onPress={() => hideAlert()}>
                        <Image
                          source={require(closeIcon)}
                          style={{height: 10, width: 10}}
                        />
                      </TouchableOpacity>
                    </View>

                    

                    <Text
                      style={{
                        color: 'red',
                        marginTop: -120,
                        alignContent: 'center',
                        alignSelf: 'center',
                        lineHeight: 40,
                        fontSize: 30,
                      }}>
                      {result.length.toString() + "/" + data.length.toString()}
                    </Text>


                    <Text
                      style={{
                        color: 'white',
                        marginTop: -110,
                        alignContent: 'center',
                        alignSelf: 'center',
                        lineHeight: 40,
                        fontSize: 20,
                      }}>
                      Good Work!
                    </Text>
                  </View>

                </DialogFooter>
              </BlurView>
            }
          />
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
    checkbox2: {
        alignSelf: "flex-start",
        marginTop: -8,
        backgroundColor:'red',
        borderColor:'red',
        opacity:0.4,
        background: '',
        color: 'red',
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
    question2:{
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
        marginRight: 8,
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
    img: 
    {
        marginLeft: 10,
        paddingLeft: 20,
        width: 12,
        height: 12,
    },
}

export default SchoolCurriculumQuiz;