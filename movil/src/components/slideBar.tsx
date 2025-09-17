import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SlideBar = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 40 }}>
      {/* Opciones de navegación principales */}
      <TouchableOpacity
        style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={{ fontSize: 18 }}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}
        onPress={() => navigation.navigate('Alimentos')}
      >
        <Text style={{ fontSize: 18 }}>Alimentos</Text>
      </TouchableOpacity>

      {/* Menú de usuario */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Usuario</Text>

        <TouchableOpacity
          style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={{ fontSize: 16 }}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
          onPress={() => navigation.navigate('Ajustes')}
        >
          <Text style={{ fontSize: 16 }}>Ajustes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ padding: 12 }}
          onPress={() => {
            alert('Sesión cerrada 🚪');
          }}
        >
          <Text style={{ fontSize: 16, color: 'red' }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SlideBar;
