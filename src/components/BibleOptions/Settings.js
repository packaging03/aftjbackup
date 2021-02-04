import React,{useState} from 'react'
import { StyleSheet, Text, View, Switch , StatusBar, Picker} from 'react-native'
// import { Dropdown } from 'react-native-material-dropdown';

export default function Settings({navigation}) {
    const [isNotificationEnabled, setNotificationEnabled] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");
    const toggleNotifiction= () =>
    setNotificationEnabled(previousState => !previousState);

    let data = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];

    return (
        <View style={{backgroundColor: '#fff', height: '100%', width:'100%'}}
            onPress={()=>setModalVisible(false)}
        >
      
        <StatusBar backgroundColor="transparent" translucent />
        <View style={styles.containers}>
            <Text style={styles.text}>Quotation Notification</Text>
        <Switch
          trackColor={{false: '#000', true: '#219653'}}
          thumbColor={isNotificationEnabled ? '#fff' : '#fff'}
          ios_backgroundColor="#219653"
          onValueChange={toggleNotifiction}
          value={isNotificationEnabled}
          style={{alignSelf: 'flex-end'}}
        />
        </View>
        <View style={styles.containers}>
            <Text style={styles.text}>Notification Time</Text>
            <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="🟩" value="green" />
        <Picker.Item label=" :blue_square" value="green" />
        <Picker.Item label="🟥" value="red" />
      </Picker>
        
        </View>
            
        <View style={styles.containers}>
            <Text style={styles.text}>Font Size</Text>
        {/* <Dropdown
        label='Favorite Fruit'
        data={data}
      /> */}
        </View>
        <View style={styles.containers}>
            <Text style={styles.text}>Highlight Color</Text>
        
        </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontFamily:'Nunito-SemiBold',
        fontSize:14,
        lineHeight:16,
        letterSpacing:0.5,
        fontWeight:'400',
        marginLeft:'4%',
        marginRight:'37%',
        marginTop:25
    },
    containers:{
        
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            alignContent:'space-between',
            width: '100%',
         
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        height:100,
      },
    
      
})
