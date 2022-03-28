import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

import globalStyles from '../styles'

export const NuevoPresupuesto = ({
  hadleNuevoPresupuesto,
  presupuesto,
  setPresupuesto,
}) => {


  // useEffect(() =>{
  //   const obtenerAs = async()=>{

  //     try {
        
  //       const valor = await AsyncStorage.getItem('prueba_as')
  //       console.log(JSON.parse(valor))
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   obtenerAs()

  // },[])


  return (
    <View style={styles.contenedor}>
      <Text  style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto: Ej. 300"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
      />

      <Pressable 
        onPress={()=> hadleNuevoPresupuesto(presupuesto)}
        style={styles.boton}>
        <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor
  },

  label: {
      textAlign: 'center',
      fontSize:20,
      color: '#3B82F6',
     

  },
  input:{
    backgroundColor:'#F5F5F5',
    padding:10,
    borderRadius:10,
    textAlign: 'center',
    marginTop:30,
  },
  boton: {
      marginTop:30,
      backgroundColor:'#1046A4',
      padding:10,
      borderRadius:10,

  },
  botonTexto: {
      textAlign: 'center',
      color: '#FFF',
      textTransform: 'uppercase',
      fontWeight:'bold',

  },
});
