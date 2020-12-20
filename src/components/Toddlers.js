import React from 'react';
import {View, Image, Text, FlatList, SafeAreaView} from 'react-native';

const Toddlers = () =>{

    return(
        <View>
            <View style={styles.item}>
                <Image style={styles.image}/>
                <View>
                    <Text>Lesson</Text>
                    <Text>Videos</Text>
                </View>

                <View style={styles.line}/>
            </View>
        </View>
    );
}

const styles = {

    item:{

    },
    image:{

    },
    line:{

    }
}

export default Toddlers;