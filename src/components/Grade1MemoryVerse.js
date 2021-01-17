
import React, {useState} from 'react';
import {View, Text, ScrollView, ImageBackground, Image,Picker,TextInput} from 'react-native';
import { Platform } from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CustomInput from './common/CustomInput';
import CustomButton from './common/CustomButton';
import { Dimensions } from 'react-native';
import { TouchableHighlight,TouchableOpacity,Button } from 'react-native';
import BoxedShare from './BoxedShare';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import Icono from 'react-native-vector-icons/FontAwesome';
radio_props = [{label: 'Yes', value: 0}, {label: 'No', value: 1}];
const win = Dimensions.get('window');
// const [backImg, setBackImg] = useState(
//     '../assets/back.png',
//   );
const Grade1MemoryVerse= ({navigation}) => {
  const [shouldShowShare, setShoulShowShare] = useState(false);

  const hideShare = () => {
    setShoulShowShare(false);
  };

  const showShare = () => {
    setShoulShowShare(true);
  };

  {{navigation.setOptions({
    headerRight: () => (
        <View style={styles.iconContainer2}>
          
          <Icon
            onPress={() => {
                if(!shouldShowShare){
                    showShare();
                }else{
                    hideShare();
                }
                
            }}
            size={30}
            name="share-social-outline"
          />

        <Icono
            size={30}
            style={{marginRight: 20}}
            name="plus-square-o"
            onPress={() => navigation.navigate('AddMemoryVerse')}
          />
          
        </View>
  ),})
}}
  return (

<View style={{height:'100%'}}>


      <ScrollView style={{marginBottom:40}}>
          
    <View>
        {/* <View style={styles.appBarparent}>

        <View style={styles.appBar}>
            <View style={{flexDirection:'row'}}>
            <TouchableHighlight 
            onPress={() => this.props.navigation.pop()}
            >
 <Image source = {require('../assets/backandroid.png')} style={{height:32,width:32}}/>
        
            </TouchableHighlight>
      <Text style={{justifyContent:'center',alignItems: 'center',marginLeft:12,fontSize:20}}>
         Memory Verse
        </Text>
            </View>
            <View style={{flexDirection:'row',marginRight:40}}>
        
            <TouchableOpacity
            onPress={() => {
              console.log('saw click ooo')
              shouldShowShare?
              setShoulShowShare(false)
              :
              setShoulShowShare(true)
            }}
            >
              
<Image source = {require('../assets/share_icon.png')} style={{height:32,width:32,marginRight:20}}/>
</TouchableOpacity>
        <Image source = {require('../assets/add_icon.png')} style={{height:32,width:32}}/>
   </View>
  
        </View>
        </View>
      */}
     
     <View style={{flexDirection:'column',marginTop:20,marginLeft:20}}>
     <Text style={{fontWeight:"bold",fontSize:17,marginTop:20}}>
   John 3:16
    </Text>
    {/* <Text style={{fontSize:13,marginTop:12}}>
   God's promise to Isaac
</Text> */}

<Text style={{fontSize:14,marginTop:10,marginRight:20, lineHeight: 25,}}>
For God so loved the world that he gave his only beggotten son that who so ever believeth in him will not perish but have everlasting life
</Text>

<Text style={{fontWeight:"bold",fontSize:17,marginTop:20}}>
  Genesis 1:1
    </Text>
    {/* <Text style={{fontSize:13,marginTop:12}}>
   God's promise to Isaac
</Text> */}

<Text style={{fontSize:14,marginTop:10,marginRight:20, lineHeight: 25,}}>
In the begining God created heaven and earth.</Text>
<Text style={{fontWeight:"bold",fontSize:17,marginTop:20}}>
   Psalm 136:6
    </Text>
    {/* <Text style={{fontSize:13,marginTop:12}}>
   God's promise to Isaac
</Text> */}

<Text style={{fontSize:14,marginTop:10,marginRight:20, lineHeight: 25,}}>
Give thanks to the Lord, for he is good.</Text>

<Text style={{fontWeight:"bold",fontSize:17,marginTop:20}}>
  Acts 16:31
    </Text>
    {/* <Text style={{fontSize:13,marginTop:12}}>
   God's promise to Isaac
</Text> */}

<Text style={{fontSize:14,marginTop:10,marginRight:20, lineHeight: 25,}}>
Believe on the Lord Jesus Christ and you shall be saved.
</Text>



     </View>
     
      </View>
    </ScrollView>
{
  shouldShowShare?
  <BoxedShare 
        WhatsappMessage="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons" 
        FacebookShareURL="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons" 
        FacebookShareMessage="This should contain the memory verse message" 
        TwitterShareURL="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons"
        TwitterShareMessage="This should contain the memory verse message" 
        TwitterViaAccount="ugurr_demirel" 
        NativeShareTitle="This should contain the memory verse message" 
        NativeShareMessage="This should contain the memory verse message" 
        NativeShareURL="https://github.com/ugurrdemirel/ReactNativeSocialShareButtons"
        />
  :

  <View style={styles.bottomView}>
  <View style={{width:50,height:50, borderRadius: 50/2,   shadowColor: '#000',
shadowOffset: { width: 1, height: 1 },
shadowOpacity:  0.4,
shadowRadius: 3,
elevation: 5,
borderBottomWidth:0.001,
alignItems:'center',
marginLeft:20
}}>
  <Image source = {require('../assets/prev_icon.png')} resizeMode={'contain'} style={{width:20,height:20,alignSelf:'center',alignContent:'center',marginTop:20,marginRight:5}}/>

  </View>
  <View style={{width:50,height:50, borderRadius: 50/2,   shadowColor: '#000',
shadowOffset: { width: 1, height: 1 },
shadowOpacity:  0.4,
shadowRadius: 3,
elevation: 5,
borderBottomWidth:0.001,
alignItems:'center',
marginLeft:20
}}>
  <Image source = {require('../assets/play_icon.png')} style={{width:15,height:15,alignSelf:'center',alignContent:'center',marginTop:22,marginLeft:5}}/>

  </View>
<View style={{width:50,height:50, borderRadius: 50/2, shadowColor: '#000',
shadowOffset: { width: 1, height: 1 },
shadowOpacity:  0.4,
shadowRadius: 3,
elevation: 5,
borderBottomWidth:0.001,
alignItems:'center',
marginRight:20
}}>
  <Image source = {require('../assets/next_icon.png')} resizeMode={'contain'} style={{width:20,height:20,alignSelf:'center',alignContent:'center',marginTop:20,marginLeft:5}}/>

  </View>
</View>


}

 </View>
  );
};

const styles = {
  inputLabel: {
    fontFamily: 'Poppins',
    fontSize: 18,
  },
  appBar: {
    flexDirection: 'row',
    marginTop:20,
    marginLeft:20,
    marginBottom:20,
    justifyContent:'space-between',
    alignItems:'stretch',
    width:'100%', 
    flex:1
    // borderWidth:0.5,
   

  },
  appBarparent: {
  
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
    borderBottomWidth:0.001
  },

  searchVStyle: {
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 6,
    height:40,
    marginTop:30,
    marginLeft:20,
    flexDirection:'row',
    flex:1
  },
  title: {
    marginLeft: 20,
    marginBottom: 10,
    marginRight: 20,
    marginTop:10,
    fontFamily: 'Poppins',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  description: {
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'Poppins',
    letterSpacing: 0.9,
    lineHeight: 20,
  },
  otherText: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Poppins',

    fontSize: 18,
  },
  card: {
    width: '100%',
    display: 'flex',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  card1: {
    width: '90%',
    display: 'flex',
    marginLeft: 20,
    marginTop: 15,
    marginRight: 20,
    flexDirection: 'column',
    padding: 15,
    alignItems: 'flex-start',
    marginBottom: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderColor: '#000',

    borderWidth: 0.4,
    shadowColor: {width: 0, height: 5},
    shadowOpacity: 0.1,
    elevation: 1,
  },
  newMmeber: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imgContainer: {
    width: '90%',
    alignSelf: 'center',
    height: 150,
    backgroundColor: '#fff',
  },
  img: {
    height: 150,
    resizeMode: 'stretch',
    opacity: 1,
  },
  topImgStyle: { 
    marginLeft:12, 
    marginEnd:12, 
    width: win.width, 
    marginTop:20,
    height: 130, 
   },
   bottomView: {
    width: '100%',
    height: 50,
   justifyContent:'space-between',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, 
    flexDirection:'row',
    marginBottom:30//Here is the trick
  },
  iconContainer2: {
    width: 105,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
},
};

export default Grade1MemoryVerse;


// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Image} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Tts from 'react-native-tts';
// import {connect} from 'react-redux';
// // user saved memory verse to be fetched from backend

// function Grade1MemoryVerse({navigation, accessToken, user}) {
//   const [data, setData] = useState([]);


//   const readMemoryVerse = async () => {
    
//     Tts.stop();
//     data.map((item, index) => {
      
//       Tts.speak(data[index]['title'] + '. ' + data[index]['body'], {
//         androidParams: {
//           KEY_PARAM_PAN: -1,
//           KEY_PARAM_VOLUME: 0.5,
//           KEY_PARAM_STREAM: 'STREAM_MUSIC',
//         },
//       });
//     })
//   };


//   const requestData = () => {
//     const url = 'https://church.aftjdigital.com/api/all-memoryverses';
//     const thisdata = [];
//     fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(res => res.json())
//       .then(res => {
//         var dat = [];
//         console.log(user);
//         for (var i = 0; i < res.length; i++) {
//           if (res[i]['user_id'] == JSON.parse(user).id) {
//             dat.push(res[i]);
//           }
//         }
//         setData(dat);
//       })
//       .catch(error => {
//         alert(error);
//       });
//   };
//   useEffect(() => {
//     requestData();
//   }, [1]);
//   function customHeaderTitle() {
//     return (
//       <View style={styles.headerContainer}>
//         <Text style={{color: '#000', fontSize: 20, fontFamily: 'frankruhllibre-Light'}}>
//           Memory Verses
//         </Text>
//       </View>
//     );
//   }

//   {
//     {
//       navigation.setOptions({headerTitle: customHeaderTitle});
//     }
//   }
  
  


//   return (
//     <View style={{backgroundColor: '#fff', height: '100%'}}>
//       <FlatList
//         data={data}
//         keyExtractor={item => item.created_at}
//         renderItem={({item}) => (
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               margin: 5,
//             }}>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('Share Memory Verse', {
//                   title: item.title,
//                   details: item.body,
//                 })
//               }>
//               <View style={{flexDirection: 'column'}}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     marginLeft: 10,
//                     color: '#000',
//                     fontWeight: '700',
//                     fontFamily: 'Nunito-Medium',
//                     lineHeight: 40,
//                   }}>
//                   {item.title}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     marginLeft: 10,
//                     color: '#000',
//                     fontFamily: 'Nunito-Regular',
//                     fontWeight: '400',
//                     textAlign: 'justify',
//                     lineHeight: 20,
//                   }}>
//                   {item.body}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//       <View style={styles.controlsView}>
//           <ImageBackground
//               style={{width: 45, display: 'flex'}}
//               source={require('../assets/backbtn.png')}
//             />
          
//             <TouchableOpacity style={{width: 55, display: 'flex'}} onPress={() => readMemoryVerse()}>
//             <ImageBackground
//               style={{width: 48, display: 'flex'}}
//               onPress={() => readMemoryVerse()}
//               source={require('../assets/playbtn.png')}
//             >
//               <Image onPress={() => readMemoryVerse()}
//               source={require('../assets/playbtn.png')}
//               />

//             </ImageBackground>
//             </TouchableOpacity>

//             <ImageBackground
//               style={{width: 45, display: 'flex'}}
//               source={require('../assets/rightbtn.png')}
//             />
//       </View>
//     </View>
//   );
// }

// const mapStateToProps = state => ({
//   accessToken: state.user.accessToken,
//   user: state.user.user,
// });

// export default connect(mapStateToProps)(Grade1MemoryVerse);

// const styles = StyleSheet.create({
//   controlsView: {
//     display: 'flex',
//     flexDirection: 'row',
//     width: '100%',
//     height: 50,
//     backgroundColor: '#fff',
//     justifyContent: 'space-between',
//     bottom: 0,
//   },

//   paddmeleft: {
//     alignSelf: 'flex-start',
//     marginLeft: 10,
//     width: 10,
//     height: 10,
//     display: 'flex',
//   },

//   paddmeright: {
//     alignSelf: 'flex-end',
//     display: 'flex',
//     marginRight: 10,
//   },

//   paddmecenter: {
//     alignItems: 'center',
//     alignSelf: 'center',
//     display: 'flex',
//   },

//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     fontFamily: 'frankruhllibre-regular',
//   },
// });
