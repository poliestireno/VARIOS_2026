// useState: para guardar en memoria lo que el usuario escribe en el formulario.
import { useState } from 'react';
// useRouter: hook de Expo Router para navegar de una pantalla a otra.
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';

// Usuario y contraseña "correctos" para esta demo. En una app real
// nunca se comparan así, escritos directamente en el código: esto es
// solo para practicar el formulario y la navegación entre pantallas.
const USUARIO_VALIDO = 'a1';
const PASSWORD_VALIDA = 'a1';

// Esta es la PRIMERA pantalla: una imagen y, debajo, el formulario de login.
export default function Index() {
  // router nos deja movernos a otra pantalla (a "resultado.tsx").
  const router = useRouter();

  // Lo que el usuario va escribiendo en cada campo del formulario.
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // Se ejecuta al pulsar el botón "Entrar".
  function iniciarSesion() {
    // Comparamos lo escrito contra los valores válidos de arriba.
    const esCorrecto = usuario === USUARIO_VALIDO && password === PASSWORD_VALIDA;

    // router.push cambia a la pantalla "resultado" y le manda datos
    // como "parámetros" (aquí, si el login fue correcto o no).
    // Los parámetros siempre viajan como texto, por eso usamos '1'/'0'.
    router.push({
      pathname: '/resultado',
      params: { ok: esCorrecto ? '1' : '0' },
    });
  }

  return (
    <View style={styles.container}>
      {/* Una imagen cualquiera: aquí usamos un logo que ya trae el proyecto */}
      <Image source={require('../../assets/images/react-logo.png')} style={styles.imagen} />

      <Text style={styles.titulo}>Iniciar sesión</Text>

      {/* Debajo de la imagen, el formulario de login */}
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          autoCapitalize="none" // Evita que ponga la primera letra en mayúscula sola.
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          autoCapitalize="none"
          secureTextEntry // Oculta lo escrito con puntos, como en cualquier login.
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.boton} onPress={iniciarSesion}>
          <Text style={styles.textoBoton}>Entrar</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 24,
  },
  imagen: {
    width: 120,
    height: 120,
    resizeMode: 'contain', // Encoge/agranda la imagen sin deformarla.
  },
  titulo: { fontSize: 24, fontWeight: 'bold' },
  formulario: {
    width: '100%',
    maxWidth: 320,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
