import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type FoodCardProps = {
    nombre: string;
    descripcion: string;
    onPress: () => void;
};

export default function FoodCard({ nombre, descripcion, onPress }: FoodCardProps) {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 15,
                marginBottom: 15,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            {/* Nombre */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
                {nombre}
            </Text>

            {/* Descripción */}
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 10 }}>
                {descripcion}
            </Text>

            {/* Botón */}
            <TouchableOpacity
                style={{
                    backgroundColor: '#007AFF',
                    padding: 10,
                    borderRadius: 8,
                    alignItems: 'center',
                }}
                onPress={onPress}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver más</Text>
            </TouchableOpacity>
        </View>
    );
}
