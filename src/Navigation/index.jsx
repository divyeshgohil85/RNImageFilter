import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Loader from '../Components/Loader';
import ViewImage from '../Screens/ViewImage';
import ChooseImage from '../Screens/ChooseImage';
import FilterScreen from '../Screens/FilterImage';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer
      fallback={<Loader titleText={''} visible={true} />}>
      <Stack.Navigator>
        <Stack.Screen
          name="ChooseImage"
          component={ChooseImage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FilterScreen"
          component={FilterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewImage"
          component={ViewImage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
