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
import IngredienteCard from '../custom/ingredentCard';

export default function IngredientesList() {
    const { ingredientes, fetchIngredientes, loading, ingredientesSeleccionados, setIngredientesSeleccionados } = useFood();
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
                data={ingredientes}
                numColumns={1} // ahora una columna, cada card maneja su layout interno
                keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                    <IngredienteCard
                        item={item}
                        selected={ingredientesSeleccionados.includes(item._id)}
                        onToggle={() => {
                            if (ingredientesSeleccionados.includes(item._id)) {
                                setIngredientesSeleccionados(ingredientesSeleccionados.filter(id => id !== item._id));
                            } else {
                                setIngredientesSeleccionados([...ingredientesSeleccionados, item._id]);
                            }
                        }}
                        onPressInfo={() => setSelected(item)} // abre modal con detalle
                    />
                )}
            />

            <TouchableOpacity
                disabled={ingredientesSeleccionados.length < 3}
                style={{
                    backgroundColor: ingredientesSeleccionados.length >= 3 ? 'green' : 'gray',
                    padding: 15,
                    borderRadius: 8,
                    alignItems: 'center',
                    marginTop: 20,
                }}
                onPress={() => {
                    // guardas en context para CreateFood
                    console.log("Ingredientes seleccionados:", ingredientesSeleccionados);
                    navigation.goBack();
                }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    Agregar ingredientes a la comida
                </Text>
            </TouchableOpacity>

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
