import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFood } from '../../context/food.context';

export default function CreateIngrediente() {
    const { addIngrediente } = useFood();
    const navigation = useNavigation<any>();

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [tipoPeso, setTipoPeso] = useState('gr');

    const handleSubmit = async () => {
        if (!nombre || !cantidad) {
            return Alert.alert('Error', 'Todos los campos son obligatorios');
        }

        try {
            await addIngrediente({
                nombre,
                cantidad,
                tipoPeso,
            });

            Alert.alert('Éxito', 'Ingrediente creado correctamente');
            navigation.goBack();
        } catch (err: any) {
            Alert.alert('Error', err.message || 'No se pudo crear el ingrediente');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
                Crear nuevo ingrediente
            </Text>

            <Text style={{ fontWeight: 'bold' }}>Nombre</Text>
            <TextInput
                placeholder="Ej: Pollo"
                value={nombre}
                onChangeText={setNombre}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                    backgroundColor: '#fff',
                }}
            />

            <Text style={{ fontWeight: 'bold' }}>Cantidad</Text>
            <TextInput
                placeholder="Ej: 200"
                value={cantidad}
                onChangeText={setCantidad}
                keyboardType="numeric"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                    backgroundColor: '#fff',
                }}
            />

            <Text style={{ fontWeight: 'bold' }}>Tipo de peso</Text>
            <TextInput
                placeholder="Ej: gramos, palma, taza..."
                value={tipoPeso}
                onChangeText={setTipoPeso}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 25,
                    backgroundColor: '#fff',
                }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: '#28a745',
                    padding: 15,
                    borderRadius: 8,
                    alignItems: 'center',
                }}
                onPress={handleSubmit}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Guardar ingrediente</Text>
            </TouchableOpacity>
        </View>
    );
}
