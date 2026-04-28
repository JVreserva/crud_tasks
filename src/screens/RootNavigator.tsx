import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import NewTaskScreen from './NewTaskScreen';

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrar' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Minhas Tarefas', headerLeft: () => null }} />
        <Stack.Screen name="NewTask" component={NewTaskScreen} options={{ title: 'Nova Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;