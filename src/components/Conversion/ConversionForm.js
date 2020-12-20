import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import CustomButton from '../common/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';

const ConversionForm = ({navigation}) =>{

    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [home, setHome] = useState('');
    const [request, setRequest] = useState('');
    const [newMember, setNewMember] = useState(null);
    const [prayerRequest, setPrayerRequest] = useState(null);
    const [prayer, setPrayer] = useState('');
    const [aboutChurch, setAboutChurch] = useState('');

    const submit =() => {


        fetch('https://church.aftjdigital.com/api/add-conversion', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    // 'Authorization': `bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                  body: JSON.stringify({
                    
                    // user_id: JSON.parse(user).id,
                    name: fullName,
                    
                    email: email,
                    phone: phone,
                    address:home,
                    newMember:newMember ? 'Yes':'No',
                    hear_about_us: aboutChurch,
                    prayerRequest:prayerRequest ? 'Yes':'No',
                    prayer_point: prayer
                  
                  })
                })
                .then((response) => response.json())
                .then((responseJson) =>{
                    console.log("Res:" + JSON.stringify(responseJson));
                    setFullname(''); 
                    setEmail('');
                    setPhone('');
                    setHome('');
                    setPrayer('');
                    
                    navigation.navigate('Confirmation');
                   
                })
                .catch((error) => {
                  console.log("error:" + error);
                   
                  alert(error)});

    }
    return(
        <ScrollView style={{backgroundColor:'white', flex:1}}>
            <View style={{margin:20}}>
            <Text style={
                {fontFamily:'Nunito', 
                letterSpacing:0.5,
                fontWeight:'400',
                 fontSize:16, marginBottom:16}}>Fill the form below.</Text>
            <Text style={styles.text}>Full Name</Text>
            <TextInput 
                keyboardType='default'
                value={fullName} 
                onChangeText={(value) => setFullname(value)} 
                style={styles.textInput} />
            <Text style={styles.text}>Email address</Text>
                <TextInput 
                keyboardType='email-address'
                value={email} 
                onChangeText={(value) => setEmail(value)}   
                style={styles.textInput} />
            <Text  style={styles.text}>Phone Number</Text>
            <TextInput 
                keyboardType='phone-pad' 
                value={phone} 
                onChangeText={(value) => setPhone(value)} 
                style={styles.textInput} />
            <Text  style={styles.text}>Home Address</Text>
            <TextInput style={styles.textInput} />
            <Text  style={styles.text}>Are you a New Member?</Text>
            <View style={styles.textInput}>
                <Picker style={{marginTop:-10}}
                mode={'dropdown'}
                prompt={'well'}
                selectedValue={newMember===null ? '' : (newMember===true?'Yes':'No') }
                onValueChange={(itemValue, itemIndex) =>
                    {
                        if(itemValue === 'Yes')
                            setNewMember(true);
                        else 
                           setNewMember(false)}
                  }>
                    <Picker.Item label="" value=""/>
                    <Picker.Item label="Yes" value="Yes" />
                     <Picker.Item label="No" value="No" />
                </Picker>
            </View>
            
            <Text  style={styles.text}>How did you hear about Our Church?</Text>
            <View style={styles.textInput}>
               <Picker style={{marginTop:-10}}
                selectedValue={aboutChurch === '' ? '' : aboutChurch}
                mode={'dropdown'}
                onValueChange={(itemValue, itemIndex) =>
                    {
                       setAboutChurch(itemValue);
                }}>
                    <Picker.Item label="" value=""/>
                     <Picker.Item label="Facebook Ads" value="Facebook Ads" />
                     <Picker.Item label="Google Ads" value="Google Ads" />
                     <Picker.Item label="Youtube Ads" value="Youtube Ads" />
                     <Picker.Item label="Twitter Post" value="Twitter Post" />
                     <Picker.Item label="Instagram Post/Story" value="Instagram Post/Story" />
                     <Picker.Item label="Facebook Post/Story" value="Facebook Post/Story" />
                     <Picker.Item label="Other Social Media" value="Other Social Media" />
                     <Picker.Item label="TV" value="TV" />
                     <Picker.Item label="Email" value="Email" />
                     <Picker.Item label="Newspaper" value="Newspaper" />
                     <Picker.Item label="Word of mouth" value="Word of mouth" />
                </Picker>
            </View>
            
            <Text  style={styles.text}>Would you like us to pray with you about anything?</Text>
            <View style={styles.textInput}>
                <Picker style={{marginTop:-10}}
                    mode={'dropdown'}
                    
                    selectedValue={prayerRequest===null ? '' : (prayerRequest===true?'Yes':'No') }
                    onValueChange={(itemValue, itemIndex) =>
                        {
                            if(itemValue === 'Yes')
                                setPrayerRequest(true);
                            else 
                            setPrayerRequest(false)}
                    }>
                        <Picker.Item label="" value=""/>
                        <Picker.Item label="Yes" value="Yes" />
                          <Picker.Item label="No" value="No" />
                </Picker>
            </View>
            
            <Text  style={styles.text}>If yes, type in your prayer request below.</Text>
            <TextInput 
                value={prayer} 
                numberOfLines={4}
                multiline
                onChangeText={(value) => setPrayer(value)} 
                style={styles.largeTextInput} />
                
            <CustomButton onPress={() => submit()} buttonStyle={{ width:'100%', marginBottom:20}}>Submit</CustomButton>
            </View>
         </ScrollView>
    )
}

const styles = {
    textInput:
    {
        borderWidth:1,
        height: 40, 
        marginTop:8, 
        borderColor:'#c4c4c4', 
        marginBottom:24,
        borderRadius:4},
    text:{
        fontFamily:'Nunito-Regular',
        fontSize:14,
        lineHeight:16,
        letterSpacing:0.5
    },
    largeTextInput:
    {
        borderWidth:0.5,
        height: 80, 
        marginTop:8,
        marginBottom:40,
        textAlignVertical:'top',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        display:'flex',
        borderColor:'#aaa', 
        borderRadius:4}
}
export default ConversionForm;