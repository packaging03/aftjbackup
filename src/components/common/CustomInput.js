import React from 'react';
import {View, TextInput} from 'react-native';

const CustomInput = ({ onChangeText, keyboardType, title, otherStyles, secureTextEntry, value}) =>(

    <View style={otherStyles}> 
        <TextInput 
        keyboardType={keyboardType}
        placeholderTextColor='#c4c4c4'
        
        style={{
            fontFamily:'Nunito', 
            fontSize: 10, 
            width:'100%', 
            color:'black', 
            fontWeight:'400' }}

        onChangeText={onChangeText} value={value}
         placeholder={title} secureTextEntry={secureTextEntry}/>
         
        <View style={{
            backgroundColor:'#000000',
            width:'100%',
            height: 1,
            opacity:0.9,
            position:'absolute',
            top:'40%',
            marginTop: 17,
        }} />
    </View>
    

);

const styles = {

    input:{
        
       height:'100',
        alignSelf:'flex-start',

    }
}

export default CustomInput;