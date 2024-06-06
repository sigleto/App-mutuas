import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import ExentaResultScreen from './screens/ExentaResultScreen';
import AdditionalInputsScreen from './screens/AdditionaInputsScreeen';
import DevolucionResultScreen from './screens/DevolucionResultScreen';
import Normativa from './Avisos/Normativa aplicable';
import PoliticaPrivacidad from './Avisos/PoliticaPrivacidad';
import DescargoResponsabilidad from './Avisos/DescargoResponsabilidad';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="DescargoResponsabilidad">
      <Stack.Screen name="DescargoResponsabilidad" component={DescargoResponsabilidad} options={{ title: 'Descargo de Responsabilidad' }} />
      <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Inicio', headerShown: false }}/>
      <Stack.Screen name="ExentaResult" component={ExentaResultScreen} options={{ title: 'Resultado Exenta', headerShown: false  }} />
      <Stack.Screen name="AdditionalInputs" component={AdditionalInputsScreen} options={{ title: 'Datos Adicionales', headerShown: false  }} />
      <Stack.Screen name="DevolucionResultScreen" component={DevolucionResultScreen} options={{ title: 'Resultado Devolución', headerShown: false  }} />
      
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"  screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={MainStackNavigator} options={{ title: 'Inicio' }} />
        <Drawer.Screen name="PoliticaPrivacidad" component={PoliticaPrivacidad} options={{ title: 'Política de Privacidad' }} />
        <Drawer.Screen name="DescargoResponsabilidad" component={DescargoResponsabilidad} options={{ title: 'Descargo de Responsabilidad' }} />
        <Drawer.Screen name="Normativa" component={Normativa} options={{ title: 'Normativa aplicable' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}