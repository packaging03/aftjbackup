import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  { 
    id:1, 
    videoSource:'j0SYDCok0OU', 
    img: 'https://g.christianbook.com/g/slideshow/0/0772001/main/0772001_1_ftc.jpg', 
    title:"Redemption", 
    details:"Foundations of Faith"
  },
  { 
    id: 2, 
    videoSource:'7z1XufT7IMg',
    img: 'https://www.colourbox.com/preview/5188380-noah-ark.jpg', 
    title:"Salvation", 
    details:"Salvation for Kids"
  }, 
  { 
    id:3, videoSource:'yDIhBpcebTI', 
    img: 'https://i.ytimg.com/vi/1EzW-tnZ-Lw/maxresdefault.jpg', 
    title:"The greatest gift", 
    details:"Animated film about Salvation through Jesus Christ",
  },
];

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

export default function Grade56({navigation, route}) {
    const {option} = route.params;
    {{navigation.setOptions({title:option})}}
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>navigation.navigate('Preschoolplayer',{videoLink: item.videoSource, videoTitle:item.title, pageId: 18} )}> 
            <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 24,
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
                      fontSize: 13,
                      marginLeft: 10,
                      marginTop: 4,
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