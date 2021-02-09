import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  
  { 
    id:1, 
    topic:'Church Videos', 
    img: 'https://i.ibb.co/PMR3vYw/Rectangle-101.png', 
    title:"Lesson", 
    details:"Videos",
    link: "Toddler"
  },
  { 
    id: 2, 
    topic:'School Videos',
    img: 'https://i.ibb.co/nrQzWgC/Rectangle-101-1.png', 
    title:"Lesson", 
    details:"Videos",
    link: "Toddler"
  },
];

{/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/nrQzWgC/Rectangle-101-1.png" alt="Rectangle-101-1" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/175Syt2/Rectangle-101-2.png" alt="Rectangle-101-2" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/w0D48T4/Rectangle-101-3.png" alt="Rectangle-101-3" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/80LXq7s/Rectangle-101-4.png" alt="Rectangle-101-4" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/vBtvhSG/Rectangle-101-5.png" alt="Rectangle-101-5" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/4KFmktL/Rectangle-101-6.png" alt="Rectangle-101-6" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/y5scyZt/Rectangle-101-7.png" alt="Rectangle-101-7" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/T0c03Nz/Rectangle-101-8.png" alt="Rectangle-101-8" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/5K1kNj9/Rectangle-101-9.png" alt="Rectangle-101-9" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/PMR3vYw/Rectangle-101.png" alt="Rectangle-101" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/HYbxdmc/Rectangle-102-1.png" alt="Rectangle-102-1" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/TYMG1s3/Rectangle-102-2.png" alt="Rectangle-102-2" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/hL5PBPc/Rectangle-102.png" alt="Rectangle-102" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/JdSvYPm/Rectangle-103-1.png" alt="Rectangle-103-1" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/zS7Yr8z/Rectangle-103.png" alt="Rectangle-103" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/b1KnZZQ/Rectangle-104-1.png" alt="Rectangle-104-1" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/txRRLXq/Rectangle-104.png" alt="Rectangle-104" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/MZM4yML/Rectangle-105-1.png" alt="Rectangle-105-1" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/gyMDTxT/Rectangle-105.png" alt="Rectangle-105" border="0"></a>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/b5qHjHR/Rectangle-209.png" alt="Rectangle-209" border="0"></a> */}


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

export default function ToddlerIntro({navigation, route}) {
    const {option} = route.params;
    {{navigation.setOptions({title:option})}}
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity 
            onPress={()=> navigation.navigate(item.link, {option: 'Toddler'})}> 
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
