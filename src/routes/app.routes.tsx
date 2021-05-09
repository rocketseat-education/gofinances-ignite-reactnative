import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'styled-components';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';


const AppRoutes = createBottomTabNavigator();

const AuthRoutes = () => {
    const theme = useTheme();


    return(
        <AppRoutes.Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.secondary,                
                inactiveTintColor: theme.colors.text,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                },
            }}>
                <AppRoutes.Screen
                    name="Listagem"
                    component={Dashboard}
                    options={{
                        tabBarIcon: (({ size, color }) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />

                <AppRoutes.Screen
                    name="Cadastrar"
                    component={Register}
                    options={{
                        tabBarIcon: (({ size, color }) => (
                            <MaterialIcons
                                name="attach-money"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />  

                <AppRoutes.Screen
                    name="Resumo"
                    component={Resume}
                    options={{
                        tabBarIcon: (({ size, color }) => (
                            <MaterialIcons
                                name="pie-chart"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />       
            </AppRoutes.Navigator>
    )
}

export default AuthRoutes;