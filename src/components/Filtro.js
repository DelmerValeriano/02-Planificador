import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyle from '../styles';

export const Filtro = ({filtro, setFiltrado, gastos, setGastosFiltrado}) => {
  useEffect(() => {
    if (filtro =='') {
        setGastosFiltrado([])
    }else{
        const gastosFiltrados =gastos.filter(gasto=> gasto.categoria === filtro)
        setGastosFiltrado(gastosFiltrados)
    }
  }, [filtro]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Filtrar Gastos</Text>
      <Picker
        selectedValue={filtro}
        onValueChange={valor => {
          setFiltrado(valor);
        }}>
        <Picker.Item label="--Seleccione--" value="" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos Varios" value="gastos" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyle.contenedor,
    transform: [{translateY: 0}],
    marginTop: 80,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748B',
  },
});
