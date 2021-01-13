import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Clipboard,
  Share,
} from 'react-native';
import {Bible} from '../components/common/KJVBible';
import {AllBibleBooks, ReadingData} from '../components/common/RedingData';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/Ionicons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import CButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import ActionSheet from 'react-native-action-sheet';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const getBibleVerses = (book, inChapter, testament) => {
  var chapter = inChapter - 1;
  var index;
  var datverses = [];
  // console.warn(retriveBible(book, inChapter));
  // console.warn(inChapter);
  // if (retriveBible(book, inChapter) != null) {
  //   return retriveBible(book, chapter);
  // } else {
  for (var i = 0; i < AllBibleBooks[testament]['books'].length; i++) {
    if (AllBibleBooks[testament]['books'][i]['bookName'].trim() === book) {
      index = i;
      break;
    }
  }
  var verses = [];
  for (
    var j = 0;
    j < Bible[testament]['books'][index]['chapters'][chapter]['verses'].length;
    j++
  ) {
    var thisVerse =
      Bible[testament]['books'][index]['chapters'][chapter]['verses'][j]['scr'];
    verses.push({
      verse_id: j + 1,
      verse_details: thisVerse.trim(),
      isSelected: false,
      itemstyle: {backgroundColor: '#fff'},
      isHighlighted: false,
      isFavourited: false,
      comment: '',
    });
    datverses.push('' + (j + 1) + ' ' + thisVerse + ' \n');
  }
  var thisTitle = Bible[testament]['books'][index]['title'];
  var data = [];
  data.push({
    bookName: book,
    chapterValue: inChapter,
    verse: verses,
    title: thisTitle,
    audioVerses: datverses,
  });
  return data;
  // }
};

const previous = (book, curChapter, testament, datavalue) => {
  if (curChapter > 1) {
    return getBibleVerses(book, curChapter - 1, testament);
  } else {
    return datavalue;
  }
};

const next = (book, curChapter, testament, datavalues) => {
  var index;
  for (var i = 0; i < AllBibleBooks[testament]['books'].length; i++) {
    if (AllBibleBooks[testament]['books'][i]['bookName'].trim() === book) {
      index = i;
      break;
    }
  }
  if (curChapter < Bible[testament]['books'][index]['chapters'].length) {
    return getBibleVerses(book, curChapter + 1, testament);
  } else {
    return datavalues;
  }
};

const addData = async (book, chapter, data) => {
  var _key = '' + String(book) + '' + String(chapter);
  await AsyncStorage.setItem(_key, JSON.stringify(data));
  return 'nawaoo';
};

const updateBible = async (book, chapter, data) => {
  var thisVals = await AsyncStorage.getItem('' + book + chapter);
  if (thisVals.X == null) {
    try {
      await AsyncStorage.removeItem('' + book + chaptr).then(inf => {
        console.log(info);
      });
    } catch (error) {
      console.warn(error);
    }
  } else {
    addData(book, chapter, data);
  }
};

const retriveBible = async (book, chapter) => {
  var vals = await AsyncStorage.getItem('_Keys');

  return vals;
  // var checks = {_U: 0, _V: 0, _W: null, _X: null};
  // if (vals == checks) {
  //   return null;
  // } else {
  //   return vals;
  // }
};

export default function BibleContent({navigation, route}) {
  const {thisbook, thischapter, thistestament} = route.params;
  const [bibleData, setData] = useState(
    getBibleVerses(thisbook, thischapter, thistestament),
  );
  const [vChapter, setChapter] = useState(bibleData[0]['chapterValue']);
  const [ttsStatus, setStatus] = useState('initiliazing');
  const [voice, setVoice] = useState();
  const [speechRate, setRate] = useState(0.5);
  const [speechPitch, setPitch] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [refreshMain, setRefreshMain] = useState(false);
  const [TtsState, setTtsState] = useState(false);
  const [bibleActions, setBibleActions] = useState('color');
  const [modalVisible, setModalVisible] = useState(false);
  const [highlightColor, setHilightColor] = useState('#FF6E04');
  const [value, onChangedText] = useState('');
  const [verse, setVerse] =useState('');
  const [details, setDetails] =useState('');



  const boxColors = [
    '#C5CAD2',
    '#219653',
    '#FEF40A',
    '#FF0100',
    '#FF6E04',
    '#FB13C8',
    '#000000',
    '#3402FC',
  ];

  const config = {
    velocityThreshold: 0.4,
    directionalOffsetThreshold: 60,
  };

  var BUTTONSiOS = [
    'Highlight this verse',
    'Add to favourite ',
    'Copy this verse',
    'Listen to this verse',
    'Add comment to this verse',
    'Share this verse',
    'Change highlight color',
    'Delete',
    'Cancel',
  ];

  var BUTTONSandroid = [
    'Highlight this verse',
    'Add to favourite ',
    'Copy this verse',
    'Listen to this verse',
    'Add comment to this verse',
    'Share this verse',
    'Change highlight color',
  ];

  var DESTRUCTIVE_INDEX = 7;
  var CANCEL_INDEX = 9;

  const readChapter = async contents => {
    setTtsState(true);
    Tts.setDefaultLanguage('en-IE');
    var book = bibleData[0].bookName;
    var chapter = bibleData[0].chapterValue;
    var title = bibleData[0].title;
    var theverse = bibleData[0].audioVerses;
    var content = book + ' Chapter ' + chapter;
    // Tts.addEventListener('tts-finish', event => console.log(event));
    // console.log(Tts.speak(content));
    await Tts.speak(content);

    var vss = 0;
    for (var i = 0; i < theverse.length; i++) {
      await Tts.speak(theverse[i]);
      vss += 1;
    }
    console.log('lenght: ' + theverse.length);
    console.log('vss: ' + vss);
    // theverse.length === vss ? await Tts.stop() : null;
  };

  const read = async content => {
    await Tts.speak(content, {
      // androidParams: {
      //   KEY_PARAM_PAN: -1,
      //   KEY_PARAM_VOLUME: 0.5,
      //   KEY_PARAM_STREAM: 'STREAM_MUSIC',
      // },
    });
  };

  const addFavourite= async (book, chapter, verse_id,verse)=>{
    var data = {id:book+chapter+verse_id, title:book+" "+chapter+":"+verse_id, details:verse};
    var favorites = await AsyncStorage.getItem("_favourites");
    
    if (favorites==null){
      var dataArr =[];
      dataArr.push(data);
      await AsyncStorage.setItem("_favourites", JSON.stringify(dataArr));
      
    }else{
      await AsyncStorage.removeItem("_favourites");
      var favi =JSON.parse(favorites);
      favi.push(data);
      await AsyncStorage.setItem("_favourites", JSON.stringify(favi));
    }
    
  }

  const saveComment=async (book, chapter,verse_id,verse,comments)=>{
    if (value==""){

    }else{
      var data = {id:book+chapter+verse_id, title:book+" "+chapter+":"+verse_id, details:verse, comment:comments};
    var comment_s = await AsyncStorage.getItem("_comments");
    
    if (comment_s==null){
      var dataArr =[];
      dataArr.push(data);
      await AsyncStorage.setItem("_comments", JSON.stringify(dataArr));
      setModalVisible(!modalVisible);
      
    }else{
      await AsyncStorage.removeItem("_comments");
      var commen =JSON.parse(comment_s);
      commen.push(data);
      await AsyncStorage.setItem("_comments", JSON.stringify(commen));
      setModalVisible(!modalVisible);
    }
    }

  }

  const stopChapterReading = () => {
    Tts.stop();
    setTtsState(false);
  };

  const previousChapter = chaps => {
    console.log(chaps);
    var theChapter = chaps;
    var chapterData = previous(thisbook, chaps, thistestament, bibleData);
    setData(chapterData);
    setChapter(chapterData[0]['chapterValue']);
    stopChapterReading();
  };

  const nextChapter = chps => {
    var theChapters = chps;
    var theChapterData = next(thisbook, chps, thistestament, bibleData);
    setData(theChapterData);
    setChapter(theChapterData[0]['chapterValue']);
    stopChapterReading();
  };

  //Render colorbox

  const renderColorBox = backcolor => {
    return (
      <View style={{alignItems: 'center', marginRight: 5}}>
        <TouchableOpacity
          onPress={() => {
            setHilightColor(backcolor);
            setRefreshMain(!refreshMain);
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 4,
              backgroundColor: backcolor,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  //modals to display color and add comments

  const renderModals = bibleAction => {
    if (bibleAction == 'color') {
      return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <Icon
                name="close"
                onPress={() => setModalVisible(!modalVisible)}
                color={'#000'}
                style={{position: 'absolute', top: 15, right: 15}}
                size={28}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginTop: -10,
                  color: '#000',
                  marginBottom: 20,
                  fontFamily: 'Nunito-Regular',
                  fontWeight:'600'
                }}>
                Select a color
              </Text>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '80%',
                }}>
                {renderColorBox(boxColors[0])}
                {renderColorBox(boxColors[1])}
                {renderColorBox(boxColors[2])}
                {renderColorBox(boxColors[3])}
                {renderColorBox(boxColors[4])}
                {renderColorBox(boxColors[5])}
                {renderColorBox(boxColors[6])}
                {renderColorBox(boxColors[7])}
              </View>
            </View>
          </View>
        </Modal>
      );
    } else if (bibleAction == 'comment') {
      return (
        
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Comment</Text>

              <View
                style={{
                  width: '100%',
                  height: '40%',
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderRadius: 1,
                  borderColor: '#000',
                }}>
                <TextInput
                  keyboardType="default"
                  autoFocus={true}
                  style={{
                    width: '100%',
                    height: '100%',
                    alignSelf: 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  value={value}
                  onChangeText={text => onChangedText(text)}
                />
              </View>
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginRight: "-10%",
                  width: "50%",
                  flex: 1,
                  marginTop: '7%',
                  display: 'flex',
                }}>
                <CButton
                  onPress={saveComment(thisbook, thischapter,verse,details,value)}
                >Submit</CButton>
              </View>
            </View>
          </View>
        
      );
    }
  };

  const onShare = async shareVerse => {
    try {
      const result = await Share.share({
        message: shareVerse + '\n\n\n Shared from AFTj Church App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // useEffect(() => {}, [1]);
  {
    {
      navigation.setOptions({title: 'The Book of ' + thisbook});
    }
  }

  return (
    <GestureRecognizer
      onSwipeLeft={() => nextChapter(vChapter)}
      onSwipeRight={() => previousChapter(vChapter)}
      config={config}
      style={{
        flex: 1,
      }}>
      <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View>{renderModals(bibleActions)}</View>
        </Modal>
        <FlatList
          data={bibleData}
          keyExtractor={item => item.bookName + item.chapter}
          extraData={refreshMain}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'baseline',
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 21,
                  color: '#000000',
                  textAlign: 'justify',
                  fontWeight: 'bold',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                {item.bookName} {item.chapterValue}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  margin: 10,
                  color: '#000000',
                }}>
                {item.title}
              </Text>
              {/* <Text
              style={{
                fontSize: 15,
                marginLeft: 10,
                color: '#000000',
                textAlign: 'justify',
              }}>
              {item.verse}
            </Text> */}

              <FlatList
                data={item.verse}
                keyExtractor={item => item.verse_id}
                extraData={refresh}
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'baseline',
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        item.isSelected = !item.isSelected;
                        item.itemstyle = item.isHighlighted
                          ? item.isSelected
                            ? {backgroundColor: highlightColor, opacity: 0.7}
                            : {backgroundColor: highlightColor, opacity: 0.7}
                          : item.isSelected
                          ? {backgroundColor: '#C5CAD2', opacity: 0.7}
                          : {backgroundColor: '#fff'};
                        setRefresh(!refresh);
                        // setBibleActions('comment');
                        // setModalVisible(!modalVisible);
                      }}
                      onLongPress={() => {
                        // item.isSelected ? alert('How far now?') : null;
                        item.isSelected = !item.isSelected;
                        item.itemstyle = item.isHighlighted
                          ? item.isSelected
                            ? {backgroundColor: highlightColor, opacity: 0.7}
                            : {backgroundColor: highlightColor, opacity: 0.7}
                          : item.isSelected
                          ? {backgroundColor: '#C5CAD2', opacity: 0.7}
                          : {backgroundColor: '#fff'};
                        setRefresh(!refresh);

                        ActionSheet.showActionSheetWithOptions(
                          {
                            options: BUTTONSandroid,
                            cancelButtonIndex: CANCEL_INDEX,
                            destructiveButtonIndex: DESTRUCTIVE_INDEX,
                            tintColor: 'blue',
                          },
                          buttonIndex => {
                            switch (buttonIndex) {
                              case 0:
                                item.isHighlighted = item.isHighlighted
                                  ? null
                                  : !item.isHighlighted;
                                item.itemstyle = {
                                  backgroundColor: highlightColor,
                                  opacity: 0.7,
                                };
                                addData(
                                  bibleData[0].bookName,
                                  bibleData[0].chapterValue,
                                  bibleData[0],
                                );
                                setRefresh(!refresh);
                                break;
                              case 1:
                                addFavourite(bibleData[0].bookName,
                                  bibleData[0].chapterValue,
                                  item.verse_id,
                                  item.verse_details
                                  )
                                break;
                              case 2:
                                item.isSelected
                                  ? Clipboard.setString(
                                      bibleData[0].bookName +
                                        ' ' +
                                        bibleData[0].chapterValue +
                                        ':' +
                                        item.verse_id +
                                        ' ' +
                                        item.verse_details,
                                    )
                                  : alert('You did not select a verse');
                                break;
                              case 3:
                                item.isSelected
                                  ? read(
                                      bibleData[0].bookName +
                                        'Chapter ' +
                                        bibleData[0].chapterValue +
                                        ', Verse ' +
                                        item.verse_id +
                                        '.' +
                                        item.verse_details,
                                    )
                                  : alert('Select a verse ');
                                break;
                              case 4:
                                setVerse(item.verse_id);
                                setDetails(item.verse_details);
                                setBibleActions('comment');
                                setModalVisible(!modalVisible);
                                break;
                              case 5:
                                item.isSelected
                                  ? onShare(
                                      bibleData[0].bookName +
                                        ' ' +
                                        bibleData[0].chapterValue +
                                        ':' +
                                        item.verse_id +
                                        ' ' +
                                        item.verse_details,
                                    )
                                  : alert('You did not select any verse');
                                break;
                              case 6:
                                setBibleActions('color');
                                setModalVisible(!modalVisible);
                                break;
                            }
                            console.log('button clicked :', buttonIndex);
                          },
                        );
                      }}>
                      <View style={item.itemstyle}>
                        <Text
                          style={{
                            fontFamily: 'Nunito-Regular',
                            fontSize: 14,
                            fontWeight: '400',
                            marginBottom: '0.5%',
                            lineHeight: 22,
                            color: '#000',
                            textAlign: 'justify',
                          }}>
                          {bibleData[0].chapterValue}:{item.verse_id}{' '}
                          {item.verse_details}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
        />
        <View style={styles.controlsView}>
          <TouchableOpacity onPress={() => previousChapter(vChapter)}>
            <Icon
              name="md-chevron-back-sharp"
              color="#000"
              size={34}
              opacity={1}
            />
          </TouchableOpacity>
          {TtsState ? (
            <TouchableOpacity onPress={() => stopChapterReading()}>
              <Icon name="pause-outline" color="black" size={34} opacity={1} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => readChapter()}>
              <Icon name="play-sharp" color="black" size={34} opacity={1} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => nextChapter(vChapter)}>
            <Icon
              name="md-chevron-forward"
              color="#000"
              size={34}
              opacity={1}
            />
          </TouchableOpacity>
        </View>
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  controlsView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    opacity: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  selected: {
    backgroundColor: '#222222',
  },
  list: {
    backgroundColor: '#fff',
  },
  modalText: {
    fontSize: 18,
    marginTop: -10,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Nunito-Bold',
    alignSelf: 'flex-start',
  },
  centeredView: {
    flex: 1,
height:"80%",
width:'95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '80%',
    marginLeft:10,
    marginRight:10
  },
  modalView: {
    // margin: 10,
    height: 200,
    width: '100%',
    // backgroundColor:"red",
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    width: '100%',
    backgroundColor: '#c5cad2',
    borderRadius: 5,
    padding: 10,
    marginTop: '10%',
    elevation: 2,
  },
  centeredView1: {
    // flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
    top: 516,
    // marginTop: 22
  },
  modalView1: {
    // margin: 20,
    height: '100%',
    width: '100%',
    // backgroundColor:"red",
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
