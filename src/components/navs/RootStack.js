import React from 'react';
import {StyleSheet, Text, View, Image, Button, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../SignUp';
import EmailVerification from '../EmailVerification';
import Help from '../Help';
import AvailableOnPaidVersion from '../subscription/AvailableOnPaidVersion';
import Icon from 'react-native-vector-icons/Ionicons';
import Answers from '../Answers';
import TestimonyDetails from '../TestimonyDetails';
import TestimonyRoot from '../TestimonyRoot';
import Alltestimony from '../Alltestimony';
import EditPassword from '../EditPassword';
import EditFullname from '../EditFullname';
import EditEmail from '../EditEmail';
import EnterAmount from '../giving/EnterAmountPage';
import EditOccupation from '../EditOccupation';
import EditDateofBirth from '../EditDateofBirth';
import ProfileFetchPrayerReq from '../../components/Profile/ProfileFetchPrayerRequest';
import PaymentsFetch from '../../components/Profile/PaymentsFetch';
import EditDepartment from '../EditDepartment';
import ForgotPassword from '../ForgotPassword';
import Login from '../Login';
import HomeScreen from '../UserLanding';
import Profile from '../Profile';
import Contacts from '../Contacts';
import Downloads from '../Downloads';
import ContactDetails from '../ContactDetails';
import NotificationSettings from '../NotificationSettings';
import PrivacySettingsNew from '../PrivacySettingsNew';
import Settings from '../Settings';
import AboutApp from '../AboutApp';
import {setUserToken} from '../../redux/user/user.actions';
import Resetsuccessful from '../Resetsuccesful';
import ResetPassword from '../ResetPassword';
import {connect} from 'react-redux';
import About from '../About';
import PrayerRequest from '../PrayerRequest';
import HomeCell from '../HomeCell';
import NewMember from '../NewMember';
import Sermons from '../Sermons';
import SermonDetails from '../SermonDetails';
import Events from '../Events';
import EventDetails from '../EventDetails';
import Iconn from 'react-native-vector-icons/AntDesign';
import Icono from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Connect from '../Connect';
import ShareWith from '../ShareWith';
import Home from '../Home';
import Location from '../Location';
import ChildrenChurch from '../ChildrenChurch';
import SpecialAnnouncements from '../SpecialAnnouncements';
import Announcements from '../Announcements';
import Bulletin from '../Bulletin';
import NewBulletin from '../NewBulletin';
import TodaysBulletin from '../TodaysBulletin';
import Giving from '../../components/giving/Giving';

import BibleHome from '../BibleHome';
import TodaysReading from '../DaysReading';
import BibleChapters from '../BibleChapters';
import BibleVerse from '../BibleContent';
import PreschoolVideoPlayer from '../PreschoolVideoPlayer';
import Grade1 from '../Grade1-2';
import Grade1MemoryVerse from '../Grade1MemoryVerse';
import AddMemoryVerse from '../AddMemoryVerse';
import ShareMemoryVerse from '../ShareMemoryVerse';
import Pastorschedule from '../Pastorschedule';
import Schedulecalendar from '../Schedulecalendar';
import Bookappointment from '../Bookappointment';
import Forum from '../Forum';
import BulletinQr from '../BulletinQr';
import CreateForum from '../CreateForum';
import SearchAllPages from '../SearchAllPages';
import Chats from '../Chats';
import Projects from '../Projects';
import VerifyCode from '../VerifyCode';
import Conversion from '../Conversion/Conversion';
import Departments from '../Department/Departments';
import DepartmentForm from '../Department/DepartmentForm';
import Description from '../Department/Description';
import ConversionForm from '../Conversion/ConversionForm';
import Confirmation from '../Conversion/Confirmation';
import NMConfirmation from '../NewMemberResources/Confirmation';
import NMResources from '../NewMemberResources/Resources';
import NMResource from '../NewMemberResources/Resource';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ForumMessages from '../ForumMessages';
import Activities from '../Profile/Activities';
import NoteRoot from '../NoteRoot';

import ChatRoom from '../ChatRoom';
import Addnote from '../Addnote';
import NoteDetails from '../NoteDetails';
import Editnote from '../Editnote';
import Suggestion from '../suggestion/Suggestion';
import MemoryVerseNew from '../MemoryVerseNew';

const Stack = createStackNavigator();
const RootStack = ({
  initialRouteName,
  setUserToken,
  navigation,
  initialParams,
}) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Login or Signup"
        component={HomeScreen}
        options={{
          headerBackTitleVisible: true,
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
            marginRight: 30,
            alignSelf: 'center',
          },
          headerTitle: 'AFTj Church',
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor="#fff"
              color="#000"
              onPress={() => setUserToken(2)}
            />
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#fff',
          },
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleStyle: {color: 'black'},
          headerTitle: 'Edit Profile',
          headerBackTitleVisible: true,
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              color="#000"
              backgroundColor="#fff"
              onPress={() => setUserToken(2)}
            />
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#000',
          },
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Forum"
        component={Forum}
        options={{
          title: 'Forum',
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },

          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                paddingRight: '30%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateForum')}>
                <Image
                  style={{width: 20, height: 20, marginRight: 15}}
                  source={require('../../assets/plus-sign.png')}
                />
              </TouchableOpacity>
              <Icon
                name="search-outline"
                size={25}
                backgroundColor="transparent"
                onPress={() => navigation.navigate('SearchHere')}
              />
            </View>
          ),

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="CreateForum"
        component={CreateForum}
        options={{
          title: 'Add Topic',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: styles.headerStyle,
        }}
      />

      <Stack.Screen
        name="Chats"
        component={Chats}
        options={{
          title: 'Chat Room',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: styles.headerStyle,
        }}
      />

      <Stack.Screen
        name="PrayerRequest"
        component={PrayerRequest}
        options={{
          title: 'Prayer Request',
          headerStyle: {
            backgroundColor: '#fff',
            headerTitleStyle: styles.headerStyle,
          },
        }}
      />

      <Stack.Screen
        name="BulletinQr"
        component={BulletinQr}
        options={{
          title: 'Bulletin',
          headerStyle: {
            backgroundColor: '#fff',
            headerTitleStyle: styles.headerStyle,
            headerTintColor: '#000',
          },
        }}
      />

      <Stack.Screen
        name="NewMember"
        component={NewMember}
        options={{
          title: 'New Member',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Suggestion"
        component={Suggestion}
        options={{
          title: 'New Member',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />
      
      <Stack.Screen
        name="Schedulecalendar"
        component={Schedulecalendar}
        options={{
          title: "Pastor's Schedules",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Pastorschedule"
        component={Pastorschedule}
        options={{
          title: "Pastor's Schedules",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

<Stack.Screen
        name="MemoryVerseNew"
        component={MemoryVerseNew}
        options={{
          title: "Memory Verse",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Bookappointment"
        component={Bookappointment}
        options={{
          title: 'Pastor Schedules',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Homecell"
        component={HomeCell}
        options={{
          title: 'Home Cell',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Search"
        component={SearchAllPages}
        options={{
          title: 'Search',
          headerTitleStyle: {color: 'black'},

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#000',
          },
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerTintColor: '#000',
          headerShown: true,
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor="#fff"
              color="#000"
              onPress={() => setUserToken(2)}
            />
          ),
        }}
      />

      <Stack.Screen
        name="AvailableOnPaidVersion"
        component={AvailableOnPaidVersion}
        options={{
          title: '',
          headerTitleStyle: {color: 'black'},

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#000',
          },
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerTintColor: '#000',
          headerShown: true,
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor="#fff"
              color="#000"
              onPress={() => setUserToken(2)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="ForumMessages"
        component={ForumMessages}
        options={{
          title: 'Add Topic',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: styles.headerStyle,
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="ResetSuccessful"
        component={Resetsuccessful}
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarColor: '#fff',
          tabBarIcon: ({focused, color}) =>
            focused ? (
              <ImageBackground
                style={styles.image}
                source={require('../../assets/info_fill.png')}
              />
            ) : (
              <ImageBackground
                style={styles.image}
                source={require('../../assets/info_outline.png')}
              />
            ),
        }}
      />

      <Stack.Screen
        name="EditDateofBirth"
        component={EditDateofBirth}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="paymentsFetch"
        component={PaymentsFetch}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="fetchPrayerReq"
        component={ProfileFetchPrayerReq}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="analitics"
        component={Activities}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Activities',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Sign Up',
          headerTitleStyle: {color: 'black'},

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerTintColor: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="EmailVerification"
        component={EmailVerification}
        options={{
          title: 'Sign Up',
          headerTitleStyle: {color: 'black'},

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerTintColor: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Notification settings"
        component={NotificationSettings}
        options={{
          headerTitle: 'Notifications',
          headerBackTitleVisible: true,
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              color="#000"
              backgroundColor="#fff"
              onPress={() => setUserToken(2)}
            />
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#fff',
          },
        }}
      />

      <Stack.Screen
        name="Privacy settings"
        component={PrivacySettingsNew}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Privacy',
          headerBackTitleVisible: true,
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              color="#000"
              backgroundColor="#fff"
              onPress={() => setUserToken(2)}
            />
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#fff',
          },
        }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Settings',
          headerBackTitleVisible: true,
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor="#fff"
              color="#000"
              onPress={() => setUserToken(2)}
            />
          ),

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#fff',
          },
        }}
      />

      <Stack.Screen
        name="Downloads"
        component={Downloads}
        options={{
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerTitle: 'Downloads',
          headerBackTitleVisible: true,
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor="#fff"
              color="#000"
              onPress={() => setUserToken(2)}
            />
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: {
            color: '#fff',
          },
        }}
      />

      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },

          headerTitle: 'Contacts',
          headerBackTitleVisible: true,
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor="#fff"
              color="#000"
              onPress={() => setUserToken(2)}
            />
          ),
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Contacts',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ConversionForm"
        component={ConversionForm}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Conversion Form',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Departments"
        component={Departments}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Departments',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="NoteRoot"
        component={NoteRoot}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Notes',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Addnote"
        component={Addnote}
        options={{
          title: 'Notes',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />


    <Stack.Screen
      name="NoteDetails"
      component={NoteDetails}
      options={{
        title: 'Note Pad',
        headerStyle: {
          backgroundColor: '#fff',
          headerTintColor: '#000',
        },
        // headerRight: () => (
        //   <View
        //     style={{
        //       flexDirection: 'row',
        //       paddingRight: '30%',
        //       alignItems: 'center',
        //     }}>
        //     <Image
        //       onPress={() => navigation.navigate('Home')}
        //       style={{width: 20, height: 20, marginRight: 15}}
        //       source={require('../../assets/edit.png')}
        //     />
        //   </View>
        // ),
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />


    <Stack.Screen
      name="Editnote"
      component={Editnote}
      options={{
        title: 'Note Pad',
        headerStyle: {
          backgroundColor: '#fff',
          headerTintColor: '#000',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

      <Stack.Screen
        name="DepartmentForm"
        component={DepartmentForm}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Departments',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Description"
        component={Description}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Departments',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="D-Confirmation"
        component={Confirmation}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Department',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Conversion',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="NM-Confirmation"
        component={NMConfirmation}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'New Members Resources',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="NM-Resources"
        component={NMResources}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'New Members Resources',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <View style={{marginRight: 20, opacity: 0.7}}>
              <Iconn
                onPress={() => alert('Sharing bulletin to..')}
                size={30}
                name="download"
              />
            </View>
          ),
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="NM-Resource"
        component={NMResource}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'New Members Resources',
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerRight: () => (
            <View style={{marginRight: 20, opacity: 0.6}}>
              <Iconn
                onPress={() => alert('Sharing resources to..')}
                size={30}
                name="download"
              />
            </View>
          ),

          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Conversion"
        component={Conversion}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Conversion',
          headerStyle: {
            backgroundColor: '#fff',
          },
          // headerRight: () => (
          //   <View style={styles.iconContainer}>
          //     <Icon
          //       onPress={() => alert('Sharing Announcement to..')}
          //       size={30}
          //       name="share-social-outline"
          //     />
          //     <Iconn
          //       onPress={() => alert('Sharing bulletin to..')}
          //       size={30}
          //       name="upload"
          //     />
          //   </View>
          // ),
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="EditOccupation"
        component={EditOccupation}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="EditDepartment"
        component={EditDepartment}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="EditEmail"
        component={EditEmail}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="EditFullname"
        component={EditFullname}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerTitleStyle: {
            color: 'black',
            fontSize: 20,
            fontFamily: 'frankruhllibre-regular',
          },
          headerTitle: 'Help',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Answers"
        component={Answers}
        options={{
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerTitle: 'Help',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="AboutApp"
        component={AboutApp}
        options={{
          title: 'About',
          headerTitleStyle: {
            fontFamily: 'frankruhllibre-regular',
            fontSize: 20,
          },
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              color="#000"
              backgroundColor="#fff"
              onPress={() => setUserToken(2)}
            />
          ),

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'AFTj Church',
          headerTransparent: true,
          headerTitleStyle: {
            alignSelf: 'center',
            fontFamily: 'frankruhllibre-medium',
            fontColor: '#fff',
          },
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: 'transparent',
          },

          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="transparent"
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-search"
              size={25}
              backgroundColor="transparent"
              onPress={() => navigation.navigate('SearchAllPages')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Events"
        component={Events}
        options={{
          title: 'Events',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: styles.headerStyle,
        }}
      />

      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{
          title: 'Events',
          headerStyle: {
            backgroundColor: '#fff',
            headerTintColor: '#000',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Connect"
        component={Connect}
        options={{
          title: 'Connect',
          headerStyle: {
            backgroundColor: '#fff',
            headerTintColor: '#000',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="ShareWith"
        component={ShareWith}
        options={{
          title: 'Share With...',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

<   Stack.Screen
      name="ChatRoom"
      component={ChatRoom}
      options={{
        title: 'Chat Page',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: styles.headerStyle,
      }}
    />

      <Stack.Screen
        name="ChildrenChurch"
        component={ChildrenChurch}
        options={{
          title: 'Children Church',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="SpecialAnnouncements"
        component={SpecialAnnouncements}
        options={{
          title: 'Special Announcements',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Bulletin"
        component={Bulletin}
        options={{
          title: 'Bulletin',

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerShown: true,

          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              color="#000"
              backgroundColor="#fff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Announcements"
        component={Announcements}
        options={{
          title: 'Announcements',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerShown: true,
          headerRight: () => (
            <View style={styles.iconContainer}>
              <Icon
                onPress={() => alert('Sharing Announcement to..')}
                size={30}
                name="share-social-outline"
              />
              <Iconn
                onPress={() => alert('Sharing bulletin to..')}
                size={30}
                name="upload"
              />
            </View>
          ),

          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              color="#000"
              backgroundColor="#fff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="TodaysBulletin"
        component={TodaysBulletin}
        options={{
          title: 'Todays Bulletin',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Projects"
        component={Projects}
        options={{
          title: 'Projects',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="VerifyCode"
        component={VerifyCode}
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="NewBulletin"
        component={NewBulletin}
        options={{
          title: 'Bulletin',
          headerStyle: {
            backgroundColor: '#fff ',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />


     

      <Stack.Screen
        name="Preschoolplayer"
        component={PreschoolVideoPlayer}
        options={{
          title: 'Player',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Grade1"
        component={Grade1}
        options={{
          title: 'Grades',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Grade Memory Verse"
        component={Grade1MemoryVerse}
        options={{
          title: 'Memory Verses',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: {
            color: '#000',
          },
          headerTintColor: '#000',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="AddMemoryVerse"
        component={AddMemoryVerse}
        options={{
          title: 'Add Memory Verse',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Share Memory Verse"
        component={ShareMemoryVerse}
        options={{
          title: 'Share Memory Verses',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="SermonDetails"
        component={SermonDetails}
        options={{
          title: 'Sermon',
          headerTitleStyle: styles.headerStyle,
          headerStyle: {
            backgroundColor: '#fff',
          },

          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Sermons"
        component={Sermons}
        options={{
          title: 'Sermons',
          headerTitleStyle: styles.headerStyle,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerRight: () => (
            <View style={{alignSelf: 'center', marginRight: 20}}>
              <Icon
                size={25}
                color={'black'}
                name="search"
                onPress={() => navigation.navigate('SearchHere')}
              />
            </View>
          ),
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              color="#000"
              backgroundColor="#fff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Bible"
        component={BibleHome}
        options={{
          headerTitleStyle: styles.headerStyle,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#fff"
              color={'#000'}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="TodaysReading"
        component={TodaysReading}
        options={{
          title: 'Todays Reading',
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
          // headerRight: () => (
          //   /*<Icon.Button
          //     name="md-volume-high-sharp"
          //     size={25}
          //     backgroundColor="#fff"
          //     color={'#000'}
          //     // onPress={() => navigation.openDrawer()}
          //   />*/
          // ),
        }}
      />

      <Stack.Screen
        name="BibleBook"
        component={BibleChapters}
        options={{
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
          title: 'Bible Book',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="BibleVerses"
        component={BibleVerse}
        options={{
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
          title: 'Bible Verses',
          headerStyle: {
            backgroundColor: '#fff',
          },
          /* headerRight: () => (
          <Icon.Button
            name="md-volume-high-sharp"
            size={25}
            backgroundColor="#fff"
            color={'#000'}
            // onPress={() => navigation.openDrawer()}
          />*/
          // ),
        }}
      />

      <Stack.Screen
        name="Give whole heartedly"
        component={Giving}
        options={{
          title: 'Giving',
          headerTintColor: 'black',
          headerTitleStyle: styles.headerStyle,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              color={'#000'}
              backgroundColor="#fff"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Location"
        component={Location}
        options={{
          title: 'Location',
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />

      <Stack.Screen
        name="TestimonyRoot"
        component={TestimonyRoot}
        options={{
          title: 'Testimony',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen
        name="Alltestimony"
        component={Alltestimony}
        options={{
          title: 'Testimony',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="TestimonyDetails"
        component={TestimonyDetails}
        options={{
          title: 'Testimony',
          headerStyle: {
            backgroundColor: '#fff',
            headerTintColor: '#000',
          },
          headerTitleStyle: styles.headerStyle,
          headerTintColor: '#000',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = {
  iconContainer: {
    width: 90,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  iconContainer2: {
    width: 105,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spaceright: {
    marginRight: 13,
  },
  image: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    // zIndex: -1,
  },
  headerStyle: {
    fontFamily: 'frankruhllibre-regular',
    fontSize: 20,
  },
  tabLabelText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    fontWeight: 'Normal',
    color: '#191C52',
  },
};

const mapDispatchToProps = dispatch => ({
  setUserToken: token => dispatch(setUserToken(token)),
});
export default connect(
  null,
  mapDispatchToProps,
)(RootStack);

// const styles = StyleSheet.create({});
