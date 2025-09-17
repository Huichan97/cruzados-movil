import React from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import FoodCard from '../../components/food/foodCard';

const alimentos = [
  { id: 1, nombre: 'Manzana', descripcion: 'Fruta roja y dulce' },
  { id: 2, nombre: 'Plátano', descripcion: 'Amarillo y energético' },
  { id: 3, nombre: 'Pan', descripcion: 'Alimento básico de la dieta' },
];

export default function Alimentos() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={{ padding: 20 }}>
        {/* Mini header */}
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
          Lista de Alimentos
        </Text>

        {/* Filtros */}
        <TextInput
          placeholder="Buscar alimento..."
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
            backgroundColor: '#fff',
          }}
        />

        {/* Cards de alimentos (hijos) */}
        {alimentos.map((item) => (
          <FoodCard
            key={item.id}
            nombre={item.nombre}
            descripcion={item.descripcion}
            onPress={() => alert(`Seleccionaste ${item.nombre}`)}
          />
        ))}

        {/* Footer */}
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ color: '#888' }}>© 2025 Cruzados</Text>
        </View>
      </View>
    </ScrollView>
  );
}
