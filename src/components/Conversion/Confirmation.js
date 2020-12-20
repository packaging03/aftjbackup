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
            
                                    
            <Text style={{fontSize:18, marginBottom:10, marginTop:24, fontWeight:'400', fontFamily:'Nunito'}}>Sent</Text>
            <Text  style={styles.text}>Your Response was </Text>
            <Text style={styles.text}>Submitted Successfully</Text>

            <CustomButton 
            onPress={() => navigation.navigate('Home')} 
            buttonStyle={{ width:'100%', marginTop:50, marginBottom:20}}>Home</CustomButton>
           
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