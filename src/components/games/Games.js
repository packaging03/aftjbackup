import react from 'react';
import {View, Text, Image} from 'react-native';
 

const Games = () => {
    return (
        <View>
             <Image
            style={{
                alignSelf:'center',
                width:180,
                height:140,
                marginTop:50, 
                marginBottom:50

            }}
            source={require('../../assets/quiz.png')} />
            
            <Text>Quiz</Text>

            <Image
            style={{
                alignSelf:'center',
                width:180,
                height:140,
                marginTop:50, 
                marginBottom:50

            }}
            source={require('../../assets/crossword.png')} />
            <Text>Crossword</Text>
        </View>
    )
}

export default Games;