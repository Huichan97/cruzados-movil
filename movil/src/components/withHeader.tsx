import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './header';

export default function withHeader(Component: any) {
    return (props: any) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header />
            <Component {...props} />
        </SafeAreaView>
    );
}
