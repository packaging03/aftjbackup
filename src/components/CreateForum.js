import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';

const CreatForum = ({accessToken, user})=>{

    const [topic, setTopic] = useState('');
    const [theme, setTheme] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState('');
    const [id, setId] = useState(JSON.parse(user).id);

    const AddNewForum = ()=>{

        if(topic==''){
            alert('please enter topic');
        }else if(theme==''){
            alert('please enter theme')
        }else{

            fetch('https://church.aftjdigital.com/api/forum/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                    body: JSON.stringify({
                        topic: topic,
                        theme: theme,
                        image: image,
                        user_id: id,
                    }),
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson.message)
                    Toast.show(responseJson.message, Toast.LONG);

                    setTopic('');
                    setTheme('');
                })
                    .catch(error => {
                    alert(error);
                });
                console.log(image)

        }
    }

    const openCamera = () => {
        let options = {
          quality: 0.1,
          maxWidth: 500,
          maxHeigth: 500,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        ImagePicker.launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {imageData: response.data, type: response.type, uri: response.uri};
                const imageFile = 'data:'+source.type+';base64,'+source.imageData;
                setImage(imageFile);

            }
        });
    };

    return(
        <View style = {styles.container}>
            <Text style={styles.text}>Topic</Text>
            <View style={styles.topic}>
                <TextInput
                    onChangeText={text => setTopic(text)}
                    value = {topic}
                />
            </View>
            <Text style={styles.textTheme}>Theme</Text>
            <View style={styles.theme}>
            <TextInput 
                    multiline = {true}
                    onChangeText={text => setTheme(text)}
                    value = {theme}
                />
            </View>
            <View style={styles.controls}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon.Button
                        name="camera"
                        size={25}
                        color="#000"
                        backgroundColor="#fff"
                        onPress = {openCamera}
                    />
                    <TouchableOpacity>
                        <View>
                            <Image style= {{width: 22, height: 22}} source={require('../image/file.png')}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress = {AddNewForum}>
                    <View>
                        <Text style={{fontWeight: 'bold'}}>ADD</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {image?<Text style={{paddingTop: 30, fontSize:15}}>Camera image uploaded</Text>: ()=>{}}
            {file?<Text style={{paddingTop: 5, fontSize:15}}>Additional files added</Text>: ()=>{}}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff'
    },

    controls:{
        width:'100%',
        height:40,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '35%',
        height: 40,
        backgroundColor: '#c5cad2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: 'Nunito'
    },

    textTheme:{
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 25,
        fontFamily: 'Nunito'
    },

    topic:{
        width: '100%',
        height: '7%',
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 6,
        borderRadius: 5
    },

    theme: {
        width: '100%',
        height: '30%',
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 6,
        borderRadius: 5
    }
})

const mapStateToProps = state => ({
    accessToken: state.user.accessToken,
    user: state.user.user,
  });

export default connect(mapStateToProps)(CreatForum);