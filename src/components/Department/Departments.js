import React, { useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, TouchableWithoutFeedback,  Text} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Departments = ({navigation}) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
          let response = await fetch('https://church.aftjdigital.com/api/departments');
          let json = await response.json();
          console.log(json.data);
          setData(json.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);

    const renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#CED0CE',
              marginLeft: '1%',
            }}
          />
        );
      };
      const Item = ({title, onPress}) => (
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              display: 'flex',
              padding: 10,
              flexDirection: 'row',
            }}>
           
            <Text
              style={{
                marginLeft: 10,
                color: '#000',
                fontSize: 14,
                width: '70%',
                fontWeight: 'normal',
                alignSelf: 'center',
                fontFamily: 'Nunito-Light',
                flexWrap: 'wrap',
                flex: 1,
              }}>
              {title}
            </Text>

            <Icon name="chevron-forward-outline" size={20} color="black"/>
          </View>
        </TouchableWithoutFeedback>
      );

      const renderItem = ({item}) => (
        <Item
          title={item.title}
          onPress={() =>
            navigation.navigate('Description', {
              title: item.title,
              description: item.description,
            })
          }
        />
      );

    return(
        <View style={{backgroundColor:'white', flex:1}}>

          <Text style={{marginLeft: 10,
                color: '#000',
                fontSize: 16,
                width: '100%',
                fontWeight: 'normal',
                padding:10,
                alignSelf: 'center',
                fontWeight:'400',
                fontFamily: 'Nunito'}}>List of Departments</Text>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#CED0CE',
              marginLeft: '1%',
            }}
          />
          {
            loading ? <ActivityIndicator/> : (
            <FlatList
              data={data} 
              renderItem={renderItem} 
              ItemSeparatorComponent={renderSeparator} 
              keyExtractor={item => item.id.toString()}/>
          )}

        </View>
    )
}

export default Departments;