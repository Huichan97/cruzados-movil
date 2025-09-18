import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFood } from '../../context/food.context';

export default function CreateFood() {
    const { addFood } = useFood();
    const navigation = useNavigation<any>();

    const [tipo, setTipo] = useState('');
    const [porcion, setPorcion] = useState('');
    const [horaEvento, setHoraEvento] = useState('');
    const [estado, setEstado] = useState('pendiente'); // valor por defecto

    const handleSubmit = async () => {
        if (!tipo || !porcion || !horaEvento) {
            return Alert.alert('Error', 'Todos los campos son obligatorios');
        }

        try {
            await addFood({
                tipo,
                porcion: Number(porcion),
                horaEvento,
                estado,
                ingredientes: [],
            });

            Alert.alert('Éxito', 'Comida creada correctamente');

            // En vez de goBack, reseteamos a la lista de Foods
            navigation.navigate('FoodsList');
        } catch (err: any) {
            Alert.alert('Error', err.message || 'No se pudo crear la comida');
        }
    };


    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
                Crear nueva comida
            </Text>

            <Text style={{ fontWeight: 'bold' }}>Tipo</Text>
            <TextInput
                placeholder="Desayuno, Almuerzo, Cena..."
                value={tipo}
                onChangeText={setTipo}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                    backgroundColor: '#fff',
                }}
            />

            <Text style={{ fontWeight: 'bold' }}>Porción</Text>
            <TextInput
                placeholder="Ej: 2"
                value={porcion}
                onChangeText={setPorcion}
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

            <Text style={{ fontWeight: 'bold' }}>Hora de evento</Text>
            <TextInput
                placeholder="Ej: 13:00"
                value={horaEvento}
                onChangeText={setHoraEvento}
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    marginBottom: 15,
                    backgroundColor: '#fff',
                }}
            />

            <Text style={{ fontWeight: 'bold' }}>Estado</Text>
            <TextInput
                placeholder="pendiente, programado, completado..."
                value={estado}
                onChangeText={setEstado}
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
                    backgroundColor: '#007AFF',
                    padding: 15,
                    borderRadius: 8,
                    alignItems: 'center',
                }}
                onPress={handleSubmit}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Guardar comida</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
