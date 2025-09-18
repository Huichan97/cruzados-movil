import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import FoodCard from '../../components/food/foodCard';
import { useNavigation } from '@react-navigation/native';
import { useFood } from '../../context/food.context';

export default function Foods() {
  const { foods, loading, error } = useFood();
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();

  const filtered = foods.filter((item) =>
    (item.tipo || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
            Lista de Comidas
          </Text>

          <TextInput
            placeholder="Buscar comida..."
            value={search}
            onChangeText={setSearch}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 10,
              marginBottom: 20,
              backgroundColor: '#fff',
            }}
          />

          {loading && <ActivityIndicator size="large" color="#007AFF" />}
          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          {filtered.map((food) => (
            <FoodCard
              key={food.id}
              nombre={food.tipo}
              descripcion={`Estado: ${food.estado}`}
              onPress={() => alert(`Seleccionaste ${food.tipo}`)}
            />
          ))}

          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <Text style={{ color: '#888' }}>© 2025 Cruzados</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          left: '25%',
          right: '25%',
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 30,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('CreateFood')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
          + Agregar comida
        </Text>
      </TouchableOpacity>
    </View>
  );
}
