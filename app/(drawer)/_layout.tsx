import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'SkillUpPlus 2030+',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Meu Perfil',
          title: 'Meu Perfil',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Configurações',
          title: 'Configurações',
          headerShown: true,
        }}
      />
    </Drawer>
  );
}
