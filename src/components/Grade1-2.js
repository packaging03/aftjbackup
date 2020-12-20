import React, { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, StatusBar }
 from 'react-native'

const data=[{id:'1', videoSource:'https://g.christianbook.com/g/slideshow/0/0772001/main/0772001_1_ftc.jpg',
title:'Lessons',details:'Videos'},
{id:'2', videoSource:'https://i.ytimg.com/vi/1EzW-tnZ-Lw/maxresdefault.jpg',
    title:'God loves me',details:'Memory Verses'}];

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
    

export default function Grade1({route, navigation}) {

  const {title} = route.params;

  useEffect(() => navigation.setOptions({ title: title }));

    function nav(id){
        if (id==2){
            navigation.navigate('Grade Memory Verse')
        }else{
            navigation.navigate('PreSchool' , {option: title})
        }
    };
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
          <StatusBar backgroundColor="transparent" translucent />
        <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>nav(item.id)}> 
          <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 14,
              }}>
              <Image style={styles.img} source ={{uri:item.videoSource}} />
               
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 20,
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
    img:{
        width:70, 
        height:70,
        borderRadius: 6,
        shadowOpacity: 1,
        shadowRadius: 2,
        resizeMode:'cover',
    
    }
})
