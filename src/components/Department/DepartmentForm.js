import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import CustomButton from '../common/CustomButton';


const DepartmentForm = ({navigation, route, user}) => {

    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [memberClass, setMemberClass] = useState(null);
    const [department, setDepartment] = useState(route.params.dept)
        
    const submit =() => {


        fetch('https://church.aftjdigital.com/api/join-department', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    // 'Authorization': `bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                  body: JSON.stringify({
                    
                    // user_id: JSON.parse(user).id,
                    user_id: JSON.parse(user).id,
                    name: fullName,
                    email: email,
                    phone: phone,
                    department: department,
                    membership_class: memberClass ? 'Yes':'No',
                   
                  
                  })
                })
                .then((response) => response.json())
                .then((responseJson) =>{
                    console.log("Res:" + JSON.stringify(responseJson));
                    setFullname(''); 
                    setEmail('');
                    setPhone('');
                    setMemberClass(null);
                    
                    navigation.navigate('D-Confirmation');
                   
                })
                .catch((error) => {
                  console.log("error:" + error);
                   
                  alert(error)});

    }
    return(
        <View style={{padding:20, flex:1, backgroundColor:'white'}}>

                <Text style={
                {fontFamily:'Nunito', 
                letterSpacing:0.5,
                fontWeight:'400',
                 fontSize:16, marginBottom:16}}>Fill the form below to become a Member.</Text>
            <Text style={styles.text}>Full Name</Text>
             <TextInput 
                keyboardType='default'
                value={fullName} 
                onChangeText={(value) => setFullname(value)} 
                style={styles.textInput} />
              <Text style={styles.text}>Email Address</Text>
              <TextInput 
                keyboardType='email-address'
                value={email} 
                onChangeText={(value) => setEmail(value)} 
                style={styles.textInput} />
              <Text style={styles.text}>Phone Number</Text>
              <TextInput 
                keyboardType='phone-pad'
                value={phone} 
                onChangeText={(value) => setPhone(value)} 
                style={styles.textInput} />
              <Text style={styles.text}>Have you finished your Membership Class?</Text>
              <View style={styles.textInput}> 
                <Picker style={{marginTop:-10}}
                    mode={'dropdown'}
                    prompt={'well'}
                    selectedValue={memberClass===null ? '' : (memberClass===true?'Yes':'No') }
                    onValueChange={(itemValue, itemIndex) =>
                        {
                            if(itemValue === 'Yes')
                                setMemberClass(true);
                            else 
                            setMemberClass(false)}
                    }>
                        <Picker.Item label="" value=""/>
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>
                </View>
              <Text style={styles.text}>Department</Text>
              <TextInput 
                editable={false}
                keyboardType='default'
                value={department} 
                onChangeText={(value) => setDepartment(value)} 
                style={styles.textInput} />
             
                <CustomButton onPress={() => submit()} buttonStyle={
                    { width:'100%', 
                    marginTop:10,
                    marginBottom:20
                    }}>Submit</CustomButton>
           
        </View>
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
}

const mapStateToProps = state => ({

    accessToken: state.user.accessToken,
    user: state.user.user
  
  });

export default connect(mapStateToProps)(DepartmentForm);