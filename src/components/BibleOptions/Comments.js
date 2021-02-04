import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
export default function Comments() {
    const [datag, setDatag] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [showHide, setShowHide] = useState(false);
    const getComments =async()=>{
        const favs = await AsyncStorage.getItem('_comments');
        var data = JSON.parse(favs)
        setDatag(data);
        // setDataChanged(true);
    }

    useEffect(() => {
        getComments();
    }, [1])
    return (
        <View style ={{height:'100%', width:'100%', backgroundColor:'#fff'}}>
        <FlatList
        data={datag}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
           <View style={{margin:'1%'}}>
            <Text style = {styles.title}>{item.title}</Text>
            <Text
              style={styles.text}>
              {item.details}
            </Text>
            <TouchableOpacity style={styles.button}
             onPress={()=>{showHide?setShowHide(!showHide):setShowHide(!showHide)}}
            >
            {showHide?(<Text>Hide Comment</Text>):(<Text>Show Comment</Text>)}
            </TouchableOpacity>
            {showHide?(<Text
              style={styles.comments}>
              {item.comment}
            </Text> ):null}
            </View>
         
        )}
      />
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
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
        
        
        
    },
    comments:{
        fontFamily:'Nunito-Regular',
        fontSize:12,
        lineHeight:24,
        letterSpacing:0.5,
        fontWeight:'400',
        marginLeft:'2%',
        marginRight:'2%',
        alignSelf:'flex-start',
        textAlign:'justify', 
    },
    button: {
        justifyContent: 'center',
        alignContent:'center',
        backgroundColor: '#c5cad2',
        width: '40%',
        height:'20%',
        alignSelf:'flex-end',
        marginRight: '5%',
        borderRadius: 6,
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 4,
        marginTop:'1%',
        padding: '4%',
        
      },
})
