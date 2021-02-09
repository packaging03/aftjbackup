import React from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'

const data=[
  { 
    id:1, 
    videoSource:'VG3D9EOwSyc', 
    img: 'https://i.ibb.co/JdSvYPm/Rectangle-103-1.png', 
    title:"Adam and Eve story", 
    details:"Adam and Eve story"
  },
  { id:2, 
    videoSource:'ddbb6hlSsBE', 
    img: 'https://i.pinimg.com/originals/83/45/46/83454612be99ab58069b6c860c97c301.jpg', 
    title:"The fall man", 
    details:"The fall man"
  }, 
  { 
    id: 3, 
    videoSource:'l7TDvJrjjz0', 
    img: 'https://www.inspirationalchristians.org/images/joseph-dreams-1-1024x640.jpg', 
    title:"The sin of Adam and Eve", 
    details:"The sin of Adam and Eve"
  },
  { 
    id:4, 
    videoSource:'RkVm6Chgaww', 
    img: 'https://i.ytimg.com/vi/1EzW-tnZ-Lw/maxresdefault.jpg', 
    title:"Adam and Eve’s sin", 
    details:"Adam and Eve’s sin"
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

export default function Grade1({navigation, route}) {
    const {option} = route.params;
    {{navigation.setOptions({title:option})}}
    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
            <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={()=>navigation.navigate('SchoolCurriculumQuiz',{videoLink: item.videoSource, videoTitle:item.title, pageId: 12} )}> 
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


// import React, { useEffect } from 'react'
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, StatusBar }
//  from 'react-native'

// const data=[{id:'1', videoSource:'https://g.christianbook.com/g/slideshow/0/0772001/main/0772001_1_ftc.jpg',
// title:'Lessons',details:'Videos'},
// {id:'2', videoSource:'https://i.ytimg.com/vi/1EzW-tnZ-Lw/maxresdefault.jpg',
//     title:'God loves me',details:'Memory Verses'}];

//     const renderSeparator = () => {
//         return (
//           <View
//             style={{
//               height: 1,
//               width: '100%',
//               backgroundColor: '#CED0CE',
//             }}
//           />
//         );
//       };
    

// export default function Grade1({route, navigation}) {

//   const {title} = route.params;

//   useEffect(() => navigation.setOptions({ title: title }));

//     function nav(id){
//         if (id==2){
//             navigation.navigate('Grade Memory Verse')
//         }else{
//             navigation.navigate('PreSchool' , {option: title})
//         }
//     };
//     return (
//         <View style={{backgroundColor:'#fff', height:'100%'}}>
//           <StatusBar backgroundColor="transparent" translucent />
//         <FlatList
//         data={data}
//         keyExtractor={item => item.id}
//         renderItem={({item}) => (
//           <TouchableOpacity onPress={()=>nav(item.id)}> 
//           <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 margin: 14,
//               }}>
//               <Image style={styles.img} source ={{uri:item.videoSource}} />
               
//               <View style={{flexDirection: 'column'}}>
//                 <Text
//                   style={{
//                     fontSize: 20,
//                     marginLeft: 10,
//                     color: '#000',
//                     fontWeight: '600',
//                   }}>
//                   {item.title}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     marginLeft: 10,
//                     color: '#808080',
//                   }}>
//                   {item.details}
//                 </Text>
//               </View>

             
//             </View>
//             </TouchableOpacity>

//         )}
//         ItemSeparatorComponent={renderSeparator}
//       />
//       </View>
//     )
// }

// const styles = StyleSheet.create({
//     img:{
//         width:70, 
//         height:70,
//         borderRadius: 6,
//         shadowOpacity: 1,
//         shadowRadius: 2,
//         resizeMode:'cover',
    
//     }
// })
