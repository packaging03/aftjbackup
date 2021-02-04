import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  
  { 
    id:1, 
    topic:'Church Videos', 
    img: 'https://i.ibb.co/4KFmktL/Rectangle-101-6.png', 
    title:"Lesson", 
    details:"Videos",
    link: "Grade1",
    showtopic: true,
  },
  { 
    id: 2, 
    topic:'',
    img: 'https://i.ibb.co/hL5PBPc/Rectangle-102.png', 
    title:"God Loves Me", 
    details:"Memory Verses",
    link: "Grade Memory Verse",
    showtopic: false,
  },
  { 
    id: 3, 
    topic:'School Videos',
    img: 'https://i.ibb.co/y5scyZt/Rectangle-101-7.png', 
    title:"Lesson", 
    details:"Videos",
    link: "Grade1",
    showtopic: true,
  },
];

const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#e8e8e8',
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
            
            (!item.showtopic) ? 
            <TouchableOpacity 
            onPress={()=> navigation.navigate(item.link, {option: 'Grade 1-2'})}>
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
                      fontFamily: 'Nunito',
                      color: '#212121',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 12,
                      fontFamily: 'Nunito',
                      marginTop: 6,
                      color: '#8d8b8b',
                    }}>
                    {item.details}
                  </Text>
                </View>
              </View>
              </TouchableOpacity>
            : 
            <TouchableOpacity 
            onPress={()=> navigation.navigate(item.link, {option: 'Grade 1-2'})}> 
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 20,
                      marginBottom: 12,
                      marginTop: 30,
                      fontFamily: 'Nunito',
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
                      fontFamily: 'Nunito',
                      color: '#212121',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 12,
                      fontFamily: 'Nunito',
                      marginTop: 6,
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
