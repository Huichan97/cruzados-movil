import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Foods from '../../pages/food/food';
import CreateFood from './createFood.component';
import withHeader from '../withHeader';

const Stack = createNativeStackNavigator();

export default function FoodsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FoodsList" component={withHeader(Foods)} />
      <Stack.Screen name="CreateFood" component={withHeader(CreateFood)} />
    </Stack.Navigator>
  );
}
