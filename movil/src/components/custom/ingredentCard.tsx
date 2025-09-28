import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  item: any;
  selected: boolean;
  onToggle: () => void;
  onPressInfo: () => void;
};

export default function IngredienteCard({ item, selected, onToggle, onPressInfo }: Props) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        padding: 10,
        borderWidth: 1,
        borderColor: selected ? 'green' : '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
      }}
      onPress={onPressInfo}
    >
      <TouchableOpacity
        onPress={onToggle}
        style={{
          width: 24,
          height: 24,
          borderWidth: 2,
          borderColor: selected ? 'green' : 'gray',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          backgroundColor: selected ? 'green' : 'white',
        }}
      >
        {selected && <Text style={{ color: 'white', fontWeight: 'bold' }}>✓</Text>}
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{item?.nombre || 'Sin nombre'}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={{ color: '#666', paddingLeft: 10 }}>
          {item?.cantidad || 'Sin descripción'} {item?.tipoPeso || ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
