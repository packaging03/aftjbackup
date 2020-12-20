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
import { TouchableHighlight } from 'react-native-gesture-handler';
// import {Dropdown} from 'react-native-material-dropdown';

radio_props = [{label: 'Yes', value: 0}, {label: 'No', value: 1}];
const win = Dimensions.get('window');
// const [backImg, setBackImg] = useState(
//     '../assets/back.png',
//   );
const DownloadNM = () => {
  const onPress = () => {};
  const [selectedValue, setSelectedValue] = useState(
    'How did you hear about us?',
  );
 
  const design = Platform.select({
    android: {
      header: true
    },
    ios: {
	  header: false
    },
  });

  const isAndroid = false;
  if(Platform.isAndroid){
    isAndroid = true;  
    setBackImg("../assets/backandroid.png");
}
  return (
      

      <ScrollView>
          
    <View>
        <View style={styles.appBarparent}>

        <View style={styles.appBar}>
            <TouchableHighlight 
            onPress={() => this.props.navigation.pop()}
            >
 <Image source = {require('../assets/backandroid.png')} style={{height:32,width:32}}/>
        
            </TouchableHighlight>
      <Text style={{justifyContent:'center',alignItems: 'center',marginLeft:12}}>
           Downloads
        </Text>
        </View>
        </View>
    
     {/* download items */}
     <View style={{marginTop:40,flexDirection:'row',alignItems: 'center'}}>
     <Image source = {require('../assets/dummydownload.png')} style={{height:60,width:100,marginLeft:20,borderRadius:8}}/>
     <Text style={{justifyContent:'center',alignItems: 'center',marginLeft:12}}>
           Keeping Faith in God
        </Text>
     </View>

     <View style={{marginTop:40,flexDirection:'row',alignItems: 'center'}}>
     <Image source = {require('../assets/dummydownload.png')} style={{height:60,width:100,marginLeft:20,borderRadius:8}}/>
     <Text style={{justifyContent:'center',alignItems: 'center',marginLeft:12}}>
           Practice of Faith (Pt 1)
        </Text>
     </View>


     <View style={{marginTop:40,flexDirection:'row',alignItems: 'center'}}>
     <Image source = {require('../assets/dummydownload.png')} style={{height:60,width:100,marginLeft:20,borderRadius:8}}/>
     <Text style={{justifyContent:'center',alignItems: 'center',marginLeft:12}}>
     Practice of Faith (Pt 2)
        </Text>
     </View>

     <View style={{marginTop:40,flexDirection:'row',alignItems: 'center'}}>
     <Image source = {require('../assets/dummydownload.png')} style={{height:60,width:100,marginLeft:20,borderRadius:8}}/>
     <Text style={{justifyContent:'center',alignItems: 'center',marginLeft:12}}>
     Understanding Faith
        </Text>
     </View>
     
     
     
      </View>
    </ScrollView>
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
    alignItems: 'center',
    // borderWidth:0.5,
   

  },
  appBarparent: {
  
    shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
  
   
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
   }
};

export default DownloadNM;
