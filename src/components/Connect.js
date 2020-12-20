import React, {useState} from 'react';

import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  SafeAreaView,
  Linking,
  StatusBar,
  Modal,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Connect = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const _OpenLink = url => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.connect}>
    <StatusBar backgroundColor="transparent" translucent/>
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="close"
              onPress={() => setModalVisible(!modalVisible)}
              color={'#000'}
              style={{position: 'absolute', top: 15, right: 15}}
              size={25}
            />

            <TouchableOpacity
              style={{width: '100%', marginTop: 12}}
              onPress={() =>
                _OpenLink(
                  'https://www.youtube.com/channel/UC9Vn8tkYBAMXU7dDNZ_p6ag',
                )
              }>
              <View style={styles.openWith}>
                <Icon
                  style={styles.icon}
                  name="logo-youtube"
                  color={'red'}
                  size={25}
                />
                <Text style={styles.openWithText}>Open with youtube</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%', height: 90}}
              onPress={() => _OpenLink('https://www.instagram.com/jccigt/')}>
              <View style={styles.openWith}>
                <Icon
                  style={styles.icon}
                  name="logo-instagram"
                  color={'#962fbf'}
                  size={25}
                />
                <Text style={styles.openWithText}>Open with Instagram</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() =>
                _OpenLink('https://web.facebook.com/jccihouseofglory/')
              }>
              <View style={styles.openWith}>
                <Icon
                  style={styles.icon}
                  name="logo-facebook"
                  color={'#3b5998'}
                  size={25}
                />
                <Text style={styles.openWithText}>Open with Facebook</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                marginTop: 18,
                height: 0.5,
                backgroundColor: '#000',
              }}
            />
            <Text style={{color: '#191C52', textAlign: 'left', margin: 10}}>
              Use a different app
            </Text>
          </View>
        </View>
      </Modal>

      <View style={{display:'flex', flex:1, flexDirection:'column', }}>
        <TouchableOpacity
         style={{height:170,   width:'100%', marginTop:16, marginBottom:16}}
          onPress={() => navigation.navigate('NewBulletin')}>
            
            <Image
             
              style={styles.img}
              source={require('../assets/bulletin-img.png')}/>
          
        </TouchableOpacity>
        
        
      <View style={styles.row}>
        <View style={{display:'flex', flexDirection:'column', width:'50%'}}>
        <TouchableOpacity
         style={{height:170, width:'100%', marginBottom:16}}
            onPress={() => navigation.navigate('NewMember')}>
              <View>
              <Image
                style={styles.img}
                
                source={require('../assets/new-member-img.png')}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          style={{height:170, width:'100%'}}
            onPress={() => setModalVisible(!modalVisible)}>
            
              <Image
                style={styles.img}
                source={require('../assets/teen-church-img.png')}/>
            
          </TouchableOpacity>
        </View>

        <View style={{display:'flex', flexDirection:'column', width:'50%'}}>
        <TouchableOpacity
          style={{height:170, width:'100%',  marginBottom:16}}
          onPress={() => navigation.navigate('Homecell')}>
          
            <Image
              style={styles.img}
              source={require('../assets/homecell-img.png')}/>
         
        </TouchableOpacity>

        <TouchableOpacity
          style={{height:170, width:'100%'}}
          onPress={() => navigation.navigate('ChildrenChurch')}>
        
            <Image
              style={styles.img}
              source={require('../assets/children-church-img.png')}/>
         
        </TouchableOpacity>
        </View>
      </View>
      

        </View>

        
    </View>
    </SafeAreaView>
  );
};
export default Connect;

const styles = {
  connect: {
    width:'100%',
    height:'100%',
   
  },
  row:{
    width:'100%',
    marginBottom:16,
    flexDirection:'row',
    justifyContent:'space-evenly'
    
  },
  img: {
    width: '100%',
    height:'100%',
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    zIndex: 10,
    fontWeight: '300',
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    marginTop: 45,
    alignSelf: 'center',
  },
  centeredView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    width: '100%',
    bottom: 0,
  },
  modalView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    width: '100%',
    backgroundColor: '#191C52',
    borderRadius: 20,
    padding: 10,
    marginTop: '10%',
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 19,
  },
  openWith: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginRight: 25,
  },
  openWithText: {
    fontSize: 14,
    letterSpacing: 2,
  },
};
