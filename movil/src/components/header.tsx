import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);

  const getTitle = () => {
    switch (route.name) {
      case 'Home':
        return 'Inicio';
      case 'Profile':
        return 'Perfil';
      case 'Ajustes':
        return 'Alimentos';
      case 'Configuration':
        return 'Ajustes';
      default:
        return 'Cruzados';
    }
  };

  return (
    <View
      style={{
        height: 60,
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}
    >
      {/* Botón izquierda - abre sidebar */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Text style={{ fontSize: 22, color: '#fff' }}>☰</Text>
      </TouchableOpacity>

      {/* Título dinámico */}
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{getTitle()}</Text>

      {/* Botón derecha - abre modal usuario */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ fontSize: 20, color: '#fff' }}>👤</Text>
      </TouchableOpacity>

      {/* Modal usuario */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 12,
              width: '80%',
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
              Opciones de Usuario
            </Text>

            <TouchableOpacity
              style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Profile');
              }}
            >
              <Text style={{ fontSize: 16 }}>Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Ajustes');
              }}
            >
              <Text style={{ fontSize: 16 }}>Ajustes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ padding: 12 }}
              onPress={() => {
                setModalVisible(false);
                alert('Sesión cerrada 🚪');
              }}
            >
              <Text style={{ fontSize: 16, color: 'red' }}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: '#007AFF',
                padding: 10,
                borderRadius: 8,
                alignSelf: 'flex-end',
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;
