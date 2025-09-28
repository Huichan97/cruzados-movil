import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { getFoodById } from '../../routes/food.route';

export default function FoodDetail({ route }: any) {
    const { id } = route.params;
    const [food, setFood] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const data = await getFoodById(id);
                setFood(data);
            } catch (err) {
                console.error('Error al cargar detalle', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFood();
    }, [id]);

    if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

    if (!food) return <Text>Error al cargar detalle</Text>;

    console.log("Detalle de comida:", food);

    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
                {food.nombre}
            </Text>

            <Text style={{ marginBottom: 10 }}>Tipo: {food.meal?.nombre || food.meal}</Text>
            <Text style={{ marginBottom: 10 }}>Porción: {food.porcion}</Text>
            <Text style={{ marginBottom: 10 }}>Hora: {food.horaEvento}</Text>
            <Text style={{ marginBottom: 10 }}>Estado: {food.estado}</Text>

            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
                Ingredientes
            </Text>

            {food.ingredientes.map((ing: any) => (
                <View
                    key={ing._id}
                    style={{
                        padding: 10,
                        marginBottom: 8,
                        borderRadius: 8,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#ddd',
                    }}
                >
                    <Text style={{ fontWeight: 'bold' }}>{ing.nombre}</Text>
                    <Text>Cantidad: {ing.cantidad} {ing.tipoPeso}</Text>
                    <Text>Proteínas: {ing.proteinas}</Text>
                    <Text>Carbohidratos: {ing.carbohidratos}</Text>
                    <Text>Grasas: {ing.grasas}</Text>
                    <Text>Fibra: {ing.fibra}</Text>
                    <Text>Azúcar: {ing.azucar}</Text>
                    <Text>Sodio: {ing.sodio}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
