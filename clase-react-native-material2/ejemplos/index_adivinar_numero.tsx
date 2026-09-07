// useState: hook de React que permite guardar un valor y "recordarlo"
// entre renderizados de la pantalla.
import { useState } from 'react';
// StatusBar: componente para controlar la barra de estado del celular (hora, batería, etc).
import { StatusBar } from 'expo-status-bar';
// Componentes básicos de React Native:
// StyleSheet -> para crear estilos, Text -> para mostrar texto,
// View -> contenedor/caja, Pressable -> detecta toques (botones),
// TextInput -> caja de texto donde el usuario escribe.
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

// Función auxiliar que genera un número entero al azar entre 0 y 100.
function numeroAleatorio(): number {
  // Math.random() da un decimal entre 0 y 1 (sin llegar a 1).
  // Lo multiplicamos por 101 y redondeamos hacia abajo (Math.floor)
  // para obtener un entero entre 0 y 100 (ambos incluidos).
  return Math.floor(Math.random() * 101);
}

// Componente principal de la pantalla. Es una función que devuelve
// lo que se ve en pantalla (JSX).
export default function Index() {
  // Número secreto que el jugador debe adivinar.
  // Se calcula una sola vez, al crear el componente por primera vez.
  const [secreto, setSecreto] = useState<number>(numeroAleatorio());

  // Texto que el usuario va escribiendo en el input (siempre es string,
  // aunque represente un número, porque así funciona un TextInput).
  const [valorInput, setValorInput] = useState<string>('');

  // Cuántas veces ha intentado adivinar.
  const [intentos, setIntentos] = useState<number>(0);

  // Mensaje que se muestra en pantalla (pista, error o mensaje de victoria).
  const [mensaje, setMensaje] = useState<string>('Adivina un número entre 0 y 100');

  // Indica si el juego ya terminó (true = ya adivinó el número).
  const [terminado, setTerminado] = useState<boolean>(false);

  // Esta función se ejecuta cuando el usuario presiona el botón "Adivinar".
  function adivinar() {
    // Convertimos el texto escrito a número. Si el texto no es un número
    // válido (ej: "hola"), Number(...) devuelve NaN (Not a Number).
    const numero = Number(valorInput);

    // Validamos que el usuario haya escrito algo y que sea un número
    // dentro del rango permitido (0 a 100).
    if (valorInput.trim() === '' || Number.isNaN(numero) || numero < 0 || numero > 100) {
      setMensaje('Ingresa un número válido entre 0 y 100');
      return; // Salimos de la función, no contamos este intento.
    }

    // Si el número es válido, sumamos un intento.
    const nuevosIntentos = intentos + 1;
    setIntentos(nuevosIntentos);

    // Comparamos el número ingresado contra el número secreto.
    if (numero === secreto) {
      // Acertó: mostramos mensaje de victoria con el total de intentos.
      setMensaje(`¡Correcto! Lo lograste en ${nuevosIntentos} intento(s)`);
      setTerminado(true); // Marcamos el juego como terminado.
    } else if (numero < secreto) {
      // El número ingresado es menor que el secreto, entonces el secreto es mayor.
      setMensaje('Mayor ⬆️');
    } else {
      // El número ingresado es mayor que el secreto, entonces el secreto es menor.
      setMensaje('Menor ⬇️');
    }

    // Limpiamos el input para que el usuario escriba el siguiente intento.
    setValorInput('');
  }

  // Esta función reinicia el juego desde cero (nuevo número secreto).
  function jugarDeNuevo() {
    setSecreto(numeroAleatorio()); // Nuevo número a adivinar.
    setValorInput('');             // Limpiamos el input.
    setIntentos(0);                // Reiniciamos el contador de intentos.
    setMensaje('Adivina un número entre 0 y 100'); // Mensaje inicial.
    setTerminado(false);           // El juego vuelve a estar "en curso".
  }

  // A partir de aquí se define lo que se dibuja en pantalla.
  return (
    // Contenedor principal de toda la pantalla.
    <View style={styles.container}>
      {/* Título fijo del juego */}
      <Text style={styles.titulo}>🎯 Adivina el número</Text>

      {/* Mensaje dinámico: cambia según lo que pase (pista, error, victoria) */}
      <Text style={styles.mensaje}>{mensaje}</Text>

      {/*
        Si el juego NO ha terminado (!terminado), mostramos el input
        y el botón para seguir adivinando. El "&&" es un truco típico
        de React: si la condición de la izquierda es falsa, no se
        muestra nada; si es verdadera, se muestra lo de la derecha.
      */}
      {!terminado && (
        // <>...</> es un "Fragment": permite agrupar dos elementos
        // (TextInput y Pressable) sin necesidad de un View extra.
        <>
          <TextInput
            style={styles.input}
            keyboardType="numeric" // Muestra el teclado numérico del celular.
            placeholder="Escribe tu número" // Texto de ayuda cuando está vacío.
            value={valorInput} // El valor mostrado siempre viene del estado.
            onChangeText={setValorInput} // Cada letra escrita actualiza el estado.
          />
          {/* Botón que, al presionarlo, ejecuta la función adivinar() */}
          <Pressable style={styles.boton} onPress={adivinar}>
            <Text style={styles.textoBoton}>Adivinar</Text>
          </Pressable>
        </>
      )}

      {/* Siempre mostramos cuántos intentos lleva el jugador */}
      <Text style={styles.intentos}>Intentos: {intentos}</Text>

      {/* Si el juego terminó, mostramos el botón para volver a jugar */}
      {terminado && (
        <Pressable style={styles.boton} onPress={jugarDeNuevo}>
          <Text style={styles.textoBoton}>Jugar de nuevo</Text>
        </Pressable>
      )}

      {/* Barra de estado del sistema, con estilo automático (claro u oscuro) */}
      <StatusBar style="auto" />
    </View>
  );
}

// Definimos todos los estilos (como CSS, pero en objeto de JavaScript).
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla disponible.
    backgroundColor: '#fff', // Fondo blanco.
    alignItems: 'center', // Centra los elementos horizontalmente.
    justifyContent: 'center', // Centra los elementos verticalmente.
    gap: 16, // Espacio entre cada elemento hijo.
    padding: 24, // Espacio interno respecto a los bordes de la pantalla.
  },
  titulo: { fontSize: 22, fontWeight: 'bold' }, // Texto grande y en negrita.
  mensaje: { fontSize: 18, textAlign: 'center' }, // Texto centrado para la pista.
  intentos: { fontSize: 16, color: '#555' }, // Texto gris para el contador.
  input: {
    borderWidth: 1, // Grosor del borde de la caja de texto.
    borderColor: '#ccc', // Color gris claro del borde.
    borderRadius: 8, // Esquinas redondeadas.
    paddingVertical: 10, // Espacio interno arriba/abajo.
    paddingHorizontal: 16, // Espacio interno izquierda/derecha.
    fontSize: 18, // Tamaño del texto escrito.
    width: 160, // Ancho fijo de la caja.
    textAlign: 'center', // Texto centrado dentro de la caja.
  },
  boton: {
    backgroundColor: '#2563eb', // Fondo azul.
    paddingVertical: 12, // Espacio interno arriba/abajo del botón.
    paddingHorizontal: 24, // Espacio interno izquierda/derecha del botón.
    borderRadius: 8, // Esquinas redondeadas.
  },
  textoBoton: { color: '#fff', fontSize: 18 }, // Texto blanco dentro del botón.
});
