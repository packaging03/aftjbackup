import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  Picker,
} from 'react-native';
import CButton from './common/CustomButton';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';
// import {Picker} from '@react-native-community/picker';
import ToggleSwitch from 'toggle-switch-react-native';
import Spinner from './common/Spinner';

function Addnote({navigation, accessToken, user}) {
  const [theme, setTheme] = useState('');
  const [name, setName] = useState('');
  const [ptext, setPtext] = useState('');
  const [note, setNote] = useState('');
  //const [mystate, setMystate] = useState('');
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState('');

  const toggleBulletin = () => {
    setVisible(previousState => !previousState);
  };

  const AddATestimony = () => {
    if (accessToken === null) {
      alert('Kindly Login first');
      return;
    }

    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (reg.test(email) === false) {
    //   Toast.show("Your email is  Incorrect!")
    //   return false;
    // }
    else {
      //console.log("Email is Correct");
      setLoading(true);
      if (
        name === '' ||
        theme === '' ||
        ptext === '' ||
        visible === '' ||
        note === ''
      ) {
        alert('All fields are required');
        setLoading(false);
        return;
      } else {
        fetch('https://church.aftjdigital.com/api/add-note', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            theme: theme,
            text: ptext,
            note: note,
            reminder: visible,
            preachers_name: name,
            token: accessToken,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            if (
              JSON.stringify(responseJson.message) !==
              'Note Created succesfully'
            ) {
              //alert(responseJson.message)
              Toast.show(responseJson.message);
              navigation.navigate('NoteRoot');
              setLoading(false);
              return;
            }
            //alert(responseJson.message)
            setName('');
            setTheme('');
            setPtext('');
            setNote('');
            s('');
            setMystate('');
            setVisible('');
            setLoading(false);
          })
          .catch(error => {
            alert(error);
          });
        setLoading(false);
      }
    }
  };

  function renderButton(loading, setLoading) {
    if (loading) {
      return <Spinner />;
    }

    return <CButton onPress={() => AddATestimony()}>Submit</CButton>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Theme of Message</Text>
        <TextInput
          multiLine={false}
          onChangeText={tex => setTheme(tex)}
          value={theme}
          style={styles.source}
        />
        <Text style={styles.header}>Bible Text</Text>
        <TextInput
          multiLine={false}
          onChangeText={tex => setPtext(tex)}
          value={ptext}
          style={styles.source}
        />
        <Text style={styles.header}>Preacher's Name</Text>
        <TextInput
          multiLine={false}
          onChangeText={tex => setName(tex)}
          value={name}
          style={styles.source}
        />

        <Text style={styles.header}>Note</Text>
        <TextInput
          multiline
          numberOfLines={10}
          onChangeText={text => setNote(text)}
          value={note}
          style={styles.input}
        />

        <View style={styles.notification}>
          <Text style={styles.text}>Reminder</Text>

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <ToggleSwitch
              onColor="#219653"
              offColor="#C4C4C4"
              onToggle={toggleBulletin}
              isOn={visible}
            />
          </View>
        </View>

        {/* <View
        style={{
          alignSelf: 'flex-end',
          marginRight: -10,
          width: 220,
          flex: 1,
          marginBottom: 100,
          display: 'flex',
        }}>
        <CButton onPress={() => AddATestimony()}>SHARE</CButton>
      </View> */}
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
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  user: state.user.user,
});

export default connect(mapStateToProps)(Addnote);
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
    justifyContent: 'flex-start',
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
    marginLeft: 26,
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
    marginBottom: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
    width: '58%',
    marginLeft: 8,
    fontFamily: 'Nunito-Regular',
  },
});
