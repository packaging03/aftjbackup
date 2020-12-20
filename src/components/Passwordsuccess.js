import React, {useState} from 'react';
import {View, Text, ScrollView, ImageBackground, Image,Picker,TextInput,Button} from 'react-native';
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
const Passwordsuccess = () => {

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
           Forgot Password
        </Text>
        </View>
        </View>
        <View style={{alignContent:'center',justifyContent: 'center'}}>
        <Image source = {require('../assets/success_pass.png')} resizeMode={'contain'} style={{height:70,width:70,marginTop:80,alignContent:'center',justifyContent: 'center',alignSelf:'center'}}/>
        <Text style={{marginTop:40,fontSize:20,alignSelf:'center'}}>
        Congratulations !
    </Text>
    <Text style={{marginTop:20,fontSize:17,alignSelf:'center',marginLeft:70,marginRight:70,textAlign:'center'}}>
       Your password has been successfully reset.
    </Text>
    <TouchableHighlight
    style={styles.submit}
  underlayColor='#fff'>
    <Text style={[styles.submitText]}>Home</Text>
</TouchableHighlight>
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
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
    borderBottomWidth:0.01
   
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
   submit:{
    marginRight:40,
    marginLeft:40,
    marginTop:60,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#C5CAD2',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#000',
      textAlign:'center',
  }
};

export default Passwordsuccess;
