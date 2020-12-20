import React from 'react';

import {View, ActivityIndicator} from 'react-native';

const Spinner = ({size}) => (
    <View style={styles.spinner}>
        <ActivityIndicator size={size} />
    </View>
);


const styles = {
    spinner:{
        flex:1,
        justifyContent:'center',
        slignItems:'center'
    }
}
export default Spinner;