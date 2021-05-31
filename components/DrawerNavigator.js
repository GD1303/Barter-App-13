import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';

import { TabNavigator } from './TabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyBarterScreen from '../screens/MyBarterScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import DeliveredItemsScreen from '../screens/DeliveredItemsScreen';

export const DrawerNavigator = createDrawerNavigator({
    'Home': {
        screen: TabNavigator,
        navigationOptions: {
            drawerIcon: ({ size }) => (
                <Icon
                    name = 'home'
                    type = 'font-awesome'
                    color = '#000000'
                    size = { size } />
            )
        }
    },
    'My Barters': {
        screen: MyBarterScreen,
        navigationOptions: {
            drawerIcon: ({  size }) => (
                <Icon
                    name = 'boxes'
                    type = 'font-awesome-5'
                    color = '#000000'
                    size = { size } />
            )
        }
    },
    'Delivered Items': {
        screen: DeliveredItemsScreen,
        navigationOptions: {
            drawerIcon: ({  size }) => (
                <Icon
                    name = 'truck'
                    type = 'font-awesome'
                    color = '#000000'
                    size = { size } />
            )
        }
    },
    'Notifications': {
        screen: NotificationsScreen,
        navigationOptions: {
            drawerIcon: ({  size }) => (
                <Icon
                    name = 'bell'
                    type = 'font-awesome'
                    color = '#000000'
                    size = { size } />
            )
        }
    },
    'Settings': {
        screen: SettingScreen,
        navigationOptions: {
            drawerIcon: ({  size }) => (
                <Icon
                    name = 'gear'
                    type = 'font-awesome'
                    color = '#000000'
                    size = { size } />
            )
        }
    },
},
{
    contentComponent: CustomSideBarMenu,
},
{
    initialRouteName: 'Home',
});