import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Modal,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFood } from '../../context/food.context';

export default function IngredientesList() {
    const { ingredientes, fetchIngredientes, loading } = useFood();
    const navigation = useNavigation<any>();
    const [selected, setSelected] = useState<any | null>(null);

    useEffect(() => {
        fetchIngredientes();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

    console.log("Ingredientes desde context:", ingredientes);

    return (
        <View style={{ flex: 1, padding: 15, backgroundColor: '#f9f9f9' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
                Lista de ingredientes
            </Text>

            <FlatList
                data={Array.isArray(ingredientes) ? ingredientes.filter((ing) => ing && ing._id) : []}
                numColumns={2}
                keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
                contentContainerStyle={{ gap: 10 }}
                columnWrapperStyle={{ gap: 10 }}
                renderItem={({ item }) => {
                    if (!item) return null;
                    return (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                padding: 15,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: '#fff',
                                borderRadius: 8,
                            }}
                            onPress={() => {
                                console.log('Ingrediente seleccionado:', item);
                                setSelected(item);
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
                                {item?.nombre || 'Sin nombre'}
                            </Text>
                            <Text>Calorías: {item?.calorias ?? 0}</Text>
                            <Text>Proteínas: {item?.proteinas ?? 0}</Text>
                        </TouchableOpacity>
                    );
                }}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: '#007AFF',
                    padding: 15,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: 20,
                }}
                onPress={() => navigation.navigate('CreateIngrediente')}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Agregar nuevo ingrediente</Text>
            </TouchableOpacity>

            {/* Modal de detalle */}
            <Modal
                visible={selected !== null}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelected(null)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            padding: 20,
                            width: '90%',
                            maxHeight: '80%',
                        }}
                    >
                        <ScrollView>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
                                {selected?.nombre || 'Detalle'}
                            </Text>

                            {selected && (
                                <>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Descripción: </Text>{selected.descripcion || 'S/I'}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Cantidad: </Text>{selected.cantidad}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Tipo de peso: </Text>{selected.tipoPeso}</Text>

                                    <Text><Text style={{ fontWeight: 'bold' }}>Calorías: </Text>{selected.calorias}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Carbohidratos: </Text>{selected.carbohidratos}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Proteínas: </Text>{selected.proteinas}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Grasas: </Text>{selected.grasas}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Fibra: </Text>{selected.fibra}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Azúcar: </Text>{selected.azucar}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Sodio: </Text>{selected.sodio}</Text>
                                </>
                            )}
                        </ScrollView>

                        <TouchableOpacity
                            style={{
                                marginTop: 20,
                                padding: 12,
                                backgroundColor: '#007AFF',
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                            onPress={() => setSelected(null)}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}
