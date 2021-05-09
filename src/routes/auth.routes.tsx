import React from 'react';
import  { createStackNavigator } from '@react-navigation/stack';


import { SignIn } from '../screens/SignIn';

const stackRoutes = createStackNavigator();


const AuthRoutes: React.FC = () => (
    <stackRoutes.Navigator headerMode="none">
        <stackRoutes.Screen 
            name="SignIn"
            component={SignIn}
        />        
    </stackRoutes.Navigator>
)


export default AuthRoutes;