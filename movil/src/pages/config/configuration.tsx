import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

const ConfigurationScreen: React.FC = () => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuración</Text>

            <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Notificaciones</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                />
            </View>

            <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Modo oscuro</Text>
                <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#222',
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    optionLabel: {
        fontSize: 18,
        color: '#333',
    },
    button: {
        marginTop: 40,
        backgroundColor: '#d32f2f',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConfigurationScreen;