import { useState } from 'react';
// useLocalSearchParams: lee los parámetros que la pantalla anterior mandó
// al navegar aquí. useRouter: para poder volver al login.
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

// Genera una tabla de 3x3 (un array de 3 filas, cada fila con 3 números)
// con números aleatorios del 1 al 9. Se usa una función aparte para no
// repetir el mismo cálculo dos veces dentro del componente.
function generarTabla(): number[][] {
  const tabla: number[][] = [];

  for (let fila = 0; fila < 3; fila++) {
    const numerosDeLaFila: number[] = [];
    for (let columna = 0; columna < 3; columna++) {
      // Math.random() da un decimal entre 0 y 1 (sin llegar a 1).
      // Al multiplicar por 9 y redondear hacia abajo (Math.floor)
      // obtenemos un entero de 0 a 8; sumando 1 queda entre 1 y 9.
      numerosDeLaFila.push(Math.floor(Math.random() * 9) + 1);
    }
    tabla.push(numerosDeLaFila);
  }

  return tabla;
}

// Esta es la SEGUNDA pantalla: dice si el login fue correcto o no,
// y si fue correcto, además muestra la tabla 3x3 de números aleatorios.
export default function Resultado() {
  const router = useRouter();

  // Los parámetros que llegan por la URL siempre son texto (string),
  // aunque representen otra cosa (aquí, "1" o "0").
  const { ok } = useLocalSearchParams<{ ok: string }>();
  const loginCorrecto = ok === '1';

  // Le pasamos una función a useState (en vez de un valor directo) para
  // que la tabla se genere una única vez, al entrar a esta pantalla,
  // y no se recalcule cada vez que el componente se vuelve a renderizar.
  const [tabla] = useState<number[][]>(() => generarTabla());

  return (
    <View style={styles.container}>
      {loginCorrecto ? (
        <>
          <Text style={styles.mensajeOk}>✅ Login correcto</Text>

          {/* Dibujamos la tabla: una fila por cada array dentro de "tabla",
              y dentro de cada fila, una celda por cada número. */}
          <View style={styles.tabla}>
            {tabla.map((numerosDeLaFila, indiceFila) => (
              <View key={indiceFila} style={styles.fila}>
                {numerosDeLaFila.map((numero, indiceColumna) => (
                  <View key={indiceColumna} style={styles.celda}>
                    <Text style={styles.numeroCelda}>{numero}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.mensajeError}>❌ Usuario o contraseña incorrectos</Text>
      )}

      {/* router.replace en vez de router.back(): evita que, al volver
          a entrar mal, se vayan acumulando pantallas en el historial. */}
      <Pressable style={styles.boton} onPress={() => router.replace('/')}>
        <Text style={styles.textoBoton}>Volver al login</Text>
      </Pressable>

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
    gap: 24,
    padding: 24,
  },
  mensajeOk: { fontSize: 22, fontWeight: 'bold', color: '#16a34a' },
  mensajeError: { fontSize: 20, fontWeight: 'bold', color: '#dc2626', textAlign: 'center' },
  tabla: { gap: 8 },
  fila: { flexDirection: 'row', gap: 8 },
  celda: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#c7d2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroCelda: { fontSize: 22, fontWeight: '600', color: '#1e293b' },
  boton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBoton: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
