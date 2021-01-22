import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import CButton from '../components/common/CustomButton';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';


function AddMemoryVerse({navigation, accessToken, user}) {
  const [source, setSource] = useState('');
  const [content, setContent] = useState('');

  const AddAMemoryVerse = () => {
    if (accessToken === null) {
      alert('Please Login first');
      return;
    }
    if (source === '' || content === '') {
      alert('Both fields are required' + " " + source + " " + content);
    } else {
      
      fetch('https://church.aftjdigital.com/api/memoryverse', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: JSON.parse(user).id,
          title: source,
          body: content,
          token: accessToken,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          Toast.show(responseJson.message, Toast.LONG);
            setSource('');
            setContent('');
            navigation.push('Grade Memory Verse');
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Title
      </Text>
      <TextInput
        multiLine={false}
        onChangeText={tex => setSource(tex)}
        value={source}
        style={styles.source}
        //placeholder="Memory verse Source (e.g John 3:16)"
      />
      <Text style={styles.header}>
        Message
      </Text>
      <TextInput
        multiline={true}
        onChangeText={text => setContent(text)}
        value={content}
        style={styles.input}
        //placeholder=" e.g: For God so loved the world, that he gave his only begotten son, that whosoever believes in him shall not perish."
      />
      
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
    height: '8%',
    borderColor: '#c5cad2',
    borderWidth: 0.8,
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
