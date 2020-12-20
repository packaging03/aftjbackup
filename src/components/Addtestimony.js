import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, Alert} from 'react-native';
import CButton from '../components/common/CustomButton';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-community/picker';
import ToggleSwitch from 'toggle-switch-react-native';


function Addtestimonies({navigation, accessToken, user}) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mystate, setMystate] = useState('');
  const [category, setCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState('');

  const toggleBulletin = () => {
    setVisible(previousState => !previousState);
  };

  function renderButton(loading, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return (
      <CButton
        onPress={() => {

          if (accessToken === null) {
            alert('Kindly Login first');
            return;
          }
      
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          var cleanStr = email;
          setEmail(cleanStr.trim())
          if (reg.test(email) === false) {
            Toast.show("Your email is  Incorrect!")
            return false;
          }
          else {
            console.log("Email is Correct");
            setLoading(true);
            if (name === '' || email === '' || country === '' || mystate === '' || category === '' || content === '' || reg.test(email) === false) {
              alert('All fields are required');
              setLoading(false);
              return
            } else {
        
              fetch('https://church.aftjdigital.com/api/add-testimony', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                          body: JSON.stringify({
                            
                            user_id: JSON.parse(user).id,
                            category: category,
                            body: content,
                            state: mystate,
                            email: email,
                            country: country,
                            name: name,
                            status: false,
                            token: accessToken,
                          
                          })
                        })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (JSON.stringify(responseJson.message) !== 'Testimony Created succesfully') {
                               alert(responseJson.message)
                               setLoading(false);
                                navigation.navigate('TestimonyRoot')
                               return;
                            }
                            //alert(responseJson.message)
                            setName('');
                            setCategory('');
                            setContent('');
                            setCountry('');
                            setEmail('');
                            setMystate('');
                            setVisible('');
                            setLoading(false);
                        })
                        .catch((error) => {
                          alert(error)});
                          setLoading(false);
            }
          }
      
          // if (password != '' && newPassword != '' && (newPassword === newcPassword)) {
          //       setLoading(true);
          //       const emailCred = auth.EmailAuthProvider.credential(
          //         auth().currentUser.email,
          //         password,
          //       );

          //         auth()
          //         .currentUser.reauthenticateWithCredential(emailCred)
          //         .then(() => {
          //           return auth()
          //             .currentUser.updatePassword(newcPassword)
          //             .then(() => {
          //               fetch('https://church.aftjdigital.com/api/users/' +
          //                   JSON.parse(user).id,
          //                 {
          //                   method: 'PUT',
          //                   headers: {
          //                     Accept: 'application/json',
          //                     'Content-Type': 'application/json',
          //                   },
          //                   body: JSON.stringify({
          //                     password: newPassword,
          //                     token: accessToken,
          //                   }),
          //                 })
          //                   .then(response => response.json())
          //                   .then(responseJson => {
                              
          //                     try {
          //                       setCurrentUser(auth().currentUser);
          //                       setPassword('');
          //                       setNewPassword('');
          //                       setCNewPassword('');
          //                       Toast.show('Your new password has been changed', Toast.LONG);
          //                       setLoading(false);
          //                       navigation.navigate("Profile");

          //                     } catch (e) {
          //                       alert(e);
          //                       setLoading(false);
          //                     }
          //                   })
          //                   .catch((error) => {
          //                     Toast.show(error)
          //                     setLoading(false);
          //                 })
          //             })
          //             .catch(error => {
          //               setLoading(false);
          //               Toast.show(error.code)
          //               switch (error.code) {
                          
          //                 case 'auth/wrong-password':
          //                   return alert('Your Password is incorrect');

          //                 case 'auth/weak-password':
          //                   return alert(
          //                     'Your Password should be at least 6 characters',
          //                   );
          //               }
          //             });
          //         })
          //         .catch(error => {
          //           setLoading(false);
          //           Toast.show(error.code)
          //           switch (error.code) {
                      
          //             case 'auth/wrong-password':
          //               return alert('Your Password is incorrect');

          //             case 'auth/weak-password':
          //               return alert(
          //                 'Your Password should be at least 6 characters',
          //               );
          //           }
          //         });
          //       } else {
          //         setLoading(false);
          //         alert('Ensure all fields are properly filled and your password matched!');
          //       }
        
        } 
      
      }
        >
          
          SHARE
      </CButton>
    );
  }

  const AddATestimony = () => {
    if (accessToken === null) {
      alert('Kindly Login first');
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email.trim()) === false) {
      Toast.show("Your email is  Incorrect!")
      return false;
    }
    else {
      console.log("Email is Correct");

      if (name === '' || email === '' || country === '' || mystate === '' || category === '' || content === '') {
        alert('All fields are required');
      } else {
  
        fetch('https://church.aftjdigital.com/api/add-testimony', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                  },
                    body: JSON.stringify({
                      
                      user_id: JSON.parse(user).id,
                      category: category,
                      body: content,
                      state: mystate,
                      email: email,
                      country: country,
                      name: name,
                      status: false,
                      token: accessToken,
                    
                    })
                  })
                  .then((response) => response.json())
                  .then((responseJson) => {
                      if (JSON.stringify(responseJson.message) !== 'Testimony Created succesfully') {
                         alert(responseJson.message)
                          navigation.navigate('TestimonyRoot')
                         return;
                      }
                      //alert(responseJson.message)
                      setName('');
                      setCategory('');
                      setContent('');
                      setCountry('');
                      setEmail('');
                      setMystate('');
                      setVisible('');
                  })
                  .catch((error) => {
                    alert(error)});
      }



    }


  };

  return (
    <ScrollView>
    <View style={styles.container}>
    
      <Text style={styles.header}>
        Name
      </Text>
      <TextInput
        multiLine={false}
        onChangeText={tex => setName(tex)}
        value={name}
        style={styles.source}
      />
      <Text style={styles.header}>
        Email
      </Text>
      <TextInput
        multiLine={false}
        onChangeText={tex => setEmail(tex)}
        value={email}
        style={styles.source}
      />
      <Text style={styles.header}>
        Country
      </Text>
      <TextInput
        multiLine={false}
        onChangeText={tex => setCountry(tex)}
        value={country}
        style={styles.source}
      />
      <Text style={styles.header}>
        State
      </Text>
      <TextInput
        multiLine={false}
        onChangeText={tex => setMystate(tex)}
        value={mystate}
        style={styles.source}
      />

      <Text style={styles.header, {marginTop: -10} }>
        
      </Text>
      <Text style={styles.header}>
        Category
      </Text>

      <View style={{ height: 40, marginTop: 10, width: '90%', borderColor: '#c5cad2',
        borderWidth: 1,
        borderRadius: 8,
        marginLeft: 17,
        paddingBottom: 23,
        fontSize: 16,
        textAlign: 'left',
        letterSpacing: 0.5,
        lineHeight: 20,
        fontFamily: 'Nunito-Regular',
        fontWeight: '400',}}>

        <Picker
          mode="dropdown"
          style={{marginTop: -6}}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
            setCategory(itemValue)
          }>
          <Picker.Item label="Family" value="Family" />
          <Picker.Item label="Single" value="Career" />
          <Picker.Item label="Others" value="Others" />
        </Picker>

      </View>
      
      <Text style={styles.header}>
        Testimony
      </Text>
      <TextInput
        multiline
        numberOfLines = {10}
        onChangeText={text => setContent(text)}
        value={content}
        style={styles.input}
      />

    <View style={styles.notification}>
        
        <Text style={styles.text}>Anonymous</Text>

        <View
          style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <ToggleSwitch
            onColor = "#219653"
            offColor = "#C4C4C4"
            onToggle={toggleBulletin}
            isOn={visible}
          />
        </View>
      </View>
      
      
      <View
        style={{
          alignSelf: 'flex-end',
          marginRight: -10,
          width: 220,
          flex: 1,
          marginBottom: 100,
          display: 'flex',
        }}>
          {renderButton(loading, setLoading)}
        {/* <CButton onPress={() => AddATestimony()}>SHARE</CButton> */}
      </View>
    </View>
  
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
export default connect(mapStateToProps)(Addtestimonies);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    marginBottom: 80,
  },
  input: {
    width: '90%',
    height: '25%',
    borderColor: '#c5cad2',
    borderWidth: 0.8,
    borderRadius: 8,
    textAlignVertical: 'top',
    justifyContent: "flex-start",
    marginTop: 5,
    marginRight: 14,
    marginLeft: 14,
    fontSize: 12,
    marginBottom: '10%',
    alignSelf: 'center',
  },
  
  
  source: {
    width: '90%',
    height: 38,
    borderColor: '#c5cad2',
    borderWidth: 0.8,
    borderRadius: 8,
    marginTop: 5,
    marginRight: 14,
    marginLeft: 14,
    fontSize: 12,
    alignSelf: 'center',
  },
  header: {
    marginTop: 15,
    marginLeft: 17,
    fontSize: 16,
    textAlign: 'left',
    letterSpacing: 0.5,
    lineHeight: 25,
    fontFamily: 'Nunito-Regular',
    fontWeight: '400',
  },
  notification: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom:10,
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc'
  },
  text: {
    fontSize: 16,
    width: '58%',
    marginLeft: 8,
    fontFamily: 'Nunito-Regular',
  },
});