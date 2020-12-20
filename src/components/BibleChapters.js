import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

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

const getAllCahpters = (bibleBook, bookchapters, testament) => {
  var data = [];
  for (var i = 1; i <= bookchapters; i++) {
    data.push({id: i, bookName: bibleBook, theTestament: testament});
  }
  return data;
};
export default function BibleChapters({navigation, route}) {
  const {book, numberofChapters, testament} = route.params;
  const [Data, setData] = useState(
    getAllCahpters(book, numberofChapters, testament),
  );
  {
    {
      navigation.setOptions({title: 'The Book of ' + book});
    }
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#ffffff',
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: '#ffffff',
          flex: 1,

          marginTop: 10,
        }}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BibleVerses', {
                  thisbook: item.bookName,
                  thischapter: item.id,
                  thistestament: item.theTestament,
                })
              }>
              <View
                style={{
                  flexDirection: 'column',

                  margin: 15,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    color: '#000',
                    fontWeight: '600',
                  }}>
                  {item.bookName} {item.id}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
