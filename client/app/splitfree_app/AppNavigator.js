import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  Appearance,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './components/Home/Home';
import Groups from './components/Groups/Groups';
import Friends from './components/Friends/Friends';
import Account from './components/Account/Account';

const StackNavigator = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const GroupsStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const AccountStack = createStackNavigator();

const HomeStackScreen = props => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        initialParams={{params: {}}}
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
const GroupsStackScreen = props => {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen
        initialParams={{params: {}}}
        name="Groups"
        component={Groups}
        options={{headerShown: false}}
      />
    </GroupsStack.Navigator>
  );
};
const FriendsStackScreen = props => {
  return (
    <FriendsStack.Navigator>
      <FriendsStack.Screen
        initialParams={{params: {}}}
        name="Friends"
        component={Friends}
        options={{headerShown: false}}
      />
    </FriendsStack.Navigator>
  );
};
const AccountStackScreen = props => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        initialParams={{params: {}}}
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </AccountStack.Navigator>
  );
};
class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // RNPusherPushNotifications.setInstanceId("2e86a465-08e1-44ba-8c96-b06d5dd136dd");

    // RNPusherPushNotifications.on("notification", this.handleNotification);
    // RNPusherPushNotifications.setOnSubscriptionsChangedListener(this.onSubscriptionsChanged);
    // this.subscribe("607408acb6f1cd0132ebc8be")
  }
  Tabs = [
    {
      name: 'HomeTab',
      label: 'Home',
      // icon:<SvgUri width="25" height="25" source={require("../assets/svgs/home.svg")} fill={"black"} fillAll={true} style={{marginBottom:0}}/>,
      component: HomeStackScreen,
    },
    {
      name: 'GroupsTab',
      label: 'Groups',
      //  icon:<SvgUri width="25" height="25" source={require("../assets/svgs/explore_button.svg")} style={{marginBottom:0}}/>,
      component: GroupsStackScreen,
    },
    {
      name: 'FriendsTab',
      label: 'Friend',
      // icon:<Image width="50" height="50" source={require("../assets/enquire_button.png")} style={{marginBottom:20,height:50,width:50}} />,
      component: FriendsStackScreen,
    },
    {
      name: 'AccountTab',
      label: 'Account',
      // icon:<SvgUri width="25" height="25" source={require("../assets/svgs/search.svg")} fill={"black"} fillAll={true} style={{marginBottom:0}}/>,
      component: AccountStackScreen,
    },
  ];

  createTabs = initialRouteName => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          // activeTintColor: Colors.red,
          // inactiveTintColor: Colors.inactiveGray,
          style: {
            borderTopWidth: 0,
            elevation: 10,
          },
        }}
        initialRouteName={initialRouteName}
        shifting={false}>
        {this.Tabs.map((item, index) => {
          return (
            <Tab.Screen
              name={item.name}
              key={index}
              component={item.component}
              options={{
                tabBarLabel: item.label,
                tabBarIcon: ({color}) => item.icon,
              }}
            />
          );
        })}
      </Tab.Navigator>
    );
  };

  render() {
    const theme = Appearance.getColorScheme();
    // console.log(this.props.navigation, 'navigation');

    return (
      <NavigationContainer theme={theme == 'dark' ? DarkTheme : DefaultTheme}>
        <StackNavigator.Navigator initialRouteName={'Home'}>
          {/* <StackNavigator.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          /> */}
          <StackNavigator.Screen
            name="Home"
            children={() => this.createTabs('Home')}
            options={{headerShown: false}}
          />
        </StackNavigator.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
