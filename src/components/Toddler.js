import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  
  { 
    id:1, 
    videoSource:'YalBsd56iTQ&t=236s', 
    img: 'https://i.ibb.co/T0c03Nz/Rectangle-101-8.png', 
    title:"Bible Stories for Kids", 
    details:"The Story of Creation"
  },
  { id:2, 
    videoSource:'mQa-GseMSI4', 
    img: 'https://i.ibb.co/HYbxdmc/Rectangle-102-1.png', 
    title:"The Bible Story for Kids!", 
    details:"Children Christian Bible Cartoon Movie"
  }, 
  { 
    id: 3, 
    videoSource:'4qFg3QD2li8', 
    img: 'https://i.ibb.co/zS7Yr8z/Rectangle-103.png', 
    title:"All About Jesus", 
    details:"Bible For Kids"
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

export default function PreSchool({navigation, route}) {
    const {option} = route.params;
    {{navigation.setOptions({title:option})}}
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>navigation.navigate('Preschoolplayer',{videoLink: item.videoSource, videoTitle:item.title, pageId: 10} )}> 
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
