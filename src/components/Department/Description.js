import React from 'react';
import {View, Text, TextInput} from 'react-native';
import CustomButton from '../common/CustomButton';

const Description = ({route, navigation}) => {

    return(
        <View style={{flex:1, backgroundColor:'white', padding:20}}>
            <Text style={{
                 color: '#000',
                 fontSize: 16,
                 width: '100%',
                 fontWeight: 'normal',
                 fontWeight:'200',
                 fontFamily: 'Nunito'
            }}>{route.params.title}</Text>
            <Text style={{
                 color: '#000',
                 fontSize: 14,
                 fontWeight: 'normal',
                 fontFamily: 'Nunito-Light',
                 flexWrap: 'wrap',
                 marginTop:8
            }}>{route.params.description}</Text>

            <CustomButton  onPress={() =>
             navigation.navigate('DepartmentForm', {
              dept: route.params.title
            })} buttonStyle={{ width:'100%', marginTop:20, marginBottom:40}}>Join</CustomButton>
          
        </View>
    )
}

export default Description;