import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './src/components/header';
import Home from './src/pages/home';
import Profile from './src/pages/profile/profile';
import Alimentos from './src/pages/food/food';
import ConfigurationScreen from './src/pages/config/configuration';

const Drawer = createDrawerNavigator();

function withHeader(Component: any) {
  return (props: any) => (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header />
      <Component {...props} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="Home" component={withHeader(Home)} />
          <Drawer.Screen name="Profile" component={withHeader(Profile)} />
          <Drawer.Screen name="Alimentos" component={withHeader(Alimentos)} />
          <Drawer.Screen name="Ajustes" component={withHeader(ConfigurationScreen)} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
