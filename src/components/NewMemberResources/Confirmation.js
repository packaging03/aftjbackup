import React from 'react';
import {Image, View, Text} from 'react-native';
import CustomButton from '../common/CustomButton';

const stroke = '../../assets/stroke.png';
const Confirmation = ({navigation}) =>{

    return(

        
        <View style={
            {
                backgroundColor:'white',
                flex:1,
                display:'flex',
                justifyContent:'flex-start', 
                alignItems:'center'
            }}>

            <View style={
                {
                    marginTop:60,
                    borderColor:'#3ACC6C', 
                    borderWidth:2, 
                    width:150, 
                    height:150,
                    alignItems:'center',
                    backgroundColor:'white',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:150}}>
                <Image  source = 
                        {require(stroke)}  
                        style={{height: 70,width:92}} />
            </View>
            
                                    
            <Text style={
                {fontSize:18,
                marginBottom:10, 
                marginTop:24, 
                fontWeight:'400', fontFamily:'Nunito'}}>Congratulations !</Text>
            <Text  style={styles.text}>Your new membership </Text>
            <Text style={styles.text}>course was successful</Text>

            <Text  style={{...styles.text, marginTop:10}}>Click on the link/button below to</Text>
           
            <Text style={{...styles.text, fontWeight:'bold'}}>Join a Department</Text>

            <CustomButton 
            onPress={() => navigation.navigate('Departments')} 
            buttonStyle={{ width:'100%', marginTop:50, marginBottom:20}}>Join</CustomButton>
           
        </View>
    )
}

const styles = {
    text:{
        fontSize:14,
        fontFamily:'Nunito',
        fontWeight:'400',
        lineHeight:19.1

    }
}

export default Confirmation;