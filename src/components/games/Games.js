import React, { useEffect } from 'react';
import {View, Text, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
//  

let index1 =  Math.floor(Math.random() * 10);

const words = ['LOVE', 'JOY', 'PEACE', 'GOD', 
'GRACE', 'TRUTH', 'JESUS', 'FATHER', 'MASTER', 'DISCIPLE',
'HEAVEN', 'TEACHER', 'KINGDOM', 'PATIENCE', 'FAITH', 'WORD', 'TRUST', 'OBEY', 'ABBA', 'SPIRIT',
 'CARNAL', 'CHRIST', 'SAVIOUR', 'HEALER', 'ALTAR', 'APOSTLE', 'ATONEMENT', 'BAPTISM', 'BRETHREN', 'CHERUB', 
 'EXODUS', 'GOSPEL', 'MESSIAH', 'PARADISE', 'PRODIGAL', 'PROPHESY', 'RAPTURE', 'REJOICE', 'REDEMPTION', 
 'REPENTANCE', 'RESURRECTION', 'ANOINTING', 'SACRIFICE', 'JEW', 'SERMON', 'TESTIMONY', 'TRIBULATION',
 'GENESIS', 'ANGEL', 'SABBATH', 'CHURCH', 'PRAYER', 'PRAISES', 'NATIONS', 'HOLY', 'HONOUR', 'RESPECT', 'PASTOR',
 'BIBLE', 'COVENANT', 'PRIEST', 'CONFIDENCE', 'PSALMS', 'FORGIVE', 'CONQUEROR', 'BLESSINGS', 'SUBMIT', 'GENTLE',
 'POWER', 'GLORY', 'WORSHIP', 'PRIESTHOOD', 'PROPHET', 'INTERCESSOR'
];

var crosswordArray = [];
var sixteenWords = [];

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

const  genLetters = (length) => {

    let array = [];
    for (let i = 0; i < 14 - length; i++){
        array.push(makeid(1));
        
    } 
    return array;
 }

 const generateCrossword = () => {

    
    sixteenWords.map(word => {
        
        // for(let i = 0; i < word.length; i++){
        let wordArray = word.split('');
        let index = Math.floor(Math.random() * 10);
        
        let array = [];
        genLetters(word.length).map(i=>{
            array.push(i);
        });
        wordArray.map(i => {
            array.splice(index++, 0, i);
        });
        crosswordArray.push(array);

    });
    console.log(crosswordArray);
 }

const pick16Random = () => {
   sixteenWords = [];
    
    for (let t = 0; t < 16; t++){
        let num = Math.floor(Math.random() * 73);
        
        if (!sixteenWords.includes(words[num])){
            sixteenWords.push(words[num]);
        }else{
           
            while(sixteenWords.includes(num)){
                num = Math.floor(Math.random() * 71);
                
            }
            sixteenWords.push(words[num]);
        }
        
    }
    
}
const Games = ({navigation}) => {

    useEffect(() => {
        pick16Random();
        generateCrossword();

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
                    sixteenWords: sixteenWords,
                    crosswordArray: crosswordArray
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
        fontFamily: 'Nunito-Regular',
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