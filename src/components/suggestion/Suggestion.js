import React, { useState } from 'react';
import {Text, View, TextInput} from 'react-native';
import CustomButton from '../common/CustomButton';
import Toast from 'react-native-simple-toast';
        
    const Suggestion = () => {

        const [name, setName]  = useState('');
        const [suggestion, setSuggestion] = useState('');
       
        const submit = () => {

            if (name === '' || suggestion === ''){
                Toast.show("Please fill all fields", Toast.LONG);
            
            }else{
              

                fetch('https://church.aftjdigital.com/api/send_suggestion', {
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    // 'Authorization': `bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({
                    
                        name: name,
                        sugession: suggestion
                    
                    })
                })
                .then((response) => response.json())
                .then((responseJson) =>{
                    console.log("Res:" + JSON.stringify(responseJson));
                    Toast.show('Sent! Thanks for your suggestion');
                    setName('');
                    setSuggestion('');
                })
                .catch((error) => {
                    console.log("error:" + error);
                    
                    alert(error)
                });
            }
           
        }

        return (
            <View style={{backgroundColor:'white', flex:1, padding:20
            }}>

                <Text style={{fontSize:18, lineHeight:18, fontFamily:'Nunito', fontWeight:'600', marginBottom:8}}>Make a Suggestion</Text>
                <Text style={{fontSize:12, lineHeight:18, fontFamily:'Nunito', fontWeight:'300', letterSpacing:0.5}}>Have any suggestion on the Church growth, activities or a complaint. Please let us know by filling the form below.</Text>

                <Text style={styles.label}>Name</Text>
                <View style={styles.border}> 
                    <TextInput 
                    value={name} 
                    onChangeText={(value) => setName(value)} 
                    style={styles.inputStyle}/>
                </View>

                <Text style={styles.label}>Suggestion</Text>
                <View style={{...styles.border, height:150}}> 
                    <TextInput 
                    value = {suggestion}
                    onChangeText={(value) => setSuggestion(value)}
                    style={styles.inputStyle} 
                    multiline/>
                </View>
                
                <CustomButton 
                    onPress={() => submit()}
                     
                    buttonStyle={{ width:'100%', marginTop:50, marginBottom:20}}>Submit</CustomButton>
                

            </View> )
    }

const styles = {
    label:{
        fontSize:14, 
        lineHeight:18, 
        fontFamily:'Nunito', 
        fontWeight:'300',
        marginTop:24,
        marginBottom:8
    },
    border:{
        borderRadius:4,
        borderColor:'#c4c4c4',
        borderWidth:1,
        paddingLeft:5,
        paddingRight:5
    },
    inputStyle:{
        fontSize:14

    }
}

export default Suggestion;