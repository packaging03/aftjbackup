import React, {Component} from 'react';
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
// const data = [
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 1,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 2,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 3,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 4,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 5,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 6,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 7,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 8,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 9,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 10,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 11,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 12,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 13,
//   },
//   {
//     sdate: '01/10/20',
//     edate: '01/10/20',
//     name: 'Widows',
//     cost: '$1,000,000',
//     id: 14,
//   },
// ];
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
import axios from 'axios';
export default class Projects extends Component {
  state = {
    project: [],
  };
  componentWillUnmount() {
    source.cancel();
  }
  componentDidMount() {
    this.getProjects();
  }

  getProjects = async () => {
    try {
      const resp = await axios.get(
        'https://church.aftjdigital.com/api/church-projects',
        {
          cancelToken: source.token,
        },
      );

      // console.log(resp.data.data);
      this.setState({project: resp.data.data});
    } catch (eaftj) {
      console.log(e.response.data);
    }
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Header androidStatusBarColor="#000" style={{backgroundColor: '#fff'}}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" color="#000" size={20} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#000'}}>Projects</Title>
          </Body>
          <Right>
            <Button transparent>
              <AntDesign name="printer" color="#000" size={20} />
            </Button>
          </Right>
        </Header>
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
        <View style={styles.line}></View>
        <ScrollView>
          {this.state.project.map((item) => {
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
                <View style={styles.line}></View>
              </View>
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    marginTop: 10,
  },
  churProject: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  contain: {
    marginLeft: 13,
    marginRight: 10,
    flexDirection: 'row',
    marginTop: 15,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 2,
  },
  txt: {fontWeight: 'bold'},
  inTXT: {},
});
