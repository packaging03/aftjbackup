import React, { useState, useEffect } from 'react';
import {StatusBar, SafeAreaView, View, Text, FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const ShareWith = ({}) =>{
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    
  const getUsers = async () => {
    try {
      let response = await fetch('https://church.aftjdigital.com/api/users');
      //   console.log('response: ') + response;

      let json = await response.json();
      //   console.log(json);
      setData(json);
      setLoading(false);

      
      //   console.log('item: ' + arrayholder);
    } catch (error) {
      //   console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#000',
              marginLeft: '1%',
            }}
          />
        );
      };


    const renderItem = ({item}) => (
        <Text
          style={{fontSize: 14, fontFamily:'Nunito-Light', textTransform: 'capitalize', marginTop: 8}}
        //   onPress={() =>
        //     navigation.navigate('ContactDetails', {
        //       name: item.name,
        //       email: item.email,
        //       phone: item.phone,
        //     }) }
            >
          {item.name}
        </Text>
      );
    
      // const arrangeNames =({item})=>{
      //   const abcd ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      //   for (var i=0;i<abcd.length;i++){
      //     if (item.name.startsWith(abcd[i]&&))
      //   }
      // }
    
      return (
          <SafeAreaView style={{flex:1}}>

          
        <View style={styles.contacts}>
          <StatusBar backgroundColor="#fff" barStyle="light-content" />
          
          <Text style={styles.title}>Frequently Contacted</Text>
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#CED0CE',
              marginTop:5
            }}
          />
           <FlatList
              data={data}
              height={140}
              renderItem={renderItem}
              style={{paddingLeft: 20,}}
              initialNumToRender={3}
            //   ItemSeparatorComponent={renderSeparator}
              keyExtractor={item => item.id.toString()}
            />

        <Text style={styles.title}>Contacts</Text>
        <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#CED0CE',
              marginTop:5,
              
            }}
          />
          {isLoading ? (
            <ActivityIndicator style={{alignSelf: 'center'}} />
          ) : (
            <FlatList
              data={data}
              style={{paddingLeft: 20,}}
              renderItem={renderItem}
            //   ItemSeparatorComponent={renderSeparator}
              keyExtractor={item => item.id.toString()}
            />
          )}
        </View>
        </SafeAreaView>
      );
    };
    
    const styles = {
      contacts: {
        
        height: '100%',
        backgroundColor: '#fff',
      },
      title:{
        paddingLeft: 20,
        paddingTop:10,
        fontSize: 18, 
        fontFamily:'Nunito-Light',
      }
    };
    
    export default ShareWith;
    