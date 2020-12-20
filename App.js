/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useMemo, useEffect} from 'react';

import {connect} from 'react-redux';
import firebase from '@react-native-firebase/app';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import SplashScreen from './src/components/SplashScreen';
// import About from './src/components/About';
// import NewMember from './src/components/NewMember';
// import DownloadNM from './src/components/DownloadNM';
// import BibleReadings from './src/components/BibleReadings';
// // import Memoryverse from './src/components/Memoryverse';
// import BibleChapters from './src/components/BibleChapters';
// import Passwordsuccess from './src/components/Passwordsuccess';
// import Profile from './src/components/Profile';
import DrawerContent from './src/components/navs/DrawerContent';
import SearchAllPages from './src/components/SearchAllPages';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabScreen from './src/components/navs/MainTabScreen';
import Context, {AuthContext} from './src/components/common/context';

import AsyncStorage from '@react-native-community/async-storage';
import RootStack from './src/components/navs/RootStack';
// import {Provider} from 'react-redux';
import {
  setCurrentUser,
  setUserToken,
  setAccessToken,
  setUser,
  setRouteName,
} from './src/redux/user/user.actions';

// import store from './src/redux/store';
// import SignUp from './src/components/SignUp';
// import Login from './src/components/Login';

//navigation container and themes
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import DownloadN from './src/components/DownloadN';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const firebaseConfig = {
  apiKey: 'AIzaSyDQg2sd8eMHq9g0PnSFpndEcE2DbR2EU90',
  authDomain: 'jcci-59a7d.firebaseapp.com',
  databaseURL: 'https://jcci-59a7d.firebaseio.com',
  projectId: 'jcci-59a7d',
  storageBucket: 'jcci-59a7d.appspot.com',
  messagingSenderId: '433001309537',
  appId: '1:433001309537:web:87373f942c842b77e41120',
  measurementId: 'G-JLVDBWNHMS',
};

const App = ({
  setCurrentUser,
  setUserToken,
  userToken,
  setAccessToken,
  setUser,
  accessToken,
  currentUser,
}) => {
  // const [userToken, setUserToken] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [uEmail, setEmail] = useState('');
  const [uName, setName] = useState('');
  const [componentName, setComponentName] = useState('');
  const [initialParams, setInitialParams] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);

  var unsubscribeFromAuth = null;

  const getData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const user = await AsyncStorage.getItem('user');

      setUser(user);
      setAccessToken(accessToken);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    // setCurrentUser({email:'', username:''});
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '433001309537-34edjif512flatvq0vgvhmskkt3dgc75.apps.googleusercontent.com',
      // androidClientId: '3242343242322432-2342323432232324343323.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    unsubscribeFromAuth = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    getData();
  });

  useEffect(() => {
    return () => {
      unsubscribeFromAuth();
      if (accessToken === null && currentUser != null) {
        auth().signOut();
      }
    };
  }, []);

  const authContext = useMemo(() => ({
    signIn: (email, uname, password) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => onLoginSuccess(setLoading))
        .catch(() => {
          setError('Incorrect Email or password');
          setLoading(false);
          setUserToken(1);
          setEmail(email);
          setName(uname);
        })
        .catch(function(error) {
          alert(error);
        });
    },
    signOut: () => {
      firebase
        .auth()
        .signOut()
        .then(function() {
          setUserToken(2);
          setEmail('');
          setName('');
        })
        .catch(function(error) {
          alert(error);
        });
    },
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    },
    firstTime: () => {
      const timeoutHandle = setTimeout(() => {}, 1000);
      return () => {
        clearTimeout(timeoutHandle);
        setUserToken(2);
        setEmail('');
        setName('');
      };
    },
    accountAction: () => {
      setComponentName('Login or Sign up');
      setUserToken(3);
    },
    goToSermon: params => {
      setComponentName('SermonDetails');
      setInitialParams(params);
      setUserToken(3);
      // RootNavigation.navigate('SignUp');
    },
    goToProfile: () => {
      setComponentName('Profile');
      // setInitialParams(params)
      setUserToken(3);
      // RootNavigation.navigate('SignUp');
    },
    goToContacts: () => {
      setComponentName('Contacts');
      // setInitialParams(params)
      setUserToken(3);
      // RootNavigation.navigate('SignUp');
    },
    goToNotifications: () => {
      setComponentName('Notification settings');
      setUserToken(3);
    },
    goToSettings: () => {
      setComponentName('Settings');
      setUserToken(3);
    },
    goToDownloads: () => {
      setComponentName('Downloads');
      setUserToken(3);
    },
    goHome: () => {
      // setComponentName('Downloads');

      setUserToken(2);
      setRouteName('Home');
    },
    goSearch: () => {
      // setComponentName('Downloads');
      setUserToken(3);
      setComponentName('Search');
    },
  }));

  return (
    // <Provider store={store}>
    <AuthContext.Provider value={authContext}>
      {userToken === 0 ? (
        <SplashScreen />
      ) : (
        // <About/>
        // <Memoryverse/>
        <NavigationContainer>
          {userToken === 2 ? (
            <Drawer.Navigator
              name="Drawer"
              drawerContent={props => (
                <DrawerContent {...props} username={uName} useremail={uEmail} />
              )}
              initialParams={{email: 'jady@gmail.com'}}
              drawerContentOptions={{
                activeBackgroundColor: '#fff',
                activeTintColor: '#000',
                inactiveTintColor: 'gray',
                itemStyle: {marginVertical: 30},
                labelStyle: {color: '#000'},
              }}>
              <Drawer.Screen
                options={{
                  headerStyle: {
                    backgroundColor: '#fff',
                  },
                  headerTintColor: {
                    color: '#fff',
                  },
                }}
                name="Home"
                component={MainTabScreen}
              />

              <Drawer.Screen
                options={{
                  headerStyle: {
                    backgroundColor: '#191C52',
                  },
                  headerTintColor: {
                    color: '#fff',
                  },
                }}
                name="Search"
                component={SearchAllPages}
              />
            </Drawer.Navigator>
          ) : (
            <RootStack
              // initialParams={initialParams}
              initialRouteName={componentName}
            />
          )}
        </NavigationContainer>
      )}
    </AuthContext.Provider>

    // {/* </Provider> */}
  );
};
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser,
  userToken: user.userToken,
  accessToken: user.accessToken,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setRouteName: token => dispatch(setRouteName(token)),
  setUserToken: token => dispatch(setUserToken(token)),
  setAccessToken: token => dispatch(setAccessToken(token)),
  setUser: user => dispatch(setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
