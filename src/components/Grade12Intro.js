import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  
  { 
    id:1, 
    topic:'Church Videos', 
    img: 'https://g.christianbook.com/g/slideshow/0/0772001/main/0772001_1_ftc.jpg', 
    title:"Lesson", 
    details:"Videos",
    link: "Grade1"
  },
  { 
    id: 2, 
    topic:'School Videos',
    img: 'https://www.colourbox.com/preview/5188380-noah-ark.jpg', 
    title:"Lesson", 
    details:"Videos",
    link: "Grade1"
  },
];


const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#e8e8e8', //e8e8e8
        }}
      />
    );
  };

export default function Grade12Intro({navigation, route}) {
    const {option} = route.params;
    {{navigation.setOptions({title:option})}}
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
            onPress={()=> navigation.navigate(item.link, {option: 'School Curriculum'})}> 


                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 10,
                      marginLeft: 20,
                      marginBottom: 12,
                      marginTop: 16,
                      color: '#000',
                    }}>
                    {item.topic}
                  </Text>

            <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 10,
                  marginLeft: 20,
                  marginBottom: 16,
                }}>
                <Image style={styles.img} source ={{uri:item.img}} />
                 
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      color: '#212121',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      marginLeft: 10,
                      color: '#8d8b8b',
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
    img:{width:80, 
        height:80,
        borderRadius: 5,
        shadowOpacity: 1,
        shadowRadius: 2,
        resizeMode:'cover',
    
    }
})
