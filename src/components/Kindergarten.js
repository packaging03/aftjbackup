import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  { 
    id:1, 
    videoSource:'4qFg3QD2li8', 
    img: 'https://g.christianbook.com/g/slideshow/0/0772001/main/0772001_1_ftc.jpg', 
    title:"All about Jesus", 
    details:"All about Jesus"
  },
  { 
    id: 2, 
    videoSource:'JyVXIvdTF20', //onnEaINBaGg&pbjreload=101
    img: 'https://www.colourbox.com/preview/5188380-noah-ark.jpg', 
    title:"The birth of Jesus Christ", 
    details:"The birth of Jesus Christ"
  }, 
  { 
    id:3, videoSource:'1EzW-tnZ-Lw', 
    img: 'https://i.ytimg.com/vi/1EzW-tnZ-Lw/maxresdefault.jpg', 
    title:"Jesus and the disciples", 
    details:"Jesus and the disciples",
  }, 
  { 
    id: 4, 
    videoSource:'pKcTXDgt5iI', 
    img: 'https://www.inspirationalchristians.org/images/joseph-dreams-1-1024x640.jpg', 
    title:"Miracles of Jesus", 
    details:"Miracles of Jesus"
  },
  { 
    id:5, 
    videoSource:'-Xb9svrR3kY', 
    img: 'https://i.pinimg.com/originals/83/45/46/83454612be99ab58069b6c860c97c301.jpg', 
    title:"Jesus is anointed", 
    details:"Jesus is anointed"
  },
  { 
    id:6, 
    videoSource:'l2KxzMm68GE', 
    img: 'https://i.pinimg.com/originals/83/45/46/83454612be99ab58069b6c860c97c301.jpg', 
    title:"Stories of Jesus", 
    details:"Stories of Jesus"
  },
];
//- https://www.youtube.com/watch?v=l2KxzMm68GE

const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

export default function Kindergarten({navigation, route}) {
    const {option} = route.params;
    {{navigation.setOptions({title:option})}}
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>navigation.navigate('Preschoolplayer',{videoLink: item.videoSource, videoTitle:item.title} )}> 
            <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 16,
                }}>
                <Image style={styles.img} source ={{uri:item.img}} />
                 
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      color: '#191C52',
                      fontWeight: 'light',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      marginLeft: 10,
                      color: '#a6a6a6',
                    }}>
                    {item.details}
                  </Text>
                </View>

               
              </View>
              </TouchableOpacity>

          )}
          ItemSeparatorComponent={renderSeparator}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    img:{width:120, 
        height:75,
        borderRadius: 6,
        shadowOpacity: 1,
        shadowRadius: 2,
        resizeMode:'cover',
    
    }
})
