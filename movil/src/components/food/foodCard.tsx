import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  nombre: string;
  descripcion?: string;
  calorias?: number;
  onPress: () => void;
};

export default function FoodCard({ nombre, descripcion, calorias, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Columna izquierda (30%) */}
      <View
        style={{
          width: '30%',
          backgroundColor: '#eee',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#555' }}>IMG</Text>
      </View>

      {/* Columna derecha (70%) */}
      <View style={{ width: '70%', padding: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
          {nombre}
        </Text>

        {descripcion && (
          <Text style={{ fontSize: 14, color: '#666', marginBottom: 5 }}>
            {descripcion}
          </Text>
        )}

        {calorias !== undefined && (
          <Text style={{ fontSize: 13, color: '#999' }}>
            Calorías: {calorias}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
