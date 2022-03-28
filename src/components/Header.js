import React from 'react';
import {Text, StyleSheet,SafeAreaView, View} from 'react-native';

export const Header = () => {
  return (
      <SafeAreaView >
          
          <Text style={styles.texto}>Planificador de Gastos</Text>
      </SafeAreaView>


    
  )
};


const styles = StyleSheet.create({
 
    texto: {
        textAlign: 'center',
        fontSize:31,
        color: '#FFF',
        fontWeight:'bold',
        textTransform:'uppercase',
        paddingTop:20,


    },

});