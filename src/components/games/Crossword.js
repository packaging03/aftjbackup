import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Animated} from 'react-native';
import {TouchableHighlight } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';


const words = ['LOVE', 'JOY', 'PEACE', 'GOD', 
'GRACE', 'TRUTH', 'JESUS', 'FATHER', 'MASTER', 'DISCIPLE',
'HEAVEN', 'TEACHER', 'KINGDOM', 'PATIENCE', 'FAITH', 'WORD', 'TRUST', 'OBEY', 'ABBA', 'SPIRIT',
 'CARNAL', 'CHRIST', 'SAVIOUR', 'HEALER', 'ALTAR', 'APOSTLE', 'ATONEMENT', 'BAPTISM', 'BRETHREN', 'CHERUB', 
 'EXODUS', 'GOSPEL', 'MESSIAH', 'PARADISE', 'PRODIGAL', 'PROPHESY', 'RAPTURE', 'REJOICE', 'REDEMPTION', 
 'REPENTANCE', 'RESURRECTION', 'ANOINTING', 'SACRIFICE', 'JEW', 'SERMON', 'TESTIMONY', 'TRIBULATION',
 'GENESIS', 'ANGEL', 'SABBATH', 'CHURCH', 'PRAYER', 'PRAISES', 'NATIONS', 'HOLY', 'HONOUR', 'RESPECT', 'PASTOR',
 'BIBLE', 'COVENANT', 'PRIEST', 'CONFIDENCE', 'PSALMS', 'FORGIVE', 'CONQUEROR', 'BLESSINGS', 'SUBMIT', 'GENTLE',
 'POWER', 'GLORY', 'WORSHIP', 'PRIESTHOOD', 'PROPHET', ''
];

var sixteenWords = [];

let first = '';
let last = '';
const pick16Random = () => {
   
    for (let t = 0; t < 16; t++){
        let num = Math.floor(Math.random() * 71);
        
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

 var arrList = [];

 function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 const genLetters = (length) => {
    for (let i = 0; i < 17 - length; i++){
        arrList.push(
        <TouchableHighlight onPress={()=>{}} underlayColor={'#219653'} >
             <Text style={styles.letter}>{makeid(1)}</Text>
        </TouchableHighlight>);
        
    } 
 }

const circleRadius = 30;

const Crosswords = ({route}) => {


    const [visibility1, setVisibility1] = 
    useState(0);
    const [visibility2, setVisibility2] = 
    useState(0);
    const [visibility3, setVisibility3] = 
    useState(0);
    const [visibility4, setVisibility4] = 
    useState(0);
    const [visibility5, setVisibility5] = 
    useState(0);
    const [visibility6, setVisibility6] = 
    useState(0);
    const [visibility7, setVisibility7] = 
    useState(0);
    const [visibility8, setVisibility8] = 
    useState(0);
    const [visibility9, setVisibility9] = 
    useState(0);
    const [visibility10, setVisibility10] = 
    useState(0);
    const [visibility11, setVisibility11] = 
    useState(0);
    const [visibility12, setVisibility12] = 
    useState(0);
    const [visibility13, setVisibility13] = 
    useState(0);
    const [visibility14, setVisibility14] = 
    useState(0);
    const [visibility15, setVisibility15] = 
    useState(0);
    const [visibility16, setVisibility16] = 
    useState(0);
    let {index1, index2, index3, index4, index5, index6, index7, index8, index9, index10, index11, index12, index13, index14, index15, index16} = route.params;
    useEffect(() => {
        pick16Random();
    }, []);


    const play = (position, currentLetter, firstLetter, lastLetter) => {

        if(first === ''){
            first = currentLetter;
        }else if (first !== '' && first !== ''){
            last = currentLetter;
            if (first === firstLetter && last === lastLetter ){
                Toast.show('Correct!', Toast.LONG);
                
                

                // setVisibility({[position]:1});
                switch(position){
                    case 'one':
                        setVisibility1(1);
                        break;
                     case 'two':
                        setVisibility2(2);
                        break;
                    case 'three':
                        setVisibility3(3);
                        break;
                    case 'four':
                        setVisibility4(4);
                        break;
                
                    case 'five':
                        setVisibility5(5);
                        break;
                    case 'six':
                        setVisibility6(6);
                        break;
                    case 'seven':
                        setVisibility7(7);
                        break; 
                    case 'eight':
                        setVisibility8(8);
                        break; 
                    case 'nine':
                        setVisibility9(9);
                        break; 
                    case 'ten':
                        setVisibility10(10);
                        break; 
                    case 'eleven':
                        setVisibility11(11);
                        break; 
                    case 'twelve':
                        setVisibility12(12);
                        break; 
                    case 'thirteen':
                        setVisibility13(13);
                        break;
                    case 'fourteen':
                        setVisibility14(14);
                        break; 
                    case 'fifteen':
                        setVisibility15(15);
                        break; 
                    case 'sixteen':
                        setVisibility16(16);
                        break;
                }
                
            }
            first = '';
            last = '';
        }
    }

    return (
        <View style={{flex:1, backgroundColor:'white', padding:20}}>

            <Text style={
                {fontSize:20, 
                fontFamily:'Nunito', 
                lineHeight:22, 
                letterSpacing:0.5, 
                alignSelf:'center',
                fontWeight:'600',}}>Welcome To Today's Game</Text>
            
            <Text style={
                {fontWeight:'300', 
                marginTop:8,
                fontFamily:'Nunito', 
                lineHeight:16, 
                alignSelf:'center',
                fontSize:14,
                letterSpacing:0.5}}>Please seat yourself, relax and enjoy </Text>
                <Text  style={
                {fontWeight:'300', 
                fontFamily:'Nunito', 
                lineHeight:16, 
                alignSelf:'center',
                fontSize:14,
                marginBottom:16,
                letterSpacing:0.5}}>the game</Text>
            <View style={styles.accross}>
                
                {
                    sixteenWords.slice(0, 1).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        
                        arrList.splice(index1, 0, <View style={{ 
                            zIndex:-10,
                            opacity:visibility1,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index1 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index1++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('one', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(1, 2).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index2, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility2,
                            borderWidth: 1,
                            left: index2 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index2++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('two', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
            {
                    sixteenWords.slice(2, 3).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index3, 0, <View style={{ zIndex:-10,
                            height:24,
                            opacity:visibility3,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index3 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index3++, 0,<TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('three', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(3, 4).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index4, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility4,
                            borderWidth: 1,
                            left: index4 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index4++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('four', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
            {
                    sixteenWords.slice(4, 5).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index5, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility5,
                            left: index5 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index5++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('five', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                  {
                      sixteenWords.slice(5, 6).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index6, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility6,
                            left: index6 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index6++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('six', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
            {
                    sixteenWords.slice(6, 7).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index7, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility7,
                            borderWidth: 1,
                            left: index7 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index7++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('seven', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                 {
                    sixteenWords.slice(7, 8).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index8, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility8,
                            left: index8 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index8++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('eight', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                 {
                    sixteenWords.slice(8, 9).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index9, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility9,
                            left: index9 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index9++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('nine', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                  {
                    sixteenWords.slice(9, 10).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index10, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index10 * 22,
                            opacity:visibility10,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index10++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('ten', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                 {
                    sixteenWords.slice(10, 11).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index11, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            opacity:visibility11,
                            borderWidth: 1,
                            left: index11 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index11++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('eleven', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(11, 12).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index12, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index12 * 22,
                            opacity:visibility12,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index12++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('twelve', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
               {
                    sixteenWords.slice(12, 13).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            arrList.splice(index13, 0, <View style={{ zIndex:-10,
                                height:24,
                                position:'absolute',  backgroundColor: 'transparent',
                                borderRadius: 6, 
                                borderWidth: 1,
                                left: index13 * 22,
                                opacity:visibility13,
                                width: array.length * 25,
                                borderColor: '#219653',}}/>)
                            array.map(i => {
                                arrList.splice(index13++, 0, <TouchableHighlight underlayColor={'#219653'}
                                onPress={()=> play('thirteen', i, array[0], array[array.length - 1])}>
                                    <Text style={styles.letter}>{i}</Text>
                                    </TouchableHighlight>);
                                
                                // return <Text style={styles.letter}>{i}</Text>
                            })
                            
                        // }
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(13, 14).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index14, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            left: index14 * 22,
                            opacity:visibility14,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index14++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('fourteen', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(14, 15).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index15, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility15,
                            left: index15 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index15++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('fifteen', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>
            <View style={styles.accross}>
                {
                    sixteenWords.slice(15, 16).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                        let array = word.split('');
                        genLetters(word.length);
                        arrList.splice(index16, 0, <View style={{ zIndex:-10,
                            height:24,
                            position:'absolute',  backgroundColor: 'transparent',
                            borderRadius: 6, 
                            borderWidth: 1,
                            opacity:visibility16,
                            left: index16 * 22,
                            width: array.length * 25,
                            borderColor: '#219653',}}/>)

                        array.map(i => {
                            arrList.splice(index16++, 0, <TouchableHighlight underlayColor={'#219653'}
                            onPress={()=> play('sixteen', i, array[0], array[array.length - 1])}>
                                <Text style={styles.letter}>{i}</Text>
                                </TouchableHighlight>);
                            
                        })
                    })
                }
                {
                    arrList
                }
            </View>

            <View style={{display:'flex', marginTop:20, flexWrap:'wrap', flexDirection:'row'}}>
            {
                 sixteenWords.slice(0, 16).map(i => {
                    return <Text style={{width:80, marginRight:5, fontSize:11}}>{i}</Text>;
                })
            }
            </View>


        </View>
    )
}

const styles = {
    accross:{
        width:'100%', 
        display:'flex', 
        justifyContent:'space-between', 
        flexDirection:"row",
        marginBottom:2
    }, 
    letter:{
        fontWeight:'bold',
        fontSize: 15, 
        zIndex:10
    },
    box: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        backgroundColor: 'plum',
        margin: 10,
        zIndex: 200,
      },
      horizontalPan: {
        backgroundColor: '#f48fb1',
        height: 150,
        justifyContent: 'center',
        marginVertical: 10,
      },
      circle: {
        backgroundColor: '#f48fb1',
        borderRadius: 15,
        borderWidth:5,
        borderColor: '#219653',

        height: circleRadius * 2,
        width: circleRadius * 2,
      },
      wrapper: {
        backgroundColor:'red',
        flex: 1,
      },
}

export default Crosswords;