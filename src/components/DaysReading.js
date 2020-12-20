import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Bible} from '../components/common/KJVBible';
import {AllBibleBooks} from '../components/common/RedingData';
import Icon from 'react-native-vector-icons/Ionicons';
import Tts from 'react-native-tts';

const fetchBibleData = biblePassage => {
  var todaysReadingdata = [];
  var oldAndNew = biblePassage.split(';');
  var oldTestamentBook;
  var oldRange;
  var oldRanges = [];
  var newTestamentBook;
  var newRange;
  var newVerserange;

  // this gets old testament list of books
  if ((oldAndNew[0].trim().match(/ /g) || []).length > 1) {
    oldTestamentBook = oldAndNew[0]
      .trim()
      .substring(0, oldAndNew[0].trim().lastIndexOf(' ', 0));
    oldRange = oldTestamentBook[1].split('-');
  } else {
    oldTestamentBook = oldAndNew[0].split(' ');
    oldRange = oldTestamentBook[1].split('-');
  }
  if (oldRange.length == 2) {
    for (var i = parseInt(oldRange[0]); i <= parseInt(oldRange[1]); i++) {
      oldRanges.push(i);
    }
  } else {
    oldRanges.push(oldRange[0]);
  }
  // this gets new testament book and list of verses

  if ((oldAndNew[1].trim().match(/ /g) || []).length > 1) {
    newTestamentBook = [];
    newTestamentBook.push(
      oldAndNew[1].trim().substring(0, oldAndNew[1].trim().lastIndexOf(' ')),
    );
    newTestamentBook.push(
      oldAndNew[1]
        .trim()
        .substring(
          oldAndNew[1].trim().lastIndexOf(' '),
          oldAndNew[1].trim().length,
        ),
    );
    newRange = newTestamentBook[1].split(':');
  } else {
    newTestamentBook = oldAndNew[1].trim().split(' ');
    if (newTestamentBook.length == 1) {
      newRange = '1';
    } else {
      newRange = newTestamentBook[1].split(':');
    }
  }

  if (newRange.length == 2) {
    newVerserange = newRange[1].split('-');
  }
  //    console.log(oldAndNew[1].trim());
  //    console.log(newVerserange);
  //    console.log(newRange);
  //    console.log(newTestamentBook);

  for (var i = 0; i < AllBibleBooks[0]['books'].length; i++) {
    if (
      AllBibleBooks[0]['books'][i]['bookName'].trim() ===
      oldTestamentBook[0].trim()
    ) {
      for (var k = oldRanges[0]; k <= oldRanges[oldRanges.length - 1]; k++) {
        var indx = k - 1;

        var oldTestamentPassage = '';
        var oldAudioVerses = [];
        var oldTestamentBookname = AllBibleBooks[0]['books'][i]['bookName'];
        var oldTestamentChapter = k;
        var oldTestamentVerses =
          '1 - ' + Bible[0]['books'][i]['chapters'][indx]['verses'].length;
        var oldTestamentDescription =
          Bible[0]['books'][i]['chapters'][indx]['verses'][0]['description'];
        for (
          var j = 0;
          j < Bible[0]['books'][i]['chapters'][indx]['verses'].length;
          j++
        ) {
          var thisPassage =
            '' +
            (j + 1) +
            '. ' +
            Bible[0]['books'][i]['chapters'][indx]['verses'][j]['scr'] +
            '\n';
          oldAudioVerses.push(' ' + thisPassage + ' \n');
          oldTestamentPassage = oldTestamentPassage + thisPassage;
        }
        todaysReadingdata.push({
          bookName: oldTestamentBookname,
          chapter: oldTestamentChapter,
          verses: oldTestamentVerses,
          plan: oldTestamentPassage,
          title: oldTestamentDescription,
          audioData: oldAudioVerses,
        });
      }
    }
  }

  for (var indexx = 0; indexx < AllBibleBooks[1]['books'].length; indexx++) {
    if (
      AllBibleBooks[1]['books'][indexx]['bookName'].trim() ===
      newTestamentBook[0].trim()
    ) {
      if (newRange.length > 1) {
        var newTestamentPassage = '';
        var newAudioVerses = [];
        var newTestamentDescription =
          Bible[1]['books'][indexx]['chapters'][
            parseInt(newRange[0].trim()) - 1
          ]['verses'][0]['description'];
        for (
          var kk = parseInt(newVerserange[0].trim());
          kk <= parseInt(newVerserange[1].trim());
          kk++
        ) {
          var indxx = kk - 1;

          var thisnewPassage =
            '' +
            kk +
            '. ' +
            Bible[1]['books'][indexx]['chapters'][
              parseInt(newRange[0].trim()) - 1
            ]['verses'][indxx]['scr'] +
            '\n';
          newAudioVerses.push(' ' + thisnewPassage + ' \n');
          newTestamentPassage = newTestamentPassage + thisnewPassage;
        }
        todaysReadingdata.push({
          bookName: newTestamentBook[0],
          chapter: newRange[0],
          verses: newVerserange[0] + ' - ' + newVerserange[1],
          plan: newTestamentPassage,
          title: newTestamentDescription,
          audioData: newAudioVerses,
        });
      } else {
        var newTestamentPassage = '';
        console.log(
          'index: ' +
            indexx +
            ' Chapter:' +
            newRange[0] +
            Bible[1]['books'][indexx]['bookName'],
        );
        var newTestamentDescription =
          Bible[1]['books'][indexx]['chapters'][
            parseInt(newRange[0].trim()) - 1
          ]['verses'][0]['description'];

        var newverses =
          '1 - ' +
          Bible[1]['books'][indexx]['chapters'][
            parseInt(newRange[0].trim()) - 1
          ]['verses'].length;
        for (
          var j = 0;
          j <
          Bible[1]['books'][indexx]['chapters'][
            parseInt(newRange[0].trim()) - 1
          ]['verses'].length;
          j++
        ) {
          var thisnewPassage =
            '' +
            (j + 1) +
            '. ' +
            Bible[1]['books'][indexx]['chapters'][
              parseInt(newRange[0].trim()) - 1
            ]['verses'][j]['scr'] +
            '\n';
          newTestamentPassage = newTestamentPassage + thisnewPassage;
        }
        todaysReadingdata.push({
          bookName: newTestamentBook[0],
          chapter: newRange[0].trim(),
          verses: newverses,
          plan: newTestamentPassage,
          title: newTestamentDescription,
        });
      }
    }
  }

  return todaysReadingdata;
};

export default function DaysReading({route}) {
  const {biblePassage} = route.params;
  const [bibleData, setBibleData] = useState(fetchBibleData(biblePassage));
  const [TtsState, setTtsState] = useState(false);

  const read = async () => {
    setTtsState(true);
    Tts.setDefaultLanguage('en-IE');
    var vss = 0;
    for (var i = 0; i < bibleData.length; i++) {
      await Tts.speak(bibleData[i].bookName);
      var splitVerses = bibleData[i].verses.split('-');
      var verses = splitVerses[0] + ' to ' + splitVerses[1];
      await Tts.speak(bibleData[i].chapter + ' verses ' + verses);
      for (var j = 0; j < bibleData[i].audioData.length; j++) {
        await Tts.speak(bibleData[i].audioData[j]);
      }
    }
  };

  const stopReading = () => {
    Tts.stop();
    setTtsState(false);
  };

  return (
    <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
      <FlatList
        data={bibleData}
        keyExtractor={item => item.bookName + item.chapter}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'column',
              //alignItems: 'baseline',
              margin: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Nunito-SemiBold',
                fontSize: 16,
                color: '#000',
                textAlign: 'justify',
                fontWeight: 'bold',
                marginLeft: 10,
                marginRight: 10,
              }}>
              {item.bookName} {item.chapter} : {item.verses}
            </Text>

            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                marginRight: 10,
                color: '#000',
                fontFamily: 'Nunito-Regular',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                color: '#000',
                textAlign: 'justify',
                fontFamily: 'Nunito-Regular',
              }}>
              {item.plan}
            </Text>
          </View>
        )}
      />
      <View style={styles.controlsView}>
        {TtsState ? (
          <TouchableOpacity
            onPress={() => stopReading()}
            style={{alignSelf: 'center'}}>
            <Icon name="stop" color="black" size={36} opacity={1} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => read()}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <Icon
                name="md-chevron-back-sharp"
                color="black"
                size={30}
                opacity={1}
              />

              <Icon name="play-sharp" color="black" size={30} opacity={1} />

              <Icon
                name="md-chevron-forward"
                color="black"
                size={30}
                opacity={1}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    opacity: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
