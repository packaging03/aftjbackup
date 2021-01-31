import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import CButton from '../components/common/CustomButton';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-community/picker';
import ToggleSwitch from 'toggle-switch-react-native';


function AddMemoryVerse({navigation, accessToken, user}) {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [mystate, setMystate] = useState('');
  const [category, setCategory] = useState('Family');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState('');


  const toggleBulletin = () => {
    setVisible(previousState => !previousState);
  };

  const AddAMemoryVerse = () => {
    if(visible)
    {
      setVisible(1)
    } else {
      setVisible(0)
    }
    console.log(visible)
    if (accessToken === null) {
      alert('Please Login first');
      return;
    }
    if (name === '' || email === '' || country === '' || mystate === '' || category === '' || content === '') {
      alert('All fields are required');
      
    } else {
      
      fetch('https://church.aftjdigital.com/api/add-testimony', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: JSON.parse(user).id,
          category: category,
          body: content,
          state: mystate,
          email: email,
          country: country,
          name: name,
          status: 0,
          token: accessToken,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          Toast.show(responseJson.message, Toast.LONG);
          if(responseJson.message != "Testimony Created succesfully")
          {
            Toast.show("You may need to log out and login again for this feature to work correctly!")
          }
          //Toast.show(accessToken)
          //Toast.show(JSON.parse(user).id)
          setName('');
          setCategory('');
          setContent('');
          setCountry('');
          setEmail('');
          setMystate('');
          setVisible('');
          navigation.push('TestimonyRoot');


        })
        .catch(error => {
          alert(error);
        });
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
          <Picker.Item label="Single" value="Single" />
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
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}>
        <View>
          <TouchableOpacity onPress={AddAMemoryVerse} style={styles.button}>
            <Text style={styles.text}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    </ScrollView>
      );
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
});

export default connect(mapStateToProps)(AddMemoryVerse);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    marginBottom: 280,
  },
  input: {
    width: '90%',
    height: '25%',
    borderColor: '#c5cad2',
    borderWidth: 0.8,
    marginTop: 5,
    marginRight: 14,
    marginLeft: 14,
    fontSize: 12,
    marginBottom: '10%',
    alignSelf: 'center',
    textAlignVertical: 'top'
  },
  source: {
    width: '90%',
    height: 45,
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
    marginTop: 10,
    marginLeft: 17,
    fontSize: 14,
    textAlign: 'left',
    letterSpacing: 0.5,
    lineHeight: 25,
    fontFamily: 'Nunito-Bold',
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
  
   button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5cad2',
    width: '80%',
    height: 35,
    borderRadius: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: 'row'
  }
});
