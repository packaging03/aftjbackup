import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  { 
    id:1, 
    videoSource:'FVtTB71Mxkc', 
    img: 'https://i.ibb.co/T0c03Nz/Rectangle-101-8.png', 
    title:"Salvation", 
    details:"Salvation Story for Kids"
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

export default function Grade7({navigation, route}) {
    const {option} = route.params;
    {{navigation.setOptions({title:option})}}
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>navigation.navigate('Preschoolplayer',{videoLink: item.videoSource, videoTitle:item.title, pageId: 27} )}> 
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