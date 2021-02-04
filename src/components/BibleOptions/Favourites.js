import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity,Button} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
export default function Favourites() {
  const [datag, setDatag] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
    const getFavs =async()=>{
        const favs = await AsyncStorage.getItem('_favourites');
        var data = JSON.parse(favs)
        setDatag(data);
        setDataChanged(true);
    }

    useEffect(() => {
        getFavs();
    }, [1])
    return (
        <View style ={{height:'100%', width:'100%', backgroundColor:'#fff'}}>
            <FlatList
        data={datag}
        keyExtractor={item => item.id}
        extraData = {dataChanged}
        renderItem={({item}) => (
          
           
           <View>
            <Text style = {styles.title}>{item.title}</Text>
            <Text
              style={styles.text}>
              {item.details}
            </Text>
            </View>
         
        )}
      />
      
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        marginTop:'2%',
        marginLeft:'2%',
        marginRight:'2%',
        marginBottom:'1%',
        fontFamily:'Nunito-SemiBold',
        fontSize:16,
        lineHeight:26,
        fontWeight:'600',

    },
    text:{
        fontFamily:'Nunito-Regular',
        fontSize:12,
        lineHeight:24,
        letterSpacing:0.5,
        fontWeight:'400',
        marginLeft:'2%',
        marginRight:'2%',
        alignSelf:'center',
        textAlign:'justify',
        
        
    }
})
