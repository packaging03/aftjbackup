import React, {useEffect, useState} from 'react';
import {Image, ActivityIndicator, FlatList, TouchableWithoutFeedback, View, Text} from 'react-native';
import CustomButton from '../common/CustomButton';
import Toast from 'react-native-simple-toast';

const Resources = ({navigation}) => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    var videos = [];
    var ids = [];
            
    var x = 0;
    const getData = async () => {
        try {
        let response = await fetch('https://church.aftjdigital.com/api/beginner-class');
        let json = await response.json();
        console.log(json.data);
        setData(json.data);
        setLoading(false);
        } catch (error) {
          console.error(error.name);
          if (error.message == 'Network request failed'){
            Toast.show('Internet Connection Error', Toast.LONG);
          }
        }
    };

    useEffect(() => {
        getData();
        //function to show auth alert call
       
    }, []);

        
    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#CED0CE',
              marginLeft: '1%',
            }}
          />
        );
      };

      const Item = ({item, onPress}) => {
        
        x = x+ 1;
        ids.push(item.id);

        return(
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              display: 'flex',
              padding: 10,
              alignItems:'center',
              flexDirection: 'row',
              justifyContent:'space-between',
              marginLeft:8,
              marginRight:8,
              width:'85%'
            }}>

              <Text style={{marginRight: 5}}>{x}.</Text>
            <Image
              style={{
                width: '40%',
                height: 80,
                borderRadius: 5,
                shadowOpacity: 1,
                shadowRadius: 2,
                resizeMode: 'cover',
              }}
              source={require('../../assets/sermons2.png')}
            />
            <View style={
                { 
                    width: '70%', 
                    // height:'80%',
                    display:'flex', 
                    flexDirection:'column',
                    alignItems:'flex-start',
                    marginLeft:8,
                    justifyContent:'space-between',
                    marginRight: 5,}}>
                <Text
                style={{
                    
                    color: '#000',
                    fontSize: 14,
                    textTransform:'capitalize',
                    fontWeight: '500',
                    fontFamily: 'Nunito',
                    flexWrap: 'wrap',
                    
                    
                }}>
                {item.title}
                </Text>
                <Text
                style={{
                    
                    color: '#000',
                    fontSize: 14,
                    textTransform:'capitalize',
                    fontFamily: 'Nunito-Regular',
                    flexWrap: 'wrap',
                    
                }}>
                {item.pastor}
                </Text>
                <Text
                style={{
                    
                    color: '#000',
                    fontSize: 12,
                    textTransform:'capitalize',
                    fontFamily: 'Nunito-Light',
                    flexWrap: 'wrap',
                    
                }}>
                {item.body ? '':'Our Church'}
                </Text>
            </View>
            
          </View>
        </TouchableWithoutFeedback>
      )};

      const renderItem = ({item}) => {
        
        videos.push(item.video);
        return(
        <Item
          item={item}
          onPress={() =>
            navigation.navigate('NM-Resource', {
              uri: item.video,
              id: item.id, 
              ids: ids,
              videos: videos
            //   id: item.video,
            //   date: item.date,
            //   overview: item.overview,
            //   preacher: item.preacher,
            //   audio: item.audio,
            //   sermonId: String(item.id),
            })
          }
        />
      )};

    return(
        <View style={{ flex:1, paddingTop:20, backgroundColor:'white'}}>

             <Text style={
                {fontFamily:'Nunito', 
                letterSpacing:0.5,
                fontWeight:'400',
                marginLeft:20,
                
                 fontSize:16, marginBottom:16}}>New Beginners Classes</Text>
            <Text style={styles.text}>This class is going to last for a period of 6 weeks</Text>

            <View
            style={{
              height: 1,
              width: '100%',
              marginTop:20,
              marginBottom:20,
              backgroundColor: '#CED0CE',
            }}
          />
           {isLoading ? (
          <ActivityIndicator size="large" style={{marginTop: 50}} />
        ) : (
          <FlatList
            style={{flex:1}}
            data={data}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}

        </View>
    )

}

const styles = {
    
    text:{
        fontFamily:'Nunito-Regular',
        fontSize:14,
        lineHeight:16,
        letterSpacing:0.5,
        marginLeft:20,
    }
}

export default Resources;