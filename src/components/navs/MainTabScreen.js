/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';

import {connect} from 'react-redux';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Sermons from '../Sermons';
import SermonDetails from '../SermonDetails';
import Events from '../Events';
import EventDetails from '../EventDetails';
import TestimonyDetails from '../TestimonyDetails';
import NewMember from '../NewMembers/NewMembers';
import newMemberSuccessPage from '../NewMembers/SuccessPage';
import paySuccess from '../giving/Success';
import payFail from '../giving/Failed';
// import AvailableOnPaidVersion from '../subscription/AvailableOnPaidVersion';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconn from 'react-native-vector-icons/AntDesign';
import Icono from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Help from '../Help';
import Settings from '../Settings';
import Connect from '../Connect';
import ShareWith from '../ShareWith';
import Home from '../Home';
import About from '../About';
import Conversion from '../Conversion/Conversion';
import Departments from '../Department/Departments';
import Location from '../Location';
import LocationPage from '../Location/LocationPage';
import ChildrenChurch from '../ChildrenChurch';
import TestimonyRoot from '../TestimonyRoot';
import NoteRoot from '../NoteRoot';
import Editnote from '../Editnote'
import NoteDetails from '../NoteDetails';
import Alltestimony from '../Alltestimony';
import SpecialAnnouncements from '../SpecialAnnouncements';
import Announcements from '../Announcements';
import BoxedShare from '../BoxedShare';
import Login from '../Login';
import SignUp from '../SignUp';
import Bulletin from '../Bulletin';
import NewBulletin from '../NewBulletin';
import Homecell from '../HomeCell';
import TodaysBulletin from '../TodaysBulletin';
import PrayerRequest from '../PrayerRequest';
import Giving from '../giving/Giving';
import EnterAmont from '../giving/EnterAmountPage';
import BibleHome from '../BibleHome';
import TodaysReading from '../DaysReading';
import BibleChapters from '../BibleChapters';
import BibleVerse from '../BibleContent';
import PreSchool from '../PreSchool';
import AboutApp from '../AboutApp';
import Kindergarten from '../Kindergarten';
import KindergartenIntro from '../KindergartenIntro';
import PreschoolVideoPlayer from '../PreschoolVideoPlayer';
import Grade1 from '../Grade1-2';
import Grade1MemoryVerse from '../Grade1MemoryVerse';
import AddMemoryVerse from '../AddMemoryVerse';
import ShareMemoryVerse from '../ShareMemoryVerse';
import {DrawerContent} from '@react-navigation/drawer';
import {ImageBackground} from 'react-native';
import Forum from '../Forum';
import CreateForum from '../CreateForum';
import SearchAllPages from '../SearchAllPages';
import Chats from '../Chats';
import Contacts from '../Contacts';
import Downloads from '../Downloads';
import Pastorschedule from '../Pastorschedule';
import MemoryVerseNew from '../MemoryVerseNew';
import Projects from '../Projects';
import NMResources from '../NewMemberResources/Resource';
import Gateways from '../giving/Gateways';
import ForumMessages from '../ForumMessages';
import SliderBase from '../common/sliderBase';
import ChatRoom from '../ChatRoom';
import Addnote from '../Addnote';

const HomeStack = createStackNavigator();
const SermonsStack = createStackNavigator();
const BibleStack = createStackNavigator();
const GivingStack = createStackNavigator();
const AboutStack = createStackNavigator();

// const Tab = createMaterialBottomTabNavigator();

const Tab = createBottomTabNavigator();

function MyTabBar({
  state,
  descriptors,
  renderIcon,
  navigation,
  activeTintColor,
  inactiveTintColor,
  color,
}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'column', backgroundColor: 'transparent'}}>
      {state.index == 0 ? <SliderBase /> : null}

      <View style={{flexDirection: 'row', alignContent: 'center'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1, margin: 5}}>
              <View
                style={{
                  alignContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                }}>
                {index == 0 ? (
                  isFocused ? (
                    <Icon name="ios-home-sharp" color={color} size={26} />
                  ) : (
                    <Icon name="ios-home-outline" color={color} size={26} />
                  )
                ) : index == 1 ? (
                  isFocused ? (
                    <ImageBackground
                      style={styles.image}
                      source={require('../../assets/book.png')}
                    />
                  ) : (
                    <ImageBackground
                      style={styles.image}
                      source={require('../../assets/book_outline.png')}
                    />
                  )
                ) : index == 2 ? (
                  isFocused ? (
                    <ImageBackground
                      style={styles.image}
                      source={require('../../assets/bible_fill.png')}
                    />
                  ) : (
                    <ImageBackground
                      style={styles.image}
                      source={require('../../assets/bible_outline.png')}
                    />
                  )
                ) : index == 3 ? (
                  isFocused ? (
                    <Icon name="heart" color={color} size={26} />
                  ) : (
                    <Icon name="heart-outline" color={color} size={26} />
                  )
                ) : index == 4 ? (
                  isFocused ? (
                    <ImageBackground
                      style={styles.image}
                      source={require('../../assets/info_fill.png')}
                    />
                  ) : (
                    <ImageBackground
                      style={styles.image}
                      source={require('../../assets/info_outline.png')}
                    />
                  )
                ) : null}

                <Text
                  style={{
                    color: isFocused ? {activeTintColor} : {inactiveTintColor},
                  }}>
                  {label}
                </Text>
                {/* {renderIcon({
                  route,

                  tintColor: isFocused ? activeTintColor : inactiveTintColor,
                })} */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const MainTabScreen = ({routeName}) => (
  <Tab.Navigator
    activeColor="#000"
    inactiveColor="#000"
    labeled={true}
    tabBarOptions={{showLabel: true, activeTintColor: '#000'}}
    tabBar={props => <MyTabBar {...props} />}>
    <Tab.Screen
      name="HomeStack"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#fff',
        tabBarIcon: ({focused, color}) =>
          focused ? (
            <Icon name="ios-home-sharp" color={color} size={26} />
          ) : (
            <Icon name="ios-home-outline" color={color} size={26} />
          ),
      }}
    />

    <Tab.Screen
      name="Sermons"
      component={SermonsStackScreen}
      options={{
        tabBarLabel: 'Sermons',
        tabBarAccessibilityLabel: 'ghgh',
        title: 'Sermons',
        tabBarColor: '#fff',
        tabBarIcon: ({focused, color}) =>
          focused ? (
            <ImageBackground
              style={styles.image}
              source={require('../../assets/book.png')}
            />
          ) : (
            <ImageBackground
              style={styles.image}
              source={require('../../assets/book_outline.png')}
            />
          ),
      }}
    />

    <Tab.Screen
      name="Bible"
      component={BibleStackScreen}
      options={{
        tabBarLabel: 'Bible',
        tabBarColor: '#fff',

        tabBarIcon: ({focused, color}) =>
          focused ? (
            <ImageBackground
              style={styles.image}
              source={require('../../assets/bible_fill.png')}
            />
          ) : (
            <ImageBackground
              style={styles.image}
              source={require('../../assets/bible_outline.png')}
            />
          ),
      }}
    />
    <Tab.Screen
      name="Giving"
      component={GivingStackScreen}
      options={{
        tabBarLabel: 'Giving',
        tabBarColor: '#fff',

        tabBarIcon: ({focused, color}) =>
          focused ? (
            <Icon name="heart" color={color} size={26} />
          ) : (
            <Icon name="heart-outline" color={color} size={26} />
          ),
      }}
    />

    <Tab.Screen
      name="About"
      component={AboutStackScreen}
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
  </Tab.Navigator>
);

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FFF',
      },
      headerTintColor: '#000',
      headerTitleStyle: styles.headerStyle,
    }}>
    <HomeStack.Screen
      name="Drawer"
      component={DrawerContent}
      options={{
        title: 'Home',
        headerStyle: {
          backgroundColor: '#333560',
        },
        headerTintColor: '#000',
      }}
    />

    <HomeStack.Screen
      name="SearchHere"
      component={SearchAllPages}
      options={{
        title: 'Search',
        headerStyle: {
          backgroundColor: '#fff',
          headerTintColor: '#000',
        },
        headerTintColor: '#000',
        headerTitleStyle: styles.headerStyle,
      }}
    />
    {/* <HomeStack.Screen
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
    /> */}

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
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
            <Image
              style={{width: 20, height: 20, marginRight: 15}}
              source={require('../../assets/plus-sign.png')}
            />
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

    <HomeStack.Screen
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
        headerTintColor: '#000',
        headerShown: true,
      }}
    />

    <HomeStack.Screen
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

    <HomeStack.Screen
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
          <View style={{marginRight: 20, opacity: 0.4}}>
            <Iconn
              onPress={() => alert('Sharing resources to..')}
              size={30}
              name="upload"
            />
          </View>
        ),
        headerTintColor: '#000',
        headerShown: true,
      }}
    />

    <HomeStack.Screen
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
            color={'black'}
            name="search"
            onPress={() => navigation.navigate('SearchHere')}
          />
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

    <HomeStack.Screen
      name="Downloads"
      component={Downloads}
      options={{
        title: 'Downloads',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

    <HomeStack.Screen
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

    

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
      name="Give whole heartedly"
      component={Giving}
      options={{
        title: 'Giving',
        headerTintColor: '#000',
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
    <HomeStack.Screen
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
            onPress={() => navigation.navigate('SearchHere')}
          />
        ),
      }}
    />

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
      name="Events"
      component={Events}
      options={{
        title: 'Events',
        // headerStyle: {
        // backgroundColor: '#fff',
        // },
        // headerTintColor: '#000',
        // headerTitleStyle: styles.headerStyle,
      }}
    />

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
      name="Connect"
      component={Connect}
      options={{
        title: 'Connect',
      }}
    />

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
      name="NoteRoot"
      component={NoteRoot}
      options={{
        title: 'Note Pad',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Addnote')}>
          <View
            style={{
              flexDirection: 'row',
              paddingRight: '30%',
              alignItems: 'center',
            }}>
            
              <Image
                onPress={() => navigation.navigate('Addnote')}
                style={{width: 30, height: 30, marginRight: 15}}
                source={require('../../assets/add_icon.png')}
              />
            
            
          </View></TouchableOpacity>
        ),
      }}
    />

    {/* <HomeStack.Screen
      name="Bulletin"
      component={Bulletin}
      headerBackTitleVisiblesible={true}
      options={{
        title: 'Bulletin', 
        headerBackTitleVisible:true,
        headerShown: true,
        headerRight: () => (
          <View style={styles.iconContainer3}>
            <Icon
              onPress={() => navigation.navigate('ShareWith')}
              size={28}
              name="share-social-outline"
            />
          </View>
        ),
      }}
    />  */}

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
      name="NoteDetails"
      component={NoteDetails}
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

    <HomeStack.Screen
      name="newMemberSuccessPage"
      component={newMemberSuccessPage}
      options={{
        title: 'New Member',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

    <HomeStack.Screen
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

    {/* added two new screens */}

    <HomeStack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Login',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

    <HomeStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: 'SignUp',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

    {/* <HomeStack.Screen
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
    /> */}

    <HomeStack.Screen
      name="Homecell"
      component={Homecell}
      options={{
        title: 'Home Cell',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

    <HomeStack.Screen
      name="Bulletin"
      component={Bulletin}
      options={{
        title: 'Bulletin',
        headerRight: () => (
          <View style={styles.iconContainer3}>
            <Icon
              onPress={() => navigation.navigate('ShareWith')}
              size={28}
              name="share-social-outline"
            />
          </View>
        ),
      }}
    />

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
      name="PreSchool"
      component={PreSchool}
      options={{
        title: 'Pre-school',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

    <HomeStack.Screen
      name="Kindergarten"
      component={Kindergarten}
      options={{
        title: 'Kindergarten',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />

    <HomeStack.Screen
      name="KindergartenIntro"
      component={KindergartenIntro}
      options={{
        title: 'Kindergarten',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />


    <HomeStack.Screen
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

    <HomeStack.Screen
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

    <HomeStack.Screen
      name="Grade Memory Verse"
      component={MemoryVerseNew}
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

        // headerLeft: () => (
        //   <Icon.Button
        //     name="ios-menu"
        //     size={25}
        //     color="#000"
        //     backgroundColor="#fff"
        //     onPress={() => navigation.openDrawer()}
        //   />
        // ),
      }}
    />

    <HomeStack.Screen
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

    

    <HomeStack.Screen
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

    <HomeStack.Screen
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
  </HomeStack.Navigator>
);

const SermonsStackScreen = ({navigation}) => (
  <SermonsStack.Navigator
    initialRouteName="Sermons"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: styles.headerStyle,
      headerTintColor: '#000',
    }}>
    <SermonsStack.Screen
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

    <SermonsStack.Screen
      name="Drawer"
      component={DrawerContent}
      options={{
        title: 'Home',
        headerTitleStyle: styles.headerStyle,
        headerStyle: {
          backgroundColor: '#333560',
        },
      }}
    />

    <SermonsStack.Screen
      name="SearchHere"
      component={SearchAllPages}
      options={{
        title: 'Search',
        headerStyle: {
          backgroundColor: '#fff',
          headerTintColor: '#000',
        },
        headerTintColor: '#000',
        headerTitleStyle: styles.headerStyle,
      }}
    />
    <SermonsStack.Screen
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
  </SermonsStack.Navigator>
);

const BibleStackScreen = ({navigation}) => (
  <BibleStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: styles.headerStyle,
    }}>
    <BibleStack.Screen
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

    <BibleStack.Screen
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

    <BibleStack.Screen
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
    <BibleStack.Screen
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
  </BibleStack.Navigator>
);

const GivingStackScreen = ({navigation}) => (
  <GivingStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: styles.headerStyle,
      headerTintColor: '#000',
    }}>
    <GivingStack.Screen
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
    <GivingStack.Screen
      name="paymentGateway"
      component={Gateways}
      options={{
        title: 'Giving',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />
    <GivingStack.Screen
      name="payFailed"
      component={payFail}
      options={{
        title: 'Giving',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />
    <GivingStack.Screen
      name="amount"
      component={EnterAmont}
      options={{
        title: 'Giving',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />
    <GivingStack.Screen
      name="Location"
      component={LocationPage}
      options={{
        // headerShown: false,
        title: 'Location',
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
    <GivingStack.Screen
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

    <GivingStack.Screen
      name="PrayerRequest"
      component={PrayerRequest}
      options={{
        title: 'Prayer Request',
        headerTitleStyle: styles.headerStyle,
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
    <GivingStack.Screen
      name="paySuccess"
      component={paySuccess}
      options={{
        title: 'Giving',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerTintColor: '#000',
      }}
    />
  </GivingStack.Navigator>
);

const AboutStackScreen = ({navigation}) => (
  <AboutStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: styles.headerStyle,
    }}>
    <AboutStack.Screen
      name="About JCCI"
      component={About}
      options={{
        title: 'About Us',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: styles.headerStyle,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#000"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />

    <AboutStack.Screen
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

    <HomeStack.Screen
      name="Bulletin"
      component={Bulletin}
      headerBackTitleVisiblesible={true}
      options={{
        title: 'Bulletin',
        headerBackTitleVisible: true,
        headerShown: true,
        headerRight: () => (
          <View style={styles.iconContainer3}>
            <Icon
              onPress={() => navigation.navigate('ShareWith')}
              size={28}
              name="share-social-outline"
            />
          </View>
        ),
      }}
    />

    <HomeStack.Screen
      name="TodaysBulletin"
      component={TodaysBulletin}
      options={{
        title: 'Todays Bulletin',
      }}
    />
  </AboutStack.Navigator>
);

const mapStateToProps = state => ({
  routeName: state.user.routeName,
});

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
  iconContainer3: {
    width: 40,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
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
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  tabLabelText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    fontWeight: 'Normal',
    color: '#191C52',
  },
};

export default connect(mapStateToProps)(MainTabScreen);
