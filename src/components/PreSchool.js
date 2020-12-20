import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[{id:1, videoSource:'MEgEugzifuw', img: 'https://g.christianbook.com/g/slideshow/0/0772001/main/0772001_1_ftc.jpg', title:"Bible Story for kids", details:"The story of creation"

},{id: 2, videoSource:'onnEaINBaGg&pbjreload=101',img: 'https://www.colourbox.com/preview/5188380-noah-ark.jpg', title:"Noah's Ark", details:"Beginner Bible"}, 
{id:3, videoSource:'f66rTdDAJZ8', img: 'https://i.pinimg.com/originals/83/45/46/83454612be99ab58069b6c860c97c301.jpg', title:"Bible Rhymes compilation", details:"Jesus loves me and many more"}, 
{id: 4, videoSource:'Yn3bb5gbaEA', img: 'https://www.inspirationalchristians.org/images/joseph-dreams-1-1024x640.jpg', title:"The Dreamer", details:"Bible Adventure"},
{id:5, videoSource:'1EzW-tnZ-Lw', img: 'https://i.ytimg.com/vi/1EzW-tnZ-Lw/maxresdefault.jpg', title:"Jesus and 12 Disciples", details:"Call for disciples"},
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

export default function PreSchool({navigation, route}) {
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
                  margin: 12,
                }}>
                <Image style={styles.img} source ={{uri:item.img}} />
                 
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      color: '#000',
                      fontWeight: '600',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 10,
                      color: '#808080',
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
    img:{width:127, 
        height:80,
        borderRadius: 4,
        shadowOpacity: 1,
        shadowRadius: 2,
        resizeMode:'cover',
    
    }
})
