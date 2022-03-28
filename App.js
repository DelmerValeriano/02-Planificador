import React, {useState,useEffect} from 'react';
import {
  ScrollView,
  Alert,
  StyleSheet,
  View,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ControlPresupuesto} from './src/components/ControlPresupuesto';
import { Filtro } from './src/components/Filtro';
import {FormularioGasto} from './src/components/FormularioGasto';
import {Header} from './src/components/Header';
import {ListadoGasto} from './src/components/ListadoGasto';
import {NuevoPresupuesto} from './src/components/NuevoPresupuesto';


const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});
  const [filtro, setFiltrado] = useState('');
  const [gastosFiltrados, setGastosFiltrado] = useState([]);

  // useEffect(() => {
  //     const almacenarAs = async()=>{
  //       const nombre=[1,2,3]
  //       await AsyncStorage.setItem('prueba_as',JSON.stringify(nombre));

  //     }
  //     console.log('Almacenado')
  //     almacenarAs()
  // }, [])

  useEffect(() => {
    const obtenerPresupuestoStorage = async()=>{
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        if (presupuestoStorage >0) {
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }
      } catch (error) {
        console.log(error)
      }
      
    }
    obtenerPresupuestoStorage()
    
  },[])


  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async()=>{
        try {
          await AsyncStorage.setItem('planificador_presupuesto',presupuesto)
        } catch (error) {
          console.log(error);
        }

      }
      guardarPresupuestoStorage()
    }
    
  
  }, [isValidPresupuesto])

  
  useEffect(() => {
    const obtenerGastosStorage = async()=>{
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
        console.log(gastosStorage)
        setGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  },[])
  
  useEffect(() => {
    const guardarGastosStorage = async()=>{
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))

      } catch (error) {
        console.log(error);
        
      }

    }
    guardarGastosStorage()

  },[gastos])
  


  const hadleNuevoPresupuesto = presupuesto => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor');
    }
  };

  const hasdleGasto = gasto => {
    if ([gasto.nombre,gasto.categoria,gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorio');
      return;
    }


    if(gasto.id){

      const gastosActualizados= gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }else{

      gasto.id = Date.now();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    //añadir el nuevo gasto al state
    setModal(!modal);
  };

  const eliminarGatos=(id)=>{
      Alert.alert(
        '¿Deseas eliminar este gasto?',
        'Un gasto eliminado no se puede recuperar',
        [
          {text: 'No',style: 'cancel'},
          {text: 'Si, Eliminar', onPress: () =>{
            const gastosActualizados =gastos.filter(gastoState => gastoState.id !== id )
            setGastos(gastosActualizados)
            setModal(false)
            setGasto({})
          }}
        ]

      )
  }

  const resetearApp =()=>{
    Alert.alert(
      '¿Deseas resetear la app?',
      'Esto eliminara presupuesto y gastos',
      [
        {
          text:'No',style: 'cancel'
        },
        {text:'Si, Eliminar',onPress: async() =>{
          try {
            await AsyncStorage.clear() 
            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])

            
          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )


  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />

          {isValidPresupuesto ? (
            <ControlPresupuesto presupuesto={presupuesto} resetearApp={resetearApp} gastos={gastos} />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              hadleNuevoPresupuesto={hadleNuevoPresupuesto}
            />
          )}
        </View>
        {isValidPresupuesto && (
          <>
          
          <Filtro
          filtro={filtro}
            setFiltrado={setFiltrado}
            gastos={gastos}
            setGastosFiltrado={setGastosFiltrado}
          />
          <ListadoGasto
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
          </>
        )}
      </ScrollView>

      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <FormularioGasto
            setModal={setModal}
            hasdleGasto={hasdleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGatos={eliminarGatos}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <Image
            source={require('./src/img/nuevo-gasto.png')}
            style={styles.imagen}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 500,
  },
  imagen: {
    width: 60,
    height: 60,
 
  },
  pressable:{
    position: 'absolute',
    right: 10,
    bottom: 10,

    width: 60,
    height: 60,


  }
});

export default App;
