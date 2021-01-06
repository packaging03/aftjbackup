import React from 'react';
import {Text, View, TextInput} from 'react-native';
import CustomInput from '../common/CustomInput';
const Suggestion = () => {

    return <View style={{backgroundColor:'white', flex:1, padding:20
    }}>

        <Text style={{fontSize:18, lineHeight:18, fontFamily:'Nunito', fontWeight:'600', marginBottom:8}}>Make a Suggestion</Text>
        <Text style={{fontSize:12, lineHeight:18, fontFamily:'Nunito', fontWeight:'300', letterSpacing:0.5}}>Have any suggestion on the Church growth, activities or a complaint. Please let us know by filling the form below.</Text>

        <Text style={styles.label}>Name</Text>
        <View style={styles.border}> 
          <TextInput style={styles.inputStyle}/>
        </View>

        <Text style={styles.label}>Suggestion</Text>
        <View style={{...styles.border, height:150}}> 
          <TextInput style={styles.inputStyle} multiline/>
        </View>
        

    </View>
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