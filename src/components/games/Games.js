import React, { useEffect } from 'react';
import {View, Text, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
//  

let index1 =  Math.floor(Math.random() * 10);
const Games = ({navigation}) => {

    useEffect(() => {
        console.log("games: "+index1);
    }, [])
    const {imageStyle, textStyle, itemStyle} = styles;
    return (
        <View style={
            {backgroundColor:'#fff', 
            display:'flex', 
            flexDirection:'column', 
            paddingTop:10,
            flex:1}}>

            <TouchableWithoutFeedback onPress={() => navigation.navigate("Quiz")}>
                <View style={itemStyle}>

                    <Image
                    style={imageStyle}
                        source={require('../../assets/quiz.png')} />
                
                    <Text style={textStyle}>Quiz</Text>

            </View>
            </TouchableWithoutFeedback>
            
            <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#CED0CE',
                marginLeft: '1%',
            }}
            />

            <TouchableWithoutFeedback 
                onPress={() => 
                    navigation.navigate("Crossword", {
                    index1:  Math.floor(Math.random() * 10),
                    index2:  Math.floor(Math.random() * 10),
                    index3:  Math.floor(Math.random() * 10),
                    index4: Math.floor(Math.random() * 10),
                    index5:  Math.floor(Math.random() * 10),
                    index6:  Math.floor(Math.random() * 10),
                    index7:  Math.floor(Math.random() * 10),
                    index8:  Math.floor(Math.random() * 10),
                    index9:  Math.floor(Math.random() * 10),
                    index10:  Math.floor(Math.random() * 10),
                    index11:  Math.floor(Math.random() * 10),
                    index12:  Math.floor(Math.random() * 10),
                    index13:  Math.floor(Math.random() * 10),
                    index14:  Math.floor(Math.random() * 10),
                    index15:  Math.floor(Math.random() * 10),
                    index16:  Math.floor(Math.random() * 10)
                })}>
                <View style={itemStyle}>

                    <Image
                    style={imageStyle}
                        source={require('../../assets/crossword.png')} />
                
                    <Text style={textStyle}>Crossword</Text>

                 </View>
            </TouchableWithoutFeedback>

            <View
            style={{
                height: 0.5,
                width: '100%',
                backgroundColor: '#CED0CE',
                marginLeft: '1%',
            }}
            />
        </View>
    )
}

const styles = {
    imageStyle: {
        alignSelf:'center',
        width:72,
        height:72,
        marginTop:16, 
        marginBottom:16

    },
    textStyle: {
        marginLeft:20,
        fontFamily: 'Nunito',
        fontSize: 14,
        fontWeight: '400',
        lineHeight:  19.1

    },
    itemStyle: {
        display:'flex', 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'flex-start',
        marginLeft: 20,
        marginRight: 20
    }
}

export default Games;