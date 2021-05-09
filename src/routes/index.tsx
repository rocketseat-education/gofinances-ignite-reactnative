import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#999" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      { user.name ? <AppRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
};

export default Routes;