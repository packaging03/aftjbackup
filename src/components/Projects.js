import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {Container, Header, Left, Body, Right, Button, Title} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
const {width, height} = Dimensions.get('window');

export default function Projects({navigation}) {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      let response = await fetch(
        'https://church.aftjdigital.com/api/church-projects',
      );
      let responseJson = await response.json();

      setProjects(responseJson['data']);
      //   console.log(responseJson['data']);
    } catch (error) {
      //   console.warn(error);
    }
  };

  navigation.setOptions({
    headerRight: () => (
      <View style={{margin: 15}}>
        <Button transparent>
          <AntDesign name="printer" color="#000" size={20} />
        </Button>
      </View>
    ),
  });

  useEffect(() => {
    getProjects();
  }, [1]);

  return (
    <Container>
      <View>
        <Text style={styles.churProject}>Church Projects</Text>
      </View>

      <View style={styles.contain}>
        <View>
          <Text style={styles.txt}>Name</Text>
        </View>
        <View style={{marginHorizontal: 35}}>
          <Text style={[styles.txt, {marginLeft: 6}]}>Start Date</Text>
        </View>
        <View>
          <Text style={styles.txt}>End Date</Text>
        </View>
        <View style={{marginHorizontal: 35}}>
          <Text style={[styles.txt, {marginRight: 8}]}>Cost ($)</Text>
        </View>
      </View>
      <View style={styles.line} />
      <ScrollView>
        {projects.map(item => {
          return (
            <View key={item.id}>
              <View style={styles.contain}>
                <View>
                  <Text style={styles.inTXT}>{item.name}</Text>
                </View>
                <View style={{marginHorizontal: 30}}>
                  <Text style={styles.inTXT}>{item.star_date}</Text>
                </View>
                <View>
                  <Text style={styles.inTXT}>{item.end_date}</Text>
                </View>
                <View style={{marginHorizontal: 30}}>
                  <Text style={styles.inTXT}>{item.cost}</Text>
                </View>
              </View>
              <View style={styles.line} />
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  churProject: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginLeft: 10,
    marginTop: 10,
    lineHeight: 16,
    fontWeight: '600',
  },
  contain: {
    marginLeft: 13,
    marginRight: 10,
    flexDirection: 'row',
    marginTop: 15,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 2,
  },
  txt: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400',
    lineHeight: 16,
    fontSize: 12,
  },
  inTXT: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '300',
    lineHeight: 16,
    fontSize: 12,
  },
});
