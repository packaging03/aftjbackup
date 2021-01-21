import React, {useEffect} from 'react';
import {View, Text, FlatList, Animated} from 'react-native';
import {PanGestureHandler, State, RectButton } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import GmailStyleSwipeableRow from './GmailStyleSwipeableRow';

const words = ['LOVE', 'JOY', 'PEACE', 'GOD', 
'GRACE', 'TRUTH', 'JESUS', 'FATHER', 'MASTER', 'DISCIPLE',

'HEAVEN', 'TEACHER', 'KINGDOM', 'PATIENCE', 'FAITH', 'WORD', 'TRUST', 'OBEY', 'ABBA', 'SPIRIT',
 'CARNAL', 'CHRIST', 'SAVIOUR'
];
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
        arrList.push(<Text style={styles.letter}>{makeid(1)}</Text>);
        
    }
    
    
 }


  
  const DATA = [
    {
      from: "D'Artagnan",
      when: '3:11 PM',
      message:
        'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
    },
    {
      from: 'Aramis',
      when: '11:46 AM',
      message:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
    },
    {
      from: 'Athos',
      when: '6:06 AM',
      message:
        'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
    },
    {
      from: 'Porthos',
      when: 'Yesterday',
      message:
        'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
    },
    {
      from: 'Domestos',
      when: '2 days ago',
      message:
        'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
    },
    {
      from: 'Cardinal Richelieu',
      when: '2 days ago',
      message:
        'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
    },
    {
      from: "D'Artagnan",
      when: 'Week ago',
      message:
        'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
    },
    {
      from: 'Cardinal Richelieu',
      when: '2 weeks ago',
      message:
        'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
    },
  ];

  const Row = ({ item }) => (
    <RectButton style={styles.rectButton} onPress={() => alert(item.from)}>
      <Text style={styles.fromText}>{item.from}</Text>
      <Text numberOfLines={2} style={styles.messageText}>
        {item.message}
      </Text>
      <Text style={styles.dateText}>
        {item.when} {'❭'}
      </Text>
    </RectButton>
  );
  
  const SwipeableRow = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <AppleStyleSwipeableRow>
          <Row item={item} />
        </AppleStyleSwipeableRow>
      );
    } else {
      return (
        <GmailStyleSwipeableRow>
          <Row item={item} />
        </GmailStyleSwipeableRow>
      );
    }
  };

    
const Crosswords = (props) => {

    
    const _translateX = new Animated.Value(0);
    const _translateY = new Animated.Value(0);
    const _lastOffset = { x: 0, y: 0 };
    const _onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: _translateX,
            translationY: _translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );
  
  const _onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      _lastOffset.x += event.nativeEvent.translationX;
      _lastOffset.y += event.nativeEvent.translationY;
      _translateX.setOffset(_lastOffset.x);
      _translateX.setValue(0);
      _translateY.setOffset(_lastOffset.y);
      _translateY.setValue(0);
    }
  };

  

    return (
        <View style={{flex:1, backgroundColor:'white', padding:20}}>
{/* 
        <PanGestureHandler
                {...props}
                onGestureEvent={_onGestureEvent}
                onHandlerStateChange={_onHandlerStateChange}>
                <Animated.View
                style={[
                    styles.box,
                    {
                    transform: [
                        { translateX: _translateX },
                        { translateY: _translateY },
                    ],
                    },
                    props.boxStyle,
                ]}
                />
            </PanGestureHandler> */}

            <FlatList
        
            style={{height:'100%'}}
            data={DATA}
            ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'red'}} />}
            renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} />
            )}
            keyExtractor={(item, index) => `message ${index}`}
        />
            {/* <Text style={
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
                letterSpacing:0.5}}>the game</Text> */}
            <View style={styles.accross}>
                
                {
                    words.slice(0, 1).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
                                // return <Text style={styles.letter}>{i}</Text>
                            })
                            
                        // }
                    })
                }
                {
                    arrList
                }
                {/* <Text style={styles.letter}>S</Text>
                <Text style={styles.letter}>S</Text>
                <Text style={styles.letter}>F</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>G</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>A</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text>
                <Text style={styles.letter}>Q</Text> */}
            </View>
            <View style={styles.accross}>
                {
                    words.slice(1, 2).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(2, 3).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(3, 4).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(4, 5).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                      words.slice(5, 6).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(6, 7).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(7, 8).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(8, 9).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(9, 10).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(10, 11).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(11, 12).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(12, 13).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(13, 14).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(14, 15).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
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
                    words.slice(15, 16).map(word=>{
                        arrList=[];
                        // for(let i = 0; i < word.length; i++){
                            let array = word.split('');
                            genLetters(word.length);
                            var index = Math.floor(Math.random() * 10);
                            array.map(i => {
                                arrList.splice(index++, 0, <Text style={styles.letter}>{i}</Text>);
                                
                                // return <Text style={styles.letter}>{i}</Text>
                            })
                            
                        // }
                    })
                }
                {
                    arrList
                }
            </View>

            <View style={{display:'flex', marginTop:20, flexWrap:'wrap', flexDirection:'row'}}>
            {
                 words.map(i => {
                    return <Text style={{width:60, fontSize:11}}>{i}</Text>;
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
        fontSize: 15
    },
    box: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        backgroundColor: 'plum',
        margin: 10,
        zIndex: 200,
      },
}

export default Crosswords;