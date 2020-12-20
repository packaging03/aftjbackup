import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Chats = ()=> {
    return(
        <View style= {styles.container}>
        <View style={styles.search}>
            <View style={styles.bar}>
                <TextInput
                    style={{flex:1}}
                    placeholder={'Search'}
                    />
                <Icon.Button
                    name="search-outline"
                    size={25}
                    color="#ccc"
                    backgroundColor="#fff"
                />
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },

    search:{
        width: '90%',
        height: 45,
        borderColor:'#ccc',
        borderWidth:1,
        marginTop: 20,
        borderRadius: 5
    },

    bar:{
        flexDirection:'row',
        marginLeft: 5
    }
})

export default Chats;