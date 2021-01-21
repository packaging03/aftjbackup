// import {Content} from 'native-base';
// import React, {Component} from 'react';
// import {Text, StyleSheet, View, Dimensions, Platform} from 'react-native';
// import {
//   Container,
//   Header,
//   Left,
//   Body,
//   Right,
//   Button,
//   Drawer,
//   Title,
// } from 'native-base';

// import AntDesign from 'react-native-vector-icons/AntDesign';

// import SideLocation from './SideLocation';
// import GoogleMap from './GoogleMap';

// const {width, height} = Dimensions.get('window');

// export default class LocationPage extends Component {
//   closeDrawer = () => {
//     this.drawer._root.close();
//   };
//   openDrawer = () => {
//     this.drawer._root.open();
//   };

//   render() {
//     const {navigation} = this.props;
//     return (
//       <Drawer
//         ref={ref => {
//           this.drawer = ref;
//         }}
//         side="right"
//         content={
//           <SideLocation
//             close={this.closeDrawer}
//             navigation={this.props.navigation}
//           />
//         }
//         onClose={() => this.closeDrawer()}>
//         {/* <Header
//           androidStatusBarColor={Platform.OS == 'android' ? '#000' : '#fff'}
//           style={{backgroundColor: '#fff'}}>
//           <Left>
//             <Button transparent onPress={() => navigation.goBack()}>
//               <AntDesign name="arrowleft" color="#000" size={20} />
//             </Button>
//           </Left>
//           <Body>
//             <Title style={{color: '#000'}}>Location</Title>
//           </Body>
//           <Right />
//         </Header> */}

//         <GoogleMap side={this.openDrawer} />
//       </Drawer>
//     );
//   }
// }

// const styles = StyleSheet.create({});

import React, {useEffect} from 'react';
import {View, Text, Linking} from 'react-native';

export default function LocationPage() {
  useEffect(() => {
    (async () => {
      await Linking.openURL(
        'https://www.google.com/maps/place/JCCI+GLORY+TABERNACLE/@33.8745141,-84.6397579,13z/data=!4m5!3m4!1s0x88f53d24892de1e3:0x45070693fba9652c!8m2!3d33.8745141!4d-84.6397579',
      );
    })();
    return () => {};
  }, []);
  return null;
}
