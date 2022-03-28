import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {formatearCantidad} from '../helpers';
import globalStyles from '../styles';
import CircularProgress from 'react-native-circular-progress-indicator';

export const ControlPresupuesto = ({presupuesto, gastos,resetearApp}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGatado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0,
    );
    const totalDisponible = presupuesto - totalGatado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1200);

    setDisponible(totalDisponible);
    setGastado(totalGatado);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        <CircularProgress
          value={porcentaje}
          duration={1200}
          radius={120}
          valueSuffix={'%'}
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3B82F6"
          activeStrokeWidth={20}
          titleStyle={{fontWeight: 'bold', fontSize: 20}}
          titleColor="#64748B"
        />
      </View>

      <View style={styles.contenedorTexto}>

        <Pressable
        onLongPress={resetearApp}
        style={styles.boton}>
          <Text style={styles.botonTexto}>Reiniciar App</Text>
        </Pressable>

        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: 'center',
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: 'center',
  },
  label: {
    fontWeight: '700',
    color: '#3B82F6',
  },
  boton:{
    backgroundColor:'#DB2777',
    padding:10,
    marginBottom:40,
    borderRadius:10,
    
    
  },
  botonTexto:{
    textAlign: 'center',
    color: '#FFF',
    fontWeight:'700',
    textTransform:'uppercase',


}
});
